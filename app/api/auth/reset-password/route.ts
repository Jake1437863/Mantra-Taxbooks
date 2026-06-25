import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { apiOk, apiError } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(128),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return apiError('Invalid request.')

  const { token, password } = parsed.data

  const reset = await prisma.passwordReset.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!reset || reset.used || reset.expiresAt < new Date()) {
    return apiError('Invalid or expired reset link.', 400)
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.$transaction([
    prisma.user.update({ where: { id: reset.userId }, data: { passwordHash } }),
    prisma.passwordReset.update({ where: { id: reset.id }, data: { used: true } }),
  ])

  return apiOk({ message: 'Password reset successfully.' })
}
