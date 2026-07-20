import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function applyCdnHeaders(res: NextResponse, pathname: string): NextResponse {
  const isPrivatePath =
    pathname.startsWith('/api/') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/file-itr') ||
    pathname.startsWith('/company-registration') ||
    pathname.startsWith('/invoices') ||
    pathname.startsWith('/documents') ||
    pathname.startsWith('/tickets') ||
    pathname.startsWith('/change-password') ||
    pathname.startsWith('/summary') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/employee') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/delegates')

  if (isPrivatePath) {
    // Vercel Edge CDN Bypass: Ensure sensitive user data is NEVER cached globally
    res.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.headers.set('Pragma', 'no-cache')
    res.headers.set('Expires', '0')
  } else if (pathname === '/' || pathname.startsWith('/services')) {
    // Public Marketing Pages: Vercel Edge Cache + Stale-While-Revalidate
    res.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  }

  return res
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always accessible auth pages
  if (pathname === '/admin/login' || pathname === '/impersonate' || pathname.startsWith('/delegates/accept')) {
    return applyCdnHeaders(NextResponse.next(), pathname)
  }

  const token = await getToken({ req })
  const role = token?.role as string | undefined

  // Admin routes: require ADMIN role, redirect to /admin/login otherwise
  if (pathname.startsWith('/admin')) {
    if (!token || role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return applyCdnHeaders(NextResponse.next(), pathname)
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
    return applyCdnHeaders(NextResponse.next(), pathname)
  }

  // Client routes
  if (!token) return NextResponse.redirect(new URL('/login', req.url))
  const clientPaths = ['/dashboard', '/invoices', '/documents', '/tickets', '/change-password', '/summary', '/file-itr', '/company-registration']
  if (clientPaths.some((p) => pathname.startsWith(p)) && role !== 'CLIENT' && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return applyCdnHeaders(NextResponse.next(), pathname)
}

export const config = {
  matcher: [
    '/',
    '/services/:path*',
    '/admin/:path*',
    '/employee/:path*',
    '/dashboard/:path*',
    '/invoices/:path*',
    '/documents/:path*',
    '/tickets/:path*',
    '/change-password',
    '/profile',
    '/delegates',
    '/summary',
    '/file-itr',
    '/company-registration',
    '/api/:path*',
  ],
}
