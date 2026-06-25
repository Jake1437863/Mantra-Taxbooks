import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiOk, apiError } from '@/lib/utils'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return apiError('Forbidden', 403)

  await (prisma as any).customRole.delete({ where: { id: params.id } })
  return apiOk({ message: 'Role deleted.' })
}
