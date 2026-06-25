import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiOk, apiError } from '@/lib/utils'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return apiError('Forbidden', 403)

  const body = await req.json()
  const { isActive } = body

  const user = await prisma.user.update({
    where: { id: params.id },
    data: { isActive },
    select: { id: true, name: true, email: true, isActive: true },
  })

  return apiOk({ user })
}
