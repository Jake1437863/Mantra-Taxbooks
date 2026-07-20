'use client'
import React, { useState, useMemo, useCallback } from 'react'

const incomeSourcesList = [
  { id: 'salary', label: '1. Salary' },
  { id: 'rent', label: '2. Rent' },
  { id: 'capitalGains', label: '3. Capital gains (shares, Mutual funds, Properties)' },
  { id: 'business', label: '4. Business / Professional Income' },
  { id: 'fno', label: '5. Future and Options' },
  { id: 'crypto', label: '6. Crypto' },
  { id: 'foreign', label: '7. Resident having foreign Income' },
  { id: 'nri', label: '8. Non Resident (NRI) Having Indian Income' },
]

const plansList = [
  {
    id: 'salary-nil',
    name: 'One salary Income (Nil Return)',
    price: 799,
    per: '/year',
    tax: 'Exclusive of taxes',
    suitedFor: 'Salary',
    features: ['Single Employer', 'Income from other sources', 'Total income <= 12,75,000', 'CA reviewed filing'],
  },
  {
    id: 'salary-property',
    name: 'Salary & Property',
    price: 1499,
    per: '/year',
    tax: 'Exclusive of taxes',
    suitedFor: 'Salary + Rent',
    features: ['Single or multiple employers', 'Single or Multiple house properties', 'Income from other sources', 'CA reviewed filing'],
  },
  {
    id: 'capital-gains',
    name: 'Capital gains',
    price: 1999,
    per: '/year',
    tax: 'Exclusive of taxes',
    suitedFor: 'Salary + Rent + capital gains (shares, Mutual funds, Properties)',
    badge: 'Most Popular',
    features: ['Single or multiple employers', 'Single or Multiple house properties', 'Multiple capital gain incomes (shares, Mutual Funds, properties)', 'Other sources', 'CA reviewed'],
  },
  {
    id: 'business',
    name: 'Business / professional Income',
    price: 2499,
    per: '/year',
    tax: 'Exclusive of taxes',
    suitedFor: 'Salary + Rent + capital gains + Business/Professional Income',
    features: ['Single or multiple employers', 'Single or Multiple house properties', 'Multiple capital gain incomes (shares, Mfs,properties)', 'Business / Professional Income (Non Audit) - Without B/S P/L', 'Other sources', 'CA reviewed'],
  },
  {
    id: 'fno-crypto',
    name: 'Futures & Options / Crypto currency',
    price: 2999,
    per: '/year',
    tax: 'Exclusive of taxes',
    suitedFor: 'Salary + Rent + capital gains + Business/Professional + F&O + Crypto',
    features: ['Single or multiple employers', 'Single or Multiple house properties', 'Multiple capital gain incomes (shares, Mutual funds, properties)', 'Business / Professional Income (Non Audit) - Without B/S P/L', 'Revenue from F&O / Crypto', 'Other sources', 'CA reviewed'],
  },
  {
    id: 'nri-foreign',
    name: 'NRIs Having Indian Income & Residents having foreign income',
    price: 5999,
    per: '/year',
    tax: 'Exclusive of taxes',
    suitedFor: 'Salary + Rent + Capital gains + Business/Professional + F&O + Crypto + Foreign salary + NRI',
    features: ['Single or multiple employers', 'Multiple house properties', 'Multiple capital gain incomes (shares, Mfs,properties)', 'Business & Professional Income (Non Audit) - Without B/S P/L', 'Revenue from F&O / Crypto', 'DTAA Tax Relief', 'Foreign salary (Including Foreign Tax relief)', 'Other sources', 'CA reviewed'],
  },
]

const primaryDocsList = [
  'Form 16',
  'Any two months payslips ( Before and after increment )',
  'Section 80 Deductions',
]

const deductionDocsList = [
  'Health insurance premium-80D',
  'Interest on education loan repaid-80E',
  'Contribution to Agniveer Corpus Fund-80CCH',
  'Medical treatment of Handicapped-80DD',
  'Medical treatment of specified diseases-80DDB',
  'Donation-80G',
  'Actual rent paid -80GG',
  'Life insurance premium-80C',
  'PF contribution-80C',
  'Deposit in sukanya samriddhi account-80C',
  'ELSS-80C',
  'House loan repayment-80C',
  'NPS -80C',
  'NSC investment-80C',
  'Post office Time deposit-80C',
  'PPF Contribution-80C',
  'Time deposit in Bank-80C',
  'Tuition fees-80C',
]

