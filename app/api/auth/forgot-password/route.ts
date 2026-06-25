import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import { generateToken, apiOk, apiError } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return apiError('Valid email required.')

  const { email } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  // Always return ok to prevent email enumeration
  if (!user) return apiOk({ message: 'If this email exists, a reset link was sent.' })

  // Invalidate old tokens
  await prisma.passwordReset.updateMany({
    where: { userId: user.id, used: false },
    data: { used: true },
  })

  const token = generateToken()
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await prisma.passwordReset.create({
    data: { userId: user.id, token, expiresAt },
  })

  try {
    await sendPasswordResetEmail(user.email, user.name, token)
  } catch (err) {
    console.error('Email send failed:', err)
  }

  return apiOk({ message: 'If this email exists, a reset link was sent.' })
}
