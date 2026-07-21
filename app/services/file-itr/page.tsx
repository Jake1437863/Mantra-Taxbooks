'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'

const itrPlans = [
  {
    id: 'salary-nil',
    name: 'Salary (Nil Return)',
    price: '999',
    per: 'per year',
    tax: 'Exclusive of GST',
    badge: null,
    desc: 'Single salary income with total income ≤ ₹12,75,000',
    features: ['Single Employer', 'Income from other sources', 'Total income ≤ ₹12,75,000', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report'],
  },
  {
    id: 'salary-property',
    name: 'Salary & Property',
    price: '2,000',
    per: 'per year',
    tax: 'Exclusive of GST',
    badge: null,
    desc: 'Salary + House Property income',
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Income from other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report'],
  },
  {
    id: 'capital-gains',
    name: 'Capital Gains',
    price: '2,500',
    per: 'per year',
    tax: 'Exclusive of GST',
    badge: 'Most Popular',
    desc: 'Salary + Rent + Capital Gains (shares, MFs, properties)',
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Multiple capital gain incomes (shares, MFs, properties)', 'Other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report', 'Losses carried forward report'],
  },
  {
    id: 'business',
    name: 'Business / Professional Income',
    price: '3,000',
    per: 'per year',
    tax: 'Exclusive of GST',
    badge: null,
    desc: 'Salary + Rent + Capital Gains + Business/Professional Income',
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Multiple capital gain incomes', 'Business/Professional Income (Non-Audit) — without B/S & P&L', 'Other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report', 'Losses carried forward report'],
  },
  {
    id: 'fno-crypto',
    name: 'Futures & Options / Cryptocurrency',
    price: '3,500',
    per: 'per year',
    tax: 'Exclusive of GST',
    badge: null,
    desc: 'All income types including F&O and Crypto',
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Multiple capital gain incomes', 'Business/Professional Income (Non-Audit) — without B/S & P&L', 'Revenue from F&O / Crypto', 'Other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report', 'Losses carried forward report'],
  },
  {
    id: 'nri-foreign',
    name: 'NRI / Foreign Income',
    price: '5,000',
    per: 'per year',
    tax: 'Exclusive of GST',
    badge: null,
    desc: 'NRI with Indian income or Resident with foreign income',
    features: ['Single or multiple employers', 'Multiple house properties', 'Multiple capital gain incomes', 'Business & Professional Income (Non-Audit)', 'Revenue from F&O / Crypto', 'DTAA Tax Relief', 'Foreign salary (including foreign tax relief)', 'Other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report', 'Losses carried forward report'],
  },
]

const whyFileItr = [
  {
    icon: 'fa-ban',
    title: 'Avoid Penalties & Legal Notices',
    desc: 'Failing to file ITR on time attracts late filing fees under Section 234F up to ₹5,000 and penal interest under Sections 234A, 234B, and 234C.',
  },
  {
    icon: 'fa-hand-holding-usd',
    title: 'Claim Tax Refunds',
    desc: 'If TDS/TCS was deducted from your salary, fixed deposits, or client payments in excess of your actual tax liability, filing ITR is the ONLY way to get money back into your bank account.',
  },
  {
    icon: 'fa-file-signature',
    title: 'Essential for Loan & Credit Card Approvals',
    desc: 'Banks and financial institutions mandate 3 consecutive years of ITR returns for processing Home Loans, Car Loans, Business Loans, and Premium Credit Cards.',
  },
  {
    icon: 'fa-passport',
    title: 'Smooth Visa & Overseas Travel Processing',
    desc: 'Foreign embassies (US, UK, Canada, Schengen, Australia) require past 3 years ITR acknowledgement receipts as mandatory proof of financial standing during visa interviews.',
  },
  {
    icon: 'fa-chart-line',
    title: 'Carry Forward Stock & Business Losses',
    desc: 'Unadjusted losses from stocks, Mutual Funds, Futures & Options (F&O), or business cannot be set off against future profits unless ITR is filed before the due date.',
  },
  {
    icon: 'fa-shield-alt',
    title: 'High-Value Transactions & Credibility',
    desc: 'Essential financial record for buying immovable property, investing in high-value assets, starting a business, or participating in government tenders.',
  },
]

const faqs = [
  {
    q: 'What documents are required to file Income Tax Returns?',
    a: 'Basic documents include Form 16, Bank statements, Aadhaar & PAN card, Investment proofs (80C/80D), Capital gain statements from brokers, and Form 26AS / AIS.',
  },
  {
    q: 'Who will prepare and review my tax return?',
    a: 'Every single return on Mantra Taxbooks is prepared and thoroughly verified by qualified Chartered Accountants (CAs) to ensure 100% accuracy and zero tax notice risk.',
  },
  {
    q: 'How long does it take to file my return once documents are submitted?',
    a: 'Most returns are prepared, verified, and uploaded within 24 to 48 business hours of receiving your complete document set.',
  },
  {
    q: 'Can I claim tax deductions under the New Tax Regime?',
    a: 'Standard deduction (₹75,000) and employer NPS contribution (80CCD(2)) are available under the New Tax Regime. Our CAs calculate tax under both regimes and pick the most tax-saving option for you.',
  },
]

export default function FileITRDetailsPage() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [callbackModal, setCallbackModal] = useState<null | 'call' | 'video'>(null)
  const [modalForm, setModalForm] = useState({ name: '', email: '', phone: '' })
  const [modalSuccess, setModalSuccess] = useState(false)
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
      servicesTimeoutRef.current = null
    }
    setServicesOpen(true)
  }

  const handleServicesMouseLeave = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
    }
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 5000)
  }

  const handleServiceItemClick = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
      servicesTimeoutRef.current = null
    }
    setServicesOpen(false)
  }

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModalSuccess(true)
    setTimeout(() => {
      setModalSuccess(false)
      setCallbackModal(null)
      setModalForm({ name: '', email: '', phone: '' })
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', color: '#E2E8F0', paddingBottom: 80 }}>
      {/* ── TOP NAV BAR WITH WORKING DROPDOWN ── */}
      <div style={{ background: '#09152B', borderBottom: '1px solid #1E293B', padding: '14px 24px', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ background: 'linear-gradient(135deg, #0A2A73, #1A56DB)', color: '#FFF', fontWeight: 900, padding: '4px 10px', borderRadius: 4, letterSpacing: 2, fontSize: '0.85rem' }}>MANTRA</span>
            <span style={{ color: '#94A3B8', fontWeight: 800, padding: '4px 8px', letterSpacing: 2, fontSize: '0.85rem' }}>TAXBOOKS</span>
          </Link>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Home</Link>
            
            {/* SERVICES DROPDOWN */}
            <div style={{ position: 'relative', paddingTop: 4, paddingBottom: 4 }} onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
              <Link href="/services" style={{ color: '#2563EB', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                Services <i className={`fas fa-chevron-down`} style={{ fontSize: '0.65rem', transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }} />
              </Link>
              {servicesOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: '#1C1C1C', border: '1px solid rgba(37,99,235,.4)', borderRadius: 10, padding: 6, minWidth: 240, boxShadow: '0 8px 32px rgba(0,0,0,.5)', zIndex: 2000 }} onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                  <Link href="/services/file-itr" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 7, textDecoration: 'none', color: '#E0E0E0', background: 'rgba(37,99,235,0.15)' }}>
                    <i className="fas fa-file-invoice-dollar" style={{ color: '#60A5FA' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>File ITR</div>
                      <div style={{ fontSize: '0.72rem', color: '#888' }}>Why It's Needed &amp; CA Plans</div>
                    </div>
                  </Link>
                  <Link href="/services/company-registration" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 7, textDecoration: 'none', color: '#E0E0E0' }}>
                    <i className="fas fa-building" style={{ color: '#60A5FA' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Company Registration</div>
                      <div style={{ fontSize: '0.72rem', color: '#888' }}>Pvt Ltd, LLP, OPC &amp; Contact</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/file-itr" style={{ background: '#2563EB', color: '#FFF', padding: '6px 14px', borderRadius: 6, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>
              Start Filing
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 0' }}>
        {/* ── HERO BANNER ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #09152B 0%, #1E3A8A 100%)',
            borderTop: '4px solid #2563EB',
            borderRadius: 16,
            padding: '36px 32px',
            marginBottom: 44,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ color: '#60A5FA', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
            Income Tax Return (ITR) Filing Portal
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0', lineHeight: 1.2 }}>
            Income Tax Return (ITR) Filing &amp; CA Consultation
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '1rem', maxWidth: 780, margin: '0 0 24px 0', lineHeight: 1.6 }}>
            Comprehensive, CA-reviewed ITR filing for salaried individuals, traders, business owners, NRIs, and foreign income earners. Guaranteed zero-notice risk with maximum tax savings.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/file-itr"
              style={{
                background: '#2563EB',
                color: '#FFFFFF',
                padding: '12px 26px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
              }}
            >
              Start Filing ITR Now →
            </Link>

            <button
              onClick={() => setCallbackModal('call')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                padding: '12px 20px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="fas fa-phone-alt" /> Request Call Back
            </button>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20assistance%20with%20my%20ITR%20Filing."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                color: '#FFFFFF',
                padding: '12px 20px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* ── MODAL FOR CALL BACK / VIDEO MEETING ── */}
        {callbackModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 30, maxWidth: 450, width: '100%', position: 'relative' }}>
              <button onClick={() => setCallbackModal(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer' }}>
                ✕
              </button>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
                Request Immediate Call Back
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: 20 }}>
                Enter your details and our senior CA consultant will connect with you shortly.
              </p>

              {modalSuccess ? (
                <div style={{ background: 'rgba(39, 174, 96, 0.15)', border: '1px solid #27AE60', color: '#27AE60', padding: 16, borderRadius: 10, textAlign: 'center' }}>
                  <strong>Request Submitted!</strong> We will reach out to you within minutes.
                </div>
              ) : (
                <form onSubmit={handleModalSubmit}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#E2E8F0', marginBottom: 6 }}>Full Name *</label>
                    <input type="text" required className="form-control" placeholder="Enter your full name" value={modalForm.name} onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })} />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#E2E8F0', marginBottom: 6 }}>Email Address *</label>
                    <input type="email" required className="form-control" placeholder="name@domain.com" value={modalForm.email} onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#E2E8F0', marginBottom: 6 }}>Mobile Number *</label>
                    <input type="tel" required className="form-control" placeholder="+91 9876543210" value={modalForm.phone} onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })} />
                  </div>
                  <button type="submit" style={{ width: '100%', padding: '10px 16px', background: '#2563EB', color: '#FFF', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ── WHY FILE ITR SECTION ── */}
        <div style={{ marginBottom: 52 }}>
          <span style={{ display: 'inline-block', background: 'rgba(37,99,235,0.15)', border: '1px solid #2563EB', color: '#60A5FA', padding: '3px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            BENEFITS &amp; LEGAL COMPLIANCE
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
            Why Filing Income Tax Return (ITR) is Crucial
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#94A3B8', margin: '0 0 24px 0', lineHeight: 1.5 }}>
            Filing your tax return on time protects your financial freedom, builds legal credibility, and saves money.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
            {whyFileItr.map((w, idx) => (
              <div
                key={idx}
                style={{
                  background: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: 12,
                  padding: 22,
                  display: 'flex',
                  gap: 16,
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(37,99,235,0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                  <i className={`fas ${w.icon}`} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 6px 0' }}>{w.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ALL 6 ITR PLANS SECTION (MATCHING USER SCREENSHOT) ── */}
        <div style={{ marginBottom: 52 }}>
          <span style={{ display: 'inline-block', background: 'rgba(37,99,235,0.15)', border: '1px solid #2563EB', color: '#60A5FA', padding: '3px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            TRANSPARENT PRICING TIERS
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
            CA-Reviewed Filing Packages &amp; Pricing
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#94A3B8', margin: '0 0 26px 0', lineHeight: 1.5 }}>
            Transparent pricing based on your income sources. All plans include 100% CA verification.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22 }}>
            {itrPlans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: '#1E293B',
                  border: plan.badge ? '2px solid #2563EB' : '1px solid #334155',
                  borderRadius: 14,
                  padding: 24,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: plan.badge ? '0 8px 24px rgba(37,99,235,0.25)' : 'none',
                }}
              >
                {plan.badge && (
                  <span style={{ position: 'absolute', top: -11, right: 20, background: '#2563EB', color: '#FFF', fontSize: '0.7rem', fontWeight: 800, padding: '2px 10px', borderRadius: 20, textTransform: 'uppercase' }}>
                    {plan.badge}
                  </span>
                )}

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px 0' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: '0 0 16px 0', lineHeight: 1.4 }}>{plan.desc}</p>

                <div style={{ paddingBottom: 16, borderBottom: '1px solid #334155', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#60A5FA' }}>₹{plan.price}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 2 }}>{plan.per}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 1 }}>{plan.tax}</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', flex: 1 }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ fontSize: '0.83rem', color: '#E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className="fas fa-check" style={{ color: '#27AE60', fontSize: '0.75rem' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.deliverables && (
                  <div style={{ padding: '12px 14px', background: '#0F172A', borderRadius: 8, border: '1px solid #334155', marginBottom: 16 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                      Deliverables Included:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {plan.deliverables.map((d, i) => (
                        <li key={i} style={{ fontSize: '0.78rem', color: '#CBD5E1', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <i className="fas fa-file-download" style={{ color: '#60A5FA', fontSize: '0.72rem' }} />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/file-itr"
                  style={{
                    background: plan.badge ? '#2563EB' : '#334155',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    padding: '10px 16px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  Select Plan &amp; File →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQS SECTION ── */}
        <div style={{ marginBottom: 48 }}>
          <span style={{ display: 'inline-block', background: 'rgba(37,99,235,0.15)', border: '1px solid #2563EB', color: '#60A5FA', padding: '3px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            HELP &amp; SUPPORT
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px 0', letterSpacing: '-0.3px' }}>
            Frequently Asked Questions (FAQs)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, idx) => (
              <div key={idx} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 10, padding: 20 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                  {f.q}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA BANNER ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            border: '1px solid #334155',
            borderRadius: 14,
            padding: '32px 36px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0' }}>
            Ready to File Your Income Tax Return?
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', maxWidth: 520, margin: '0 auto 20px', lineHeight: 1.5 }}>
            Get started in less than 2 minutes. Prepare, upload documents, and let our CAs handle your return.
          </p>

          <Link
            href="/file-itr"
            style={{
              background: '#2563EB',
              color: '#FFFFFF',
              padding: '12px 28px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'inline-block',
              boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
            }}
          >
            File Your ITR Now
          </Link>
        </div>
      </div>
    </div>
  )
}