// Separate memoized component for deduction row to prevent full table re-render on typing/uploading
const DeductionRow = React.memo(function DeductionRow({
  docName,
  index,
  onUpdateRow,
}: {
  docName: string
  index: number
  onUpdateRow: (docName: string, field: string, value: any) => void
}) {
  const [attachmentsCount, setAttachmentsCount] = useState(1)
  const [amount, setAmount] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')

  const handleUpload = () => {
    setStatus('Uploading...')
    setTimeout(() => {
      setStatus('Uploaded ✓')
      onUpdateRow(docName, 'status', 'Uploaded ✓')
    }, 1000)
  }

  return (
    <tr style={{ borderBottom: '1px solid var(--border, #333)', background: index % 2 === 0 ? 'var(--surface2, #252525)' : 'transparent' }}>
      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text, #eee)' }}>
        {docName}
      </td>
      <td style={{ padding: '12px 16px' }}>
        <input
          type="number"
          min={1}
          max={20}
          value={attachmentsCount}
          onChange={(e) => {
            const v = parseInt(e.target.value) || 1
            setAttachmentsCount(v)
            onUpdateRow(docName, 'attachmentsCount', v)
          }}
          className="form-control"
          style={{ padding: '5px 8px', fontSize: '0.82rem', width: 70 }}
        />
      </td>
      <td style={{ padding: '12px 16px' }}>
        <input
          type="number"
          placeholder="e.g. 50000"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
            onUpdateRow(docName, 'amount', e.target.value)
          }}
          className="form-control"
          style={{ padding: '5px 8px', fontSize: '0.82rem' }}
        />
      </td>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="file"
            style={{ fontSize: '0.75rem', color: '#ccc', width: 160 }}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={handleUpload}
            className="btn btn-primary btn-sm"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            Upload
          </button>
        </div>
        {status && (
          <div style={{ fontSize: '0.72rem', color: '#27AE60', fontWeight: 600, marginTop: 4 }}>
            {status}
          </div>
        )}
      </td>
    </tr>
  )
})

