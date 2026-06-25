import { prisma } from '@/lib/prisma'
import { apiOk, apiError } from '@/lib/utils'
import { sendVerificationEmail } from '@/lib/email'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional().nullable(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return apiError(parsed.error.errors[0].message)

  const { name, email, phone, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (existing) return apiError('An account with this email already exists.', 409)

  const passwordHash = await bcrypt.hash(password, 12)
  const emailVerifyToken = randomBytes(32).toString('hex')
  const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      phone: phone || null,
      passwordHash,
      role: 'CLIENT',
      emailVerifyToken,
      emailVerifyExpires,
    },
    select: { id: true, name: true, email: true, role: true },
  })

  // Send verification email — non-blocking (don't fail registration if SMTP not configured)
  try {
    await sendVerificationEmail(user.email, user.name, emailVerifyToken)
  } catch {}

  return apiOk({ user }, 201)
}
