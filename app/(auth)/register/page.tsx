'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState(false)
  const [showCpw, setShowCpw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const set = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone || null, password: form.password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Registration failed. Please try again.')
      setLoading(false)
      return
    }

    // Auto sign-in after registration
    const signInRes = await signIn('credentials', { email: form.email, password: form.password, redirect: false })
    setLoading(false)

    if (signInRes?.error) {
      // Account created but sign-in failed — redirect to login
      router.push('/login?registered=1')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 460 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo">
            <span className="logo-m">MANTRA</span>
            <span className="logo-t">TAXBOOKS</span>
          </div>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 5 }}>Create Account</h2>
        <p style={{ color: '#666', fontSize: '.85rem', marginBottom: 22 }}>Start your CA-assisted tax filing journey today</p>

        {error && <div className="alert alert-err"><i className="fas fa-exclamation-circle" /> {error}</div>}

        {/* Google Sign Up */}
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
          Sign up with Google
        </button>

        <div className="divider"><span>or create account with email</span></div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <div className="input-group">
              <i className="fas fa-user input-icon" />
              <input className="form-control" type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => set('name', e.target.value)} required autoFocus />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-group">
              <i className="fas fa-envelope input-icon" />
              <input className="form-control" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Mobile Number <span style={{ color: '#aaa', fontWeight: 400 }}>(optional)</span></label>
            <div className="input-group">
              <i className="fas fa-phone input-icon" />
              <input className="form-control" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>

          <div className="form-grid-2" style={{ gap: 12 }}>
            <div className="form-group">
              <label>Password *</label>
              <div className="input-group" style={{ position: 'relative' }}>
                <i className="fas fa-lock input-icon" />
                <input className="form-control" type={showPw ? 'text' : 'password'} placeholder="Min 8 characters" value={form.password} onChange={e => set('password', e.target.value)} required />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                  <i className={`fas fa-${showPw ? 'eye-slash' : 'eye'}`} />
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <div className="input-group" style={{ position: 'relative' }}>
                <i className="fas fa-lock input-icon" />
                <input className="form-control" type={showCpw ? 'text' : 'password'} placeholder="Re-enter password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} required />
                <button type="button" className="toggle-pw" onClick={() => setShowCpw(!showCpw)}>
                  <i className={`fas fa-${showCpw ? 'eye-slash' : 'eye'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="alert alert-info" style={{ fontSize: '.78rem', marginBottom: 16 }}>
            <i className="fas fa-shield-alt" /> Your data is encrypted and stored securely. We never share your information.
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading
              ? <><i className="fas fa-spinner fa-spin" /> Creating Account...</>
              : <><i className="fas fa-user-plus" /> Create Account</>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '.85rem', color: '#666' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--red)', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: '.78rem', color: '#aaa' }}>
          Admin?{' '}
          <Link href="/admin/login" style={{ color: 'var(--red)', textDecoration: 'none', fontWeight: 600 }}>Admin Portal →</Link>
        </div>
      </div>
    </div>
  )
}
