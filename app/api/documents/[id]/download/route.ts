import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getPresignedDownloadUrl } from '@/lib/s3'
import { apiOk, apiError } from '@/lib/utils'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return apiError('Unauthorized', 401)

  const { id } = await params
  const doc = await prisma.document.findUnique({ where: { id } })
  if (!doc) return apiError('Document not found.', 404)

  const isAdmin = session.user.role === 'ADMIN'
  const isEmployee = ['SUPPORT', 'PAYMENTS'].includes(session.user.role)
  const isOwner = doc.clientId === session.user.id

  if (!isOwner && !isAdmin && !isEmployee) return apiError('Forbidden', 403)

  const url = await getPresignedDownloadUrl(doc.s3Key, doc.filename)
  return apiOk({ url })
}
