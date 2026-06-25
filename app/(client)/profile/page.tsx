'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Puducherry',
  'Chandigarh','Dadra & Nagar Haveli','Daman & Diu','Lakshadweep','Andaman & Nicobar',
]

export default function ProfilePage() {
  const { data: session } = useSession()
  const [form, setForm] = useState({
    name: '', phone: '', company: '', gstNumber: '', cinNumber: '',
    address: '', city: '', state: '', pincode: '',
  })
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/auth/profile')
      .then(r => r.json())
      .then(d => {
        if (d.user) {
          setEmail(d.user.email || '')
          setForm({
            name: d.user.name || '',
            phone: d.user.phone || '',
            company: d.user.company || '',
            gstNumber: d.user.gstNumber || '',
            cinNumber: d.user.cinNumber || '',
            address: d.user.address || '',
            city: d.user.city || '',
            state: d.user.state || '',
            pincode: d.user.pincode || '',
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const set = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    const res = await fetch('/api/auth/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const d = await res.json()
    setSaving(false)
    if (res.ok) setMsg({ type: 'ok', text: 'Profile updated successfully.' })
    else setMsg({ type: 'err', text: d.error || 'Failed to update profile.' })
  }

  const isDelegate = !!session?.user?.delegateFor

  return (
    <>
      <div className="pg-title">My Profile</div>
      <div className="pg-sub">Manage your personal and business information.</div>

      {isDelegate && (
        <div className="alert alert-warn" style={{ marginBottom: 20 }}>
          <i className="fas fa-info-circle" /> You are viewing as a delegate. Profile editing is restricted to the account owner.
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}><i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem', color: 'var(--red)' }} /></div>
      ) : (
        <form onSubmit={handleSubmit}>
          {msg && (
            <div className={`alert ${msg.type === 'ok' ? 'alert-ok' : 'alert-err'}`} style={{ marginBottom: 18 }}>
              <i className={`fas fa-${msg.type === 'ok' ? 'check-circle' : 'exclamation-circle'}`} /> {msg.text}
            </div>
          )}

          {/* Personal */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><h3><i className="fas fa-user" style={{ marginRight: 8, color: 'var(--red)' }} />Personal Information</h3></div>
            <div className="card-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input className="form-control" value={form.name} onChange={e => set('name', e.target.value)} required disabled={isDelegate} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-control" value={email} disabled style={{ background: '#f9f9f9', color: '#888' }} />
                  <span style={{ fontSize: '.72rem', color: '#999', marginTop: 4, display: 'block' }}>Contact support to change email.</span>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-group">
                    <i className="fas fa-phone input-icon" />
                    <input className="form-control" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" disabled={isDelegate} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><h3><i className="fas fa-building" style={{ marginRight: 8, color: 'var(--red)' }} />Business Details</h3></div>
            <div className="card-body">
              <div className="form-group">
                <label>Company Name</label>
                <input className="form-control" value={form.company} onChange={e => set('company', e.target.value)} placeholder="ABC Enterprises Pvt Ltd" disabled={isDelegate} />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>GST Number <span style={{ color: '#999', fontWeight: 400 }}>(15 digits)</span></label>
                  <input className="form-control" value={form.gstNumber} onChange={e => set('gstNumber', e.target.value.toUpperCase())} maxLength={15} placeholder="27AAAAA0000A1Z5" style={{ fontFamily: 'monospace', letterSpacing: 1 }} disabled={isDelegate} />
                </div>
                <div className="form-group">
                  <label>CIN Number <span style={{ color: '#999', fontWeight: 400 }}>(21 chars)</span></label>
                  <input className="form-control" value={form.cinNumber} onChange={e => set('cinNumber', e.target.value.toUpperCase())} maxLength={21} placeholder="U12345MH2010PTC123456" style={{ fontFamily: 'monospace', letterSpacing: 1 }} disabled={isDelegate} />
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><h3><i className="fas fa-map-marker-alt" style={{ marginRight: 8, color: 'var(--red)' }} />Registered Address</h3></div>
            <div className="card-body">
              <div className="form-group">
                <label>Street Address</label>
                <textarea className="form-control" rows={2} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Building, Street, Area" disabled={isDelegate} />
              </div>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>City</label>
                  <input className="form-control" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Mumbai" disabled={isDelegate} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select className="form-control" value={form.state} onChange={e => set('state', e.target.value)} disabled={isDelegate}>
                    <option value="">Select state</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input className="form-control" value={form.pincode} onChange={e => set('pincode', e.target.value)} maxLength={6} placeholder="400001" disabled={isDelegate} />
                </div>
              </div>
            </div>
          </div>

          {!isDelegate && (
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
                {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><i className="fas fa-save" /> Save Profile</>}
              </button>
            </div>
          )}
        </form>
      )}
    </>
  )
}
