'use client'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get('registered') === '1') {
      setSuccess('Account created! Please sign in.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const emailLower = email.trim().toLowerCase()
    const targetUrl = emailLower.includes('admin')
      ? '/admin/dashboard'
      : emailLower.includes('support')
      ? '/employee/tickets'
      : '/dashboard'

    const res = await signIn('credentials', { email, password, callbackUrl: targetUrl, redirect: false })

    if (res?.error) {
      setLoading(false)
      setError('Invalid email or password.')
      return
    }

    window.location.href = res?.url || targetUrl
  }

  const fillTestCredentials = (e: string, p: string) => {
    setEmail(e)
    setPassword(p)
    setError('')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo">
            <span className="logo-m">MANTRA</span>
            <span className="logo-t">TAXBOOKS</span>
          </div>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 5 }}>Welcome Back</h2>
        <p style={{ color: '#666', fontSize: '.85rem', marginBottom: 16 }}>Sign in to your account to continue</p>

        {/* Quick Test Credentials Helper Box */}
        <div style={{ background: '#F0F4FF', border: '1px solid #1A56DB', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A56DB', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="fas fa-key" /> 1-Click Test Credentials
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => fillTestCredentials('demo@client.com', 'Client@123')}
              style={{ background: '#fff', border: '1px solid #1A56DB', color: '#1A56DB', fontSize: '0.72rem', fontWeight: 700, padding: '4px 8px', borderRadius: 6, cursor: 'pointer' }}
            >
              Client Demo
            </button>
            <button
              type="button"
              onClick={() => fillTestCredentials('admin@mantrataxbooks.com', 'Admin@123')}
              style={{ background: '#fff', border: '1px solid #1A56DB', color: '#1A56DB', fontSize: '0.72rem', fontWeight: 700, padding: '4px 8px', borderRadius: 6, cursor: 'pointer' }}
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => fillTestCredentials('support@mantrataxbooks.com', 'Support@123')}
              style={{ background: '#fff', border: '1px solid #1A56DB', color: '#1A56DB', fontSize: '0.72rem', fontWeight: 700, padding: '4px 8px', borderRadius: 6, cursor: 'pointer' }}
            >
              Support Demo
            </button>
          </div>
        </div>

        {success && <div className="alert alert-ok"><i className="fas fa-check-circle" /> {success}</div>}
        {error && <div className="alert alert-err"><i className="fas fa-exclamation-circle" /> {error}</div>}

        {/* Google Sign In */}
        <button
          type="button"
          className="btn-google"
          disabled={googleLoading || loading}
          onClick={() => { setGoogleLoading(true); signIn('google', { callbackUrl: '/dashboard' }) }}
        >
          {googleLoading ? (
            <i className="fas fa-spinner fa-spin" />
          ) : (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          Continue with Google
        </button>

        <div className="divider"><span>or sign in with email</span></div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-group">
              <i className="fas fa-envelope input-icon" />
              <input className="form-control" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              Password
              <Link href="/forgot-password" style={{ color: 'var(--red)', textDecoration: 'none', fontSize: '.78rem', fontWeight: 600 }}>Forgot password?</Link>
            </label>
            <div className="input-group" style={{ position: 'relative' }}>
              <i className="fas fa-lock input-icon" />
              <input className="form-control" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                <i className={`fas fa-${showPw ? 'eye-slash' : 'eye'}`} />
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 8 }} disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin" /> Signing in...</> : <><i className="fas fa-sign-in-alt" /> Sign In</>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 18, fontSize: '.85rem', color: '#666' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: 'var(--red)', textDecoration: 'none', fontWeight: 600 }}>Register here</Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: '.78rem', color: '#aaa' }}>
          Admin?{' '}
          <Link href="/admin/login" style={{ color: 'var(--red)', textDecoration: 'none', fontWeight: 600 }}>Admin Portal →</Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-card" style={{ textAlign: 'center' }}><i className="fas fa-spinner fa-spin" /></div></div>}>
      <LoginForm />
    </Suspense>
  )
}
