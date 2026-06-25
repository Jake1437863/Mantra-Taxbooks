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

  useEffect(() => {
    if (searchParams.get('registered') === '1') {
      setSuccess('Account created! Please sign in.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password.')
      return
    }

    const meRes = await fetch('/api/auth/me')
    const me = await meRes.json()
    const role = me?.role

    if (role === 'ADMIN') {
      setError('Admin accounts must use the Admin Portal.')
      return
    }
    if (role === 'SUPPORT' || role === 'PAYMENTS') router.push('/employee/tickets')
    else router.push('/dashboard')
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
        <p style={{ color: '#666', fontSize: '.85rem', marginBottom: 22 }}>Sign in to your account to continue</p>

        {success && <div className="alert alert-ok"><i className="fas fa-check-circle" /> {success}</div>}
        {error && <div className="alert alert-err"><i className="fas fa-exclamation-circle" /> {error}</div>}

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
