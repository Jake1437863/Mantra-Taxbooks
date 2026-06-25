import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    if (!token) return NextResponse.redirect(new URL('/login', req.url))

    const role = token.role as string

    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (pathname.startsWith('/employee')) {
      const allowed = ['ADMIN', 'SUPPORT', 'PAYMENTS']
      if (!allowed.includes(role)) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
      if (pathname.startsWith('/employee/tickets') && !['ADMIN', 'SUPPORT'].includes(role)) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
      if (pathname.startsWith('/employee/payments') && !['ADMIN', 'PAYMENTS'].includes(role)) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    const clientPaths = ['/dashboard', '/invoices', '/documents', '/tickets', '/change-password']
    if (clientPaths.some((p) => pathname.startsWith(p)) && role !== 'CLIENT' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/employee/:path*',
    '/dashboard/:path*',
    '/invoices/:path*',
    '/documents/:path*',
    '/tickets/:path*',
    '/change-password',
  ],
}
