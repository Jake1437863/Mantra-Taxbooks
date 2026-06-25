'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

    if (role === 'ADMIN') router.push('/admin/dashboard')
    else if (role === 'SUPPORT' || role === 'PAYMENTS') router.push('/employee/tickets')
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
          New to Mantra Taxbooks?{' '}
          <Link href="/#contact" style={{ color: 'var(--red)', textDecoration: 'none', fontWeight: 600 }}>Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
