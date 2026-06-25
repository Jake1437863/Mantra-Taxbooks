'use client'
import { useState } from 'react'

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      setErrMsg('New passwords do not match.')
      setStatus('err')
      return
    }
    if (form.newPassword.length < 8) {
      setErrMsg('New password must be at least 8 characters.')
      setStatus('err')
      return
    }
    setStatus('loading')
    setErrMsg('')

    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
    })

    if (res.ok) {
      setStatus('ok')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      const data = await res.json()
      setErrMsg(data.error || 'Failed to change password.')
      setStatus('err')
    }
  }

  return (
    <>
      <div className="pg-title">Change Password</div>
      <div className="pg-sub">Update your account password regularly for security.</div>

      <div className="card" style={{ maxWidth: 500 }}>
        <div className="card-header"><h3>Change Password</h3></div>
        <div className="card-body">
          {status === 'ok' && <div className="alert alert-ok"><i className="fas fa-check-circle" /> Password changed successfully!</div>}
          {status === 'err' && <div className="alert alert-err"><i className="fas fa-exclamation-circle" /> {errMsg}</div>}

          <form onSubmit={handleSubmit}>
            {(['currentPassword', 'newPassword', 'confirmPassword'] as const).map((field) => {
              const labels = { currentPassword: 'Current Password', newPassword: 'New Password', confirmPassword: 'Confirm New Password' }
              const pwKey = field === 'currentPassword' ? 'current' : field === 'newPassword' ? 'new' : 'confirm'
              return (
                <div key={field} className="form-group">
                  <label>{labels[field]}</label>
                  <div className="input-group" style={{ position: 'relative' }}>
                    <i className="fas fa-lock input-icon" />
                    <input
                      className="form-control"
                      type={showPw[pwKey as keyof typeof showPw] ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      required
                    />
                    <button type="button" className="toggle-pw" onClick={() => setShowPw(s => ({ ...s, [pwKey]: !s[pwKey as keyof typeof s] }))}>
                      <i className={`fas fa-${showPw[pwKey as keyof typeof showPw] ? 'eye-slash' : 'eye'}`} />
                    </button>
                  </div>
                </div>
              )
            })}

            <div className="alert alert-info" style={{ fontSize: '.8rem' }}>
              <i className="fas fa-info-circle" /> Use at least 8 characters with a mix of letters, numbers, and symbols.
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? <><i className="fas fa-spinner fa-spin" /> Updating...</> : <><i className="fas fa-key" /> Update Password</>}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
