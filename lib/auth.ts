import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { UserRole } from '@prisma/client'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const googleProviders = process.env.GOOGLE_CLIENT_ID
  ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ]
  : []

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    ...googleProviders,
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        impersonateToken: { label: 'Impersonate Token', type: 'text' },
      },
      async authorize(credentials) {
        // Impersonation flow
        if (credentials?.impersonateToken) {
          const imp = await prisma.impersonationToken.findUnique({
            where: { token: credentials.impersonateToken },
            include: { client: true },
          })
          if (!imp || imp.used || imp.expiresAt < new Date()) return null
          await prisma.impersonationToken.update({ where: { id: imp.id }, data: { used: true } })
          return {
            id: imp.clientId,
            email: imp.client.email,
            name: imp.client.name,
            role: 'CLIENT' as UserRole,
            impersonatedBy: imp.adminId,
          }
        }

        // Normal credentials flow
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
        if (!user || !user.isActive || !user.passwordHash) return null

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Block disabled Google users
      if (account?.provider === 'google' && profile?.email) {
        const existing = await prisma.user.findUnique({ where: { email: profile.email } })
        if (existing && !existing.isActive) return false
      }
      return true
    },
    async jwt({ token, user, account }) {
      // Google OAuth — first sign-in
      if (account?.provider === 'google' && user?.email) {
        let dbUser = await prisma.user.findUnique({ where: { email: user.email } })
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? user.email.split('@')[0],
              passwordHash: null,
              emailVerified: true,
              role: UserRole.CLIENT,
              isActive: true,
            },
          })
        } else if (!dbUser.emailVerified) {
          await prisma.user.update({ where: { id: dbUser.id }, data: { emailVerified: true } })
        }
        token.id = dbUser.id
        token.role = dbUser.role
        token.needsTerms = !dbUser.termsAccepted
        return token
      }

      // Credentials sign-in
      if (user) {
        token.id = user.id
        token.role = user.role
        if (user.impersonatedBy) {
          token.impersonatedBy = user.impersonatedBy
        } else {
          const delegation = await prisma.delegation.findFirst({
            where: { delegateId: user.id, status: 'ACTIVE' },
          })
          if (delegation) token.delegateFor = delegation.ownerId
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        if (token.needsTerms) session.user.needsTerms = true
        if (token.impersonatedBy) session.user.impersonatedBy = token.impersonatedBy as string
        if (token.delegateFor) session.user.delegateFor = token.delegateFor as string
      }
      return session
    },
  },
}
