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
