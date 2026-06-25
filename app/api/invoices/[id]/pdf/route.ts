import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateInvoicePDF } from '@/lib/pdf'
import { apiError } from '@/lib/utils'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return apiError('Unauthorized', 401)

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { client: { select: { id: true, name: true, email: true, phone: true, company: true, gstNumber: true, cinNumber: true, address: true, city: true, state: true, pincode: true } } },
  })

  if (!invoice) return apiError('Invoice not found.', 404)

  // Clients can only download their own invoices
  if (session.user.role === 'CLIENT' && invoice.clientId !== session.user.id) {
    return apiError('Forbidden', 403)
  }

  const pdfBuffer = await generateInvoicePDF({
    invoiceNo: invoice.invoiceNo,
    type: invoice.type,
    date: invoice.createdAt,
    dueDate: invoice.dueDate,
    paidAt: invoice.paidAt,
    client: invoice.client,
    items: invoice.items as any[],
    subtotal: Number(invoice.subtotal),
    gstRate: Number(invoice.gstRate),
    gstAmount: Number(invoice.gstAmount),
    total: Number(invoice.total),
    notes: invoice.notes,
  })

  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${invoice.invoiceNo}.pdf"`,
      'Content-Length': String(pdfBuffer.length),
    },
  })
}