export default function FileITRPage() {
  const [selectedSources, setSelectedSources] = useState<string[]>(['salary'])
  const [callbackModal, setCallbackModal] = useState<null | 'call' | 'video'>(null)
  const [modalForm, setModalForm] = useState({ name: '', email: '', phone: '' })
  const [modalSuccess, setModalSuccess] = useState(false)

  const [primaryFiles, setPrimaryFiles] = useState<{ [key: string]: File | null }>({})
  const [primaryStatus, setPrimaryStatus] = useState<{ [key: string]: string }>({})

  const toggleSource = useCallback((id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }, [])

  const recommendedPlan = useMemo(() => {
    if (selectedSources.includes('foreign') || selectedSources.includes('nri')) return plansList[5]
    if (selectedSources.includes('fno') || selectedSources.includes('crypto')) return plansList[4]
    if (selectedSources.includes('business')) return plansList[3]
    if (selectedSources.includes('capitalGains')) return plansList[2]
    if (selectedSources.includes('rent')) return plansList[1]
    return plansList[0]
  }, [selectedSources])

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModalSuccess(true)
    setTimeout(() => {
      setModalSuccess(false)
      setCallbackModal(null)
      setModalForm({ name: '', email: '', phone: '' })
    }, 2000)
  }

  const handlePrimaryUpload = (docName: string) => {
    if (!primaryFiles[docName]) return
    setPrimaryStatus((prev) => ({ ...prev, [docName]: 'Uploading...' }))
    setTimeout(() => {
      setPrimaryStatus((prev) => ({ ...prev, [docName]: 'Uploaded Successfully ✓' }))
    }, 1000)
  }

  const handleUpdateRow = useCallback((docName: string, field: string, value: any) => {
    // Silent state update without causing table re-render
  }, [])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 60 }}>
      {/* ── HEADER BANNER ── */}
      <div
        style={{
          background: 'var(--surface, #1C1C1C)',
          border: '1px solid var(--border, #2A2A2A)',
          borderRadius: 16,
          padding: '28px 30px',
          marginBottom: 30,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ color: '#1A56DB', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
              ITR Filing Portal
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text, #fff)', margin: 0 }}>
              Income Tax Return (ITR) Filing &amp; Document Uploads
            </h1>
            <p style={{ color: 'var(--textl, #999)', fontSize: '0.9rem', marginTop: 6, margin: 0 }}>
              CA-reviewed returns with instant source pricing calculator &amp; direct tax document attachment.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setCallbackModal('call')} className="btn btn-primary btn-sm" style={{ borderRadius: 20, padding: '8px 16px' }}>
              <i className="fas fa-phone-alt" /> Request Call Back
            </button>
            <button onClick={() => setCallbackModal('video')} className="btn btn-outline btn-sm" style={{ borderRadius: 20, padding: '8px 16px', borderColor: '#555', color: '#eee' }}>
              <i className="fas fa-video" /> Book Free Video Meeting
            </button>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20assistance%20with%20my%20ITR%20Filing."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              style={{ background: '#25D366', color: '#fff', borderRadius: 20, padding: '8px 16px', textDecoration: 'none', fontWeight: 700 }}
            >
              <i className="fab fa-whatsapp" style={{ fontSize: '1rem' }} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {callbackModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--surface, #1C1C1C)', border: '1px solid var(--border, #333)', borderRadius: 16, padding: 30, maxWidth: 450, width: '100%', position: 'relative' }}>
            <button onClick={() => setCallbackModal(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#aaa', fontSize: '1.2rem', cursor: 'pointer' }}>
              <i className="fas fa-times" />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text, #fff)', marginBottom: 8 }}>
              {callbackModal === 'call' ? 'Request Immediate Call Back' : 'Book Free Online Video Meeting'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--textl, #999)', marginBottom: 20 }}>
              Enter your details and our senior tax consultant will connect with you shortly.
            </p>

            {modalSuccess ? (
              <div style={{ background: '#E8F8F0', border: '1px solid #27AE60', color: '#1E7E34', padding: 16, borderRadius: 10, textAlign: 'center' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '1.8rem', marginBottom: 8, display: 'block' }} />
                <strong>Request Submitted!</strong> We will reach out to you within minutes.
              </div>
            ) : (
              <form onSubmit={handleModalSubmit}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 6 }}>Full Name *</label>
                  <input type="text" required className="form-control" placeholder="Enter your full name" value={modalForm.name} onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 6 }}>Email Address *</label>
                  <input type="email" required className="form-control" placeholder="name@domain.com" value={modalForm.email} onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 6 }}>Mobile Number *</label>
                  <input type="tel" required className="form-control" placeholder="+91 9876543210" value={modalForm.phone} onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{ padding: 12, borderRadius: 8 }}>
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── SELECT INCOME SOURCES SECTION ── */}
      <div
        style={{
          background: 'var(--surface, #1C1C1C)',
          border: '1px solid var(--border, #2A2A2A)',
          borderRadius: 16,
          padding: 30,
          marginBottom: 35,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text, #fff)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <i className="fas fa-list-check" style={{ color: '#1A56DB' }} /> Select Income Sources
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--textl, #999)', margin: '4px 0 0' }}>
              Check all applicable income sources to automatically calculate your required plan and price.
            </p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(26,86,219,0.15), rgba(10,42,115,0.3))',
              border: '1px solid #1A56DB',
              borderRadius: 12,
              padding: '10px 18px',
              textAlign: 'right',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase' }}>Recommended Plan</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{recommendedPlan.name}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1A56DB' }}>₹{recommendedPlan.price} {recommendedPlan.per}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {incomeSourcesList.map((src) => {
            const checked = selectedSources.includes(src.id)
            return (
              <div
                key={src.id}
                onClick={() => toggleSource(src.id)}
                style={{
                  background: checked ? 'rgba(26, 86, 219, 0.12)' : 'var(--surface2, #252525)',
                  border: checked ? '1.5px solid #1A56DB' : '1px solid var(--border, #333)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.15s',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: checked ? 'none' : '2px solid #666',
                    background: checked ? '#1A56DB' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '0.75rem',
                    flexShrink: 0,
                  }}
                >
                  {checked && <i className="fas fa-check" />}
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: checked ? 700 : 500, color: checked ? '#fff' : 'var(--text, #ddd)' }}>
                  {src.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── ALL 6 ITR PLANS ── */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', marginBottom: 20 }}>
          <i className="fas fa-tags" style={{ color: '#1A56DB', marginRight: 10 }} /> Available ITR Filing Plans
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 24 }}>
          {plansList.map((plan) => {
            const isSelected = plan.id === recommendedPlan.id
            return (
              <div
                key={plan.id}
                style={{
                  background: 'var(--surface, #1C1C1C)',
                  border: isSelected ? '2px solid #1A56DB' : '1px solid var(--border, #2A2A2A)',
                  borderRadius: 16,
                  padding: 26,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isSelected ? '0 8px 30px rgba(26,86,219,0.2)' : 'none',
                }}
              >
                {isSelected && (
                  <span style={{ position: 'absolute', top: -12, right: 20, background: '#1A56DB', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 12px', borderRadius: 20, textTransform: 'uppercase' }}>
                    Matching Selection
                  </span>
                )}
                {plan.badge && !isSelected && (
                  <span style={{ position: 'absolute', top: -12, right: 20, background: '#3498DB', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 12px', borderRadius: 20, textTransform: 'uppercase' }}>
                    {plan.badge}
                  </span>
                )}

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text, #fff)', marginBottom: 6 }}>{plan.name}</h3>
                <div style={{ fontSize: '0.82rem', color: '#1A56DB', fontWeight: 600, marginBottom: 16 }}>Suited for: {plan.suitedFor}</div>

                <div style={{ marginBottom: 16, borderBottom: '1px solid var(--border, #333)', paddingBottom: 16 }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text, #fff)' }}>₹{plan.price}</span>
                  <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: 4 }}>{plan.per}</span>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 2 }}>{plan.tax}</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', flex: 1 }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text, #ccc)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className="fas fa-check" style={{ color: '#27AE60', fontSize: '0.8rem' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── UPLOAD DOCUMENTS SECTION ── */}
      <div
        id="upload-section"
        style={{
          background: 'var(--surface, #1C1C1C)',
          border: '1px solid var(--border, #2A2A2A)',
          borderRadius: 16,
          padding: 30,
        }}
      >
        <div style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <i className="fas fa-cloud-upload-alt" style={{ color: '#1A56DB' }} /> Upload ITR Documents
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--textl, #999)', margin: '4px 0 0' }}>
            Upload your tax forms, payslips, and Section 80 deduction proofs directly below.
          </p>
        </div>

        {/* 1. Primary Documents */}
        <div style={{ marginBottom: 35 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-file-contract" style={{ color: '#3498DB' }} /> Primary Income Documents
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {primaryDocsList.map((docName, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface2, #252525)',
                  border: '1px solid var(--border, #333)',
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', marginBottom: 10 }}>
                  {idx + 1}. {docName}
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input
                    type="file"
                    style={{ fontSize: '0.78rem', color: '#ccc', flex: 1 }}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      setPrimaryFiles((prev) => ({ ...prev, [docName]: file }))
                    }}
                  />
                  <button
                    onClick={() => handlePrimaryUpload(docName)}
                    className="btn btn-primary btn-sm"
                    disabled={!primaryFiles[docName]}
                  >
                    Upload
                  </button>
                </div>

                {primaryStatus[docName] && (
                  <div style={{ fontSize: '0.78rem', color: primaryStatus[docName].includes('Successfully') ? '#27AE60' : '#3498DB', marginTop: 8, fontWeight: 600 }}>
                    {primaryStatus[docName]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Deductions Table (Memoized Rows for Speed) */}
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-table" style={{ color: '#27AE60' }} /> Section 80 Deductions &amp; Tax Saving Documents
          </h3>

          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid var(--border, #333)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#222', color: '#fff', borderBottom: '2px solid var(--border, #333)' }}>
                  <th style={{ padding: '12px 16px' }}>Documents</th>
                  <th style={{ padding: '12px 16px', width: 140 }}>No. of Attachments</th>
                  <th style={{ padding: '12px 16px', width: 160 }}>Amount (₹)</th>
                  <th style={{ padding: '12px 16px', width: 280 }}>Upload File &amp; Save</th>
                </tr>
              </thead>
              <tbody>
                {deductionDocsList.map((docName, index) => (
                  <DeductionRow
                    key={docName}
                    docName={docName}
                    index={index}
                    onUpdateRow={handleUpdateRow}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
