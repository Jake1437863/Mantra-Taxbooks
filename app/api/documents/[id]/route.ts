import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { deleteS3Object } from '@/lib/s3'
import { apiOk, apiError } from '@/lib/utils'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return apiError('Unauthorized', 401)

  const isAdminOrEmployee = ['ADMIN', 'SUPPORT'].includes(session.user.role)
  if (!isAdminOrEmployee) return apiError('Forbidden', 403)

  const { id } = await params
  const doc = await prisma.document.findUnique({ where: { id } })
  if (!doc) return apiError('Document not found.', 404)

  const body = await req.json()
  const { status, reviewNotes } = body

  const updated = await prisma.document.update({
    where: { id },
    data: {
      status: status || doc.status,
      reviewNotes: reviewNotes ?? doc.reviewNotes,
      reviewedBy: session.user.id,
      reviewedAt: new Date(),
    },
  })

  return apiOk({ document: updated })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return apiError('Unauthorized', 401)

  const { id } = await params
  const doc = await prisma.document.findUnique({ where: { id } })
  if (!doc) return apiError('Document not found.', 404)

  if (session.user.role === 'CLIENT') {
    if (doc.clientId !== session.user.id) return apiError('Forbidden', 403)
    if (doc.status !== 'PENDING') return apiError('Only pending documents can be deleted.')
  } else if (session.user.role !== 'ADMIN') {
    return apiError('Forbidden', 403)
  }

  await deleteS3Object(doc.s3Key)
  await prisma.document.delete({ where: { id } })

  return apiOk({ message: 'Document deleted.' })
}
