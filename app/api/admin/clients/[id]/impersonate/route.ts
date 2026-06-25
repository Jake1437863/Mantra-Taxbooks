import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateToken, apiOk, apiError } from '@/lib/utils'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return apiError('Forbidden', 403)

  const { id } = await params
  const client = await prisma.user.findFirst({ where: { id, role: 'CLIENT' } })
  if (!client) return apiError('Client not found.', 404)
  if (!client.isActive) return apiError('Client account is disabled.')

  // Invalidate any previous unused tokens
  await prisma.impersonationToken.deleteMany({ where: { clientId: id, used: false } })

  const token = generateToken(32)
  await prisma.impersonationToken.create({
    data: {
      adminId: session.user.id,
      clientId: id,
      token,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  })

  return apiOk({ token })
}
