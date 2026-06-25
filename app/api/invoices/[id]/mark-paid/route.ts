import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendInvoiceEmail } from '@/lib/email'
import { generateInvoiceNo, apiOk, apiError } from '@/lib/utils'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return apiError('Forbidden', 403)

  const { id } = await params
  const proforma = await prisma.invoice.findUnique({
    where: { id },
    include: { client: true },
  })

  if (!proforma) return apiError('Invoice not found.', 404)
  if (proforma.status !== 'PENDING' || proforma.type !== 'PROFORMA') {
    return apiError('Only pending proforma invoices can be marked as paid.')
  }

  const count = await prisma.invoice.count()
  const taxInvoiceNo = generateInvoiceNo('MTB-TAX', count)

  const [updatedProforma, taxInvoice] = await prisma.$transaction([
    prisma.invoice.update({
      where: { id: proforma.id },
      data: { status: 'PAID', paidAt: new Date() },
    }),
    prisma.invoice.create({
      data: {
        invoiceNo: taxInvoiceNo,
        clientId: proforma.clientId,
        type: 'TAX',
        status: 'PAID',
        items: proforma.items as any,
        subtotal: proforma.subtotal,
        gstRate: proforma.gstRate,
        gstAmount: proforma.gstAmount,
        total: proforma.total,
        notes: proforma.notes,
        dueDate: proforma.dueDate,
        paidAt: new Date(),
      },
    }),
  ])

  await prisma.invoice.update({
    where: { id: proforma.id },
    data: { taxInvoiceId: taxInvoice.id },
  })

  try {
    await sendInvoiceEmail(proforma.client.email, proforma.client.name, taxInvoiceNo, 'TAX', Number(proforma.total))
  } catch (err) {
    console.error('Tax invoice email failed:', err)
  }

  return apiOk({ proforma: updatedProforma, taxInvoice })
}
