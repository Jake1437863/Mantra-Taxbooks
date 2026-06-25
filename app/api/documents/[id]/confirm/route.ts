import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiOk, apiError } from '@/lib/utils'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return apiError('Unauthorized', 401)

  const doc = await prisma.document.findUnique({ where: { id: params.id } })
  if (!doc) return apiError('Document not found.', 404)

  if (doc.uploadedBy !== session.user.id && session.user.role !== 'ADMIN') {
    return apiError('Forbidden', 403)
  }

  return apiOk({ message: 'Upload confirmed.' })
}
