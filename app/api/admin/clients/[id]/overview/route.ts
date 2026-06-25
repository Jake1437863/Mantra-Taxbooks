import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiOk, apiError } from '@/lib/utils'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return apiError('Forbidden', 403)

  const { id } = await params

  const [client, invoices, documents, tickets] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, company: true, gstNumber: true, cinNumber: true, address: true, city: true, state: true, pincode: true, isActive: true, createdAt: true },
    }),
    prisma.invoice.findMany({
      where: { clientId: id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.document.findMany({
      where: { clientId: id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.ticket.findMany({
      where: { clientId: id },
      include: { assignee: { select: { name: true } } },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    }),
  ])

  if (!client) return apiError('Client not found.', 404)

  return apiOk({ client, invoices, documents, tickets })
}
