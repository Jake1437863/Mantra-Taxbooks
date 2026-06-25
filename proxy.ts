import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always accessible auth pages
  if (pathname === '/admin/login') return NextResponse.next()
  if (pathname === '/impersonate') return NextResponse.next()
  if (pathname.startsWith('/delegates/accept')) return NextResponse.next()

  const token = await getToken({ req })
  const role = token?.role as string | undefined

  // Admin routes: require ADMIN role, redirect to /admin/login otherwise
  if (pathname.startsWith('/admin')) {
    if (!token || role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next()
  }

  // Employee routes
  if (pathname.startsWith('/employee')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url))
    const allowed = ['ADMIN', 'SUPPORT', 'PAYMENTS']
    if (!allowed.includes(role!)) return NextResponse.redirect(new URL('/login', req.url))
    if (pathname.startsWith('/employee/tickets') && !['ADMIN', 'SUPPORT'].includes(role!)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (pathname.startsWith('/employee/payments') && !['ADMIN', 'PAYMENTS'].includes(role!)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
  }

  // Client routes
  if (!token) return NextResponse.redirect(new URL('/login', req.url))
  const clientPaths = ['/dashboard', '/invoices', '/documents', '/tickets', '/change-password']
  if (clientPaths.some((p) => pathname.startsWith(p)) && role !== 'CLIENT' && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

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
