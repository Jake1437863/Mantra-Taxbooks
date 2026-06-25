import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiOk, apiError } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({ message: z.string().min(1).max(5000) })

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return apiError('Unauthorized', 401)

  const { id } = await params
  const ticket = await prisma.ticket.findUnique({ where: { id } })
  if (!ticket) return apiError('Ticket not found.', 404)

  const canReply =
    ticket.clientId === session.user.id ||
    ticket.assignedTo === session.user.id ||
    ['ADMIN', 'SUPPORT'].includes(session.user.role)

  if (!canReply) return apiError('Forbidden', 403)
  if (['CLOSED', 'RESOLVED'].includes(ticket.status)) return apiError('Ticket is closed.')

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return apiError('Message required.')

  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: id,
      senderId: session.user.id,
      message: parsed.data.message,
    },
    include: { sender: { select: { id: true, name: true, role: true } } },
  })

  await prisma.ticket.update({
    where: { id },
    data: { status: ticket.status === 'OPEN' && session.user.role !== 'CLIENT' ? 'IN_PROGRESS' : ticket.status },
  })

  return apiOk({ message }, 201)
}
