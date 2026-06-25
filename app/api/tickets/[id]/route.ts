import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiOk, apiError } from '@/lib/utils'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return apiError('Unauthorized', 401)

  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
    include: {
      client: { select: { id: true, name: true, email: true, role: true } },
      assignee: { select: { id: true, name: true, role: true } },
      messages: {
        include: { sender: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!ticket) return apiError('Ticket not found.', 404)

  const canAccess =
    ticket.clientId === session.user.id ||
    ticket.assignedTo === session.user.id ||
    ['ADMIN', 'SUPPORT'].includes(session.user.role)

  if (!canAccess) return apiError('Forbidden', 403)

  return apiOk({ ticket, messages: ticket.messages })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return apiError('Unauthorized', 401)

  const canModify = ['ADMIN', 'SUPPORT'].includes(session.user.role)
  if (!canModify) return apiError('Forbidden', 403)

  const ticket = await prisma.ticket.findUnique({ where: { id: params.id } })
  if (!ticket) return apiError('Ticket not found.', 404)

  const body = await req.json()
  const { status, assignedTo, priority } = body

  const updated = await prisma.ticket.update({
    where: { id: params.id },
    data: {
      ...(status && { status }),
      ...(assignedTo !== undefined && { assignedTo: assignedTo || null }),
      ...(priority && { priority }),
    },
    include: {
      client: { select: { id: true, name: true, email: true, role: true } },
      assignee: { select: { id: true, name: true, role: true } },
    },
  })

  return apiOk({ ticket: updated })
}
