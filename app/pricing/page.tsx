'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const PLANS = [
  {
    id: 'salary-nil',
    name: 'Salary — Nil Return',
    price: 799,
    tag: null,
    types: ['salaried'],
    desc: 'Single employer, total income ≤ ₹12,75,000',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: false },
      { label: 'House Property Income', yes: false },
      { label: 'Capital Gains (Shares / MF)', yes: false },
      { label: 'Capital Gains (Property)', yes: false },
      { label: 'Business / Professional (Non-Audit)', yes: false },
      { label: 'F&O / Cryptocurrency Income', yes: false },
      { label: 'DTAA Relief / Foreign Income', yes: false },
      { label: 'CA Reviewed Filing', yes: true },
      { label: 'AES-256 Secure Storage', yes: true },
    ],
  },
  {
    id: 'salary-property',
    name: 'Salary + Property',
    price: 1499,
    tag: null,
    types: ['salaried'],
    desc: 'Salary with one or more house properties',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: false },
      { label: 'Capital Gains (Property)', yes: false },
      { label: 'Business / Professional (Non-Audit)', yes: false },
      { label: 'F&O / Cryptocurrency Income', yes: false },
      { label: 'DTAA Relief / Foreign Income', yes: false },
      { label: 'CA Reviewed Filing', yes: true },
      { label: 'AES-256 Secure Storage', yes: true },
    ],
  },
  {
    id: 'capital-gains',
    name: 'Capital Gains',
    price: 1999,
    tag: 'Most Popular',
    types: ['capital-gains'],
    desc: 'Salary + Rent + Capital Gains from shares, MFs or property',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: true },
      { label: 'Capital Gains (Property)', yes: true },
      { label: 'Business / Professional (Non-Audit)', yes: false },
      { label: 'F&O / Cryptocurrency Income', yes: false },
      { label: 'DTAA Relief / Foreign Income', yes: false },
      { label: 'CA Reviewed Filing', yes: true },
      { label: 'AES-256 Secure Storage', yes: true },
    ],
  },
  {
    id: 'business',
    name: 'Business / Professional',
    price: 2499,
    tag: null,
    types: ['business'],
    desc: 'Salary + Rent + Capital Gains + Business or Professional income (without B/S & P&L)',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: true },
      { label: 'Capital Gains (Property)', yes: true },
      { label: 'Business / Professional (Non-Audit)', yes: true },
      { label: 'F&O / Cryptocurrency Income', yes: false },
      { label: 'DTAA Relief / Foreign Income', yes: false },
      { label: 'CA Reviewed Filing', yes: true },
      { label: 'AES-256 Secure Storage', yes: true },
    ],
  },
  {
    id: 'fno',
    name: 'F&O / Cryptocurrency',
    price: 2999,
    tag: null,
    types: ['fno'],
    desc: 'All income types including Futures & Options and Cryptocurrency',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: true },
      { label: 'Capital Gains (Property)', yes: true },
      { label: 'Business / Professional (Non-Audit)', yes: true },
      { label: 'F&O / Cryptocurrency Income', yes: true },
      { label: 'DTAA Relief / Foreign Income', yes: false },
      { label: 'CA Reviewed Filing', yes: true },
      { label: 'AES-256 Secure Storage', yes: true },
    ],
  },
  {
    id: 'nri',
    name: 'NRI / Foreign Income',
    price: 5999,
    tag: null,
    types: ['nri'],
    desc: 'NRI with Indian income or resident with foreign income / DTAA relief',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: true },
      { label: 'Capital Gains (Property)', yes: true },
      { label: 'Business / Professional (Non-Audit)', yes: true },
      { label: 'F&O / Cryptocurrency Income', yes: true },
      { label: 'DTAA Relief / Foreign Income', yes: true },
      { label: 'CA Reviewed Filing', yes: true },
      { label: 'AES-256 Secure Storage', yes: true },
    ],
  },
]

const FILTERS = [
  { id: 'all', label: 'All Plans' },
  { id: 'salaried', label: 'Salaried' },
  { id: 'capital-gains', label: 'Capital Gains' },
  { id: 'business', label: 'Business / Professional' },
  { id: 'fno', label: 'F&O / Crypto' },
  { id: 'nri', label: 'NRI / Foreign' },
]

const FEATURE_ROWS = [
  'Single Employer Salary',
  'Multiple Employers',
  'Income from Other Sources',
  'House Property Income',
  'Capital Gains (Shares / MF)',
  'Capital Gains (Property)',
  'Business / Professional (Non-Audit)',
  'F&O / Cryptocurrency Income',
  'DTAA Relief / Foreign Income',
  'CA Reviewed Filing',
  'AES-256 Secure Storage',
]

const FAQS = [
  {
    q: 'What is CA Reviewed Filing?',
    a: 'Every return is prepared and reviewed by a qualified Chartered Accountant before submission. Unlike DIY platforms, your return is not filed automatically — a CA checks for accuracy, deductions, and compliance before hitting submit.',
  },
  {
    q: 'Which plan should I choose?',
    a: 'Choose based on your income type. Salaried with no investments → Salary Nil Return. Have stocks or mutual funds? → Capital Gains. Run a business or freelance? → Business/Professional. Trade F&O or crypto? → F&O / Cryptocurrency. NRI or foreign income? → NRI / Foreign Income.',
  },
  {
    q: 'Are the prices inclusive of GST?',
    a: 'No. All prices shown are exclusive of 18% GST. Final amount will include GST at checkout.',
  },
  {
    q: 'How long does filing take after I submit documents?',
    a: 'Most returns are filed within 24–48 hours of complete document submission during normal season. Peak months (July–September) may take slightly longer.',
  },
  {
    q: 'What documents will I need to provide?',
    a: 'Typically: PAN, Aadhaar, Form 16 (salaried), bank statements, capital gains statements (from broker/CDSL), and any proof of investments made under 80C/80D. Our team will guide you through a checklist after you register.',
  },
  {
    q: 'Is my financial data safe?',
    a: 'Yes. All documents and personal data are protected with AES-256 bank-grade encryption. Documents are stored on AWS S3 with restricted access. We never share your data with third parties.',
  },
]

const TRUST = [
  { icon: 'fa-user-tie', label: 'CA Reviewed', sub: 'Every return checked by a CA' },
  { icon: 'fa-lock', label: 'AES-256 Secure', sub: 'Bank-grade encryption' },
  { icon: 'fa-clock', label: '24–48 hr Filing', sub: 'Fast turnaround guaranteed' },
  { icon: 'fa-users', label: '5000+ Clients', sub: 'Trusted across India' },
]

export default function PricingPage() {
  const [filter, setFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const visible = PLANS.filter(p => filter === 'all' || p.types.includes(filter))

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
            <span className="logo-m" style={{ fontSize: '.9rem', padding: '5px 10px' }}>MANTRA</span>
            <span className="logo-t" style={{ fontSize: '.9rem', padding: '5px 10px' }}>TAXBOOKS</span>
          </Link>
          <ul className="lp-nav-links hide-mobile" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 24 }}>
            {[['Home', '/'], ['Services', '/#services'], ['Pricing', '/pricing'], ['Contact', '/#contact']].map(([l, h]) => (
              <li key={h}><Link href={h} style={{ color: h === '/pricing' ? '#E8334A' : '#ccc', fontWeight: 600, fontSize: '.875rem', textDecoration: 'none' }}>{l}</Link></li>
            ))}
          </ul>
          <div className="lp-nav-cta">
            <Link href="/login" className="btn btn-outline btn-sm hide-mobile"><i className="fas fa-sign-in-alt" /> Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm hide-mobile"><i className="fas fa-user-plus" /> Register</Link>
            <button className="lp-hamburger show-mobile" onClick={() => setMenuOpen(!menuOpen)}>
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lp-mobile-menu">
            {[['Home', '/'], ['Services', '/#services'], ['Contact', '/#contact']].map(([l, h]) => (
              <Link key={h} href={h} className="lp-mobile-link" style={{ display: 'block', padding: '10px 0', color: '#ccc', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.05)', fontSize: '.9rem' }}>{l}</Link>
            ))}
            <div className="lp-mobile-auth" style={{ display: 'flex', gap: 10, paddingTop: 14 }}>
              <Link href="/login" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Register</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg,#0d0d0d,#2a0810)', paddingTop: 110, paddingBottom: 60, paddingLeft: '5%', paddingRight: '5%', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(196,30,58,.15)', border: '1px solid rgba(196,30,58,.4)', color: '#E8334A', padding: '5px 16px', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>
          <i className="fas fa-user-tie" /> CA Reviewed Filing — AY 2026-27
        </div>
        <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, margin: '0 0 16px' }}>
          Transparent Pricing. <span style={{ color: '#E8334A' }}>Zero Hidden Costs.</span>
        </h1>
        <p style={{ color: '#A0A0A0', fontSize: '1rem', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.75 }}>
          Every plan includes CA-reviewed filing. Pick your income type and get started in minutes.
        </p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {TRUST.map(t => (
            <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10, padding: '10px 18px' }}>
              <div style={{ width: 34, height: 34, background: 'rgba(196,30,58,.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`fas ${t.icon}`} style={{ color: '#E8334A', fontSize: '.85rem' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#E8E8E8', fontWeight: 700, fontSize: '.82rem' }}>{t.label}</div>
                <div style={{ color: '#888', fontSize: '.72rem' }}>{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary btn-lg">
          <i className="fas fa-arrow-down" /> View All Plans
        </button>
      </section>

      {/* ── CA REVIEWED BADGE SECTION ── */}
      <section style={{ background: '#fff', padding: '40px 5%', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, alignItems: 'center' }}>
          <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg,#C41E3A,#8B0000)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className="fas fa-user-tie" style={{ color: '#fff', fontSize: '1.8rem' }} />
          </div>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', margin: '0 0 6px' }}>What is CA Reviewed Filing?</h2>
            <p style={{ color: '#555', fontSize: '.88rem', margin: 0, lineHeight: 1.7 }}>
              Unlike DIY platforms that auto-file returns, every return on Mantra Taxbooks is individually reviewed by a qualified Chartered Accountant before submission. The CA checks for accuracy, maximises deductions, verifies compliance, and files only after confirmation — giving you peace of mind and professional responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* ── INCOME FILTER ── */}
      <section id="plans" style={{ background: '#F5F5F5', padding: '48px 5% 0', position: 'sticky', top: 64, zIndex: 50, borderBottom: '1px solid #E0E0E0' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'inline-block', background: 'rgba(196,30,58,.1)', color: '#C41E3A', padding: '4px 14px', borderRadius: 20, fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Find Your Plan</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.2rem,3vw,1.8rem)', margin: 0 }}>Select Your Income Type</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', paddingBottom: 0 }}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '9px 20px', borderRadius: 8, fontWeight: 600, fontSize: '.82rem', cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit',
                background: filter === f.id ? 'linear-gradient(135deg,#C41E3A,#8B0000)' : '#fff',
                color: filter === f.id ? '#fff' : '#555',
                border: filter === f.id ? '1px solid #8B0000' : '1px solid #E0E0E0',
                boxShadow: filter === f.id ? '0 4px 14px rgba(196,30,58,.35)' : 'none',
                marginBottom: 8,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 14, color: '#888', fontSize: '.78rem' }}>
          {visible.length} plan{visible.length !== 1 ? 's' : ''} match your selection · All prices exclusive of 18% GST · CA reviewed filing included
        </div>
      </section>

      {/* ── PLAN CARDS ── */}
      <section style={{ background: '#F5F5F5', padding: '36px 5% 52px' }}>
        {visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>No plans match — <button onClick={() => setFilter('all')} style={{ color: '#C41E3A', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>view all</button></div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill,minmax(280px,1fr))`, gap: 20, maxWidth: 1200, margin: '0 auto' }}>
            {visible.map(plan => (
              <div key={plan.id} style={{
                background: plan.tag ? 'linear-gradient(145deg,#1a1a1a,#2a0810)' : '#fff',
                border: plan.tag ? '2px solid #C41E3A' : '1px solid #E0E0E0',
                borderRadius: 14, padding: '26px 24px', position: 'relative', transition: 'all .3s',
                boxShadow: plan.tag ? '0 8px 32px rgba(196,30,58,.25)' : '0 2px 8px rgba(0,0,0,.05)',
              }}>
                {plan.tag && (
                  <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#C41E3A,#8B0000)', color: '#fff', padding: '3px 16px', borderRadius: 10, fontSize: '.7rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {plan.tag}
                  </div>
                )}

                {/* CA Reviewed badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: plan.tag ? 'rgba(196,30,58,.2)' : 'rgba(196,30,58,.08)', color: '#E8334A', padding: '3px 10px', borderRadius: 8, fontSize: '.68rem', fontWeight: 700, marginBottom: 12 }}>
                  <i className="fas fa-user-tie" style={{ fontSize: '.65rem' }} /> CA Reviewed Filing
                </div>

                <h3 style={{ fontWeight: 800, fontSize: '1rem', color: plan.tag ? '#E8E8E8' : '#1A1A1A', margin: '0 0 8px' }}>{plan.name}</h3>
                <p style={{ fontSize: '.8rem', color: plan.tag ? '#A0A0A0' : '#666', margin: '0 0 18px', lineHeight: 1.6 }}>{plan.desc}</p>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 2, marginBottom: 4 }}>
                  <span style={{ color: '#E8334A', fontWeight: 700, fontSize: '1rem', marginTop: 6 }}>₹</span>
                  <span style={{ color: '#E8334A', fontWeight: 900, fontSize: '2.4rem', lineHeight: 1 }}>{plan.price.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ color: plan.tag ? '#888' : '#999', fontSize: '.73rem', marginBottom: 20 }}>per year · Exclusive of GST</div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px' }}>
                  {plan.features.filter(f => f.yes).map(f => (
                    <li key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '.8rem', color: plan.tag ? '#C0C0C0' : '#555', marginBottom: 6 }}>
                      <i className="fas fa-check-circle" style={{ color: '#27AE60', marginTop: 2, flexShrink: 0, fontSize: '.75rem' }} />
                      {f.label}
                    </li>
                  ))}
                </ul>

                <Link href="/register" className="btn btn-primary btn-block" style={{ justifyContent: 'center' }}>
                  <i className="fas fa-file-alt" /> Get Started
                </Link>
              </div>
            ))}
          </div>
        )}
        <p style={{ textAlign: 'center', color: '#999', fontSize: '.78rem', marginTop: 28 }}>
          * All prices exclusive of 18% GST &nbsp;|&nbsp; CA reviewed filing included in all plans &nbsp;|&nbsp; No hidden charges
        </p>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ background: '#fff', padding: '60px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-block', background: 'rgba(196,30,58,.1)', color: '#C41E3A', padding: '4px 14px', borderRadius: 20, fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Plan Comparison</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.2rem,3vw,1.8rem)', margin: '0 0 10px' }}>Compare All Plans</h2>
          <p style={{ color: '#666', fontSize: '.9rem', margin: 0 }}>Detailed feature matrix — see exactly what each plan covers</p>
        </div>

        <div style={{ overflowX: 'auto', maxWidth: 1100, margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem', minWidth: 700 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', background: '#1A1A1A', color: '#E8E8E8', fontWeight: 700, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: .5, whiteSpace: 'nowrap', borderRadius: '8px 0 0 0', position: 'sticky', left: 0, zIndex: 1 }}>Feature</th>
                {PLANS.map((p, i) => (
                  <th key={p.id} style={{ padding: '12px 12px', background: p.tag ? '#C41E3A' : '#1A1A1A', color: '#E8E8E8', fontWeight: 700, fontSize: '.73rem', textAlign: 'center', whiteSpace: 'nowrap', borderLeft: '1px solid #2D2D2D', borderRadius: i === PLANS.length - 1 ? '0 8px 0 0' : 0 }}>
                    <div>{p.name}</div>
                    <div style={{ color: p.tag ? '#fff' : '#E8334A', fontWeight: 900, fontSize: '.95rem', marginTop: 4 }}>₹{p.price.toLocaleString('en-IN')}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_ROWS.map((feat, ri) => (
                <tr key={feat} style={{ background: ri % 2 === 0 ? '#fff' : '#F9F9F9' }}>
                  <td style={{ padding: '11px 16px', fontWeight: 500, color: '#333', borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap', position: 'sticky', left: 0, background: ri % 2 === 0 ? '#fff' : '#F9F9F9', zIndex: 1 }}>
                    {feat === 'CA Reviewed Filing' || feat === 'AES-256 Secure Storage' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className={`fas ${feat === 'CA Reviewed Filing' ? 'fa-user-tie' : 'fa-lock'}`} style={{ color: '#C41E3A', fontSize: '.78rem' }} />
                        <strong>{feat}</strong>
                      </span>
                    ) : feat}
                  </td>
                  {PLANS.map(plan => {
                    const f = plan.features.find(x => x.label === feat)
                    return (
                      <td key={plan.id} style={{ padding: '11px 12px', textAlign: 'center', borderBottom: '1px solid #F0F0F0', borderLeft: '1px solid #F0F0F0' }}>
                        {f?.yes
                          ? <i className="fas fa-check-circle" style={{ color: '#27AE60', fontSize: '1rem' }} />
                          : <i className="fas fa-times-circle" style={{ color: '#DDD', fontSize: '1rem' }} />}
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr style={{ background: '#1A1A1A' }}>
                <td style={{ padding: '14px 16px', position: 'sticky', left: 0, background: '#1A1A1A', zIndex: 1 }} />
                {PLANS.map(plan => (
                  <td key={plan.id} style={{ padding: '14px 12px', textAlign: 'center', borderLeft: '1px solid #2D2D2D' }}>
                    <Link href="/register" className="btn btn-primary btn-sm" style={{ justifyContent: 'center', fontSize: '.72rem' }}>
                      Get Started
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#F5F5F5', padding: '60px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-block', background: 'rgba(196,30,58,.1)', color: '#C41E3A', padding: '4px 14px', borderRadius: 20, fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>FAQ</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.2rem,3vw,1.8rem)', margin: 0 }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: 10, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontFamily: 'inherit', fontWeight: 600, fontSize: '.88rem', color: '#1A1A1A' }}
              >
                <span>{faq.q}</span>
                <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'}`} style={{ color: '#C41E3A', flexShrink: 0, fontSize: '.8rem', transition: 'transform .2s' }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 20px 18px', fontSize: '.85rem', color: '#555', lineHeight: 1.75, borderTop: '1px solid #F0F0F0' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: 'linear-gradient(135deg,#0d0d0d,#2a0810)', padding: '60px 5%', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.4rem,3vw,2rem)', margin: '0 0 14px' }}>Ready to File Your ITR?</h2>
        <p style={{ color: '#A0A0A0', fontSize: '.95rem', margin: '0 0 32px' }}>Register in minutes. CA reviews your return. You get peace of mind.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" className="btn btn-primary btn-lg">
            <i className="fas fa-user-plus" /> Create Free Account
          </Link>
          <Link href="/#contact" className="btn btn-outline btn-lg">
            <i className="fas fa-phone" /> Talk to a CA
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-grid">
          <div className="lp-footer-brand">
            <div className="logo">
              <span className="logo-m">MANTRA</span>
              <span className="logo-t">TAXBOOKS</span>
            </div>
            <p>Expert CA services for individuals, businesses and corporations. Trusted by 5000+ clients across India.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {['ITR Filing', 'GST Compliance', 'ROC Filings', 'TDS Compliance', 'PF & ESI'].map(s => (
                <li key={s}><Link href="/#services">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@demandassociatesllp.com">info@demandassociatesllp.com</a></li>
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
              <li><Link href="/#contact">Request Callback</Link></li>
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>© 2026 Mantra Taxbooks — D E M &amp; Associates LLP. All rights reserved.</span>
          <span>CA Services | Tax Filing | GST | ROC</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          [data-mobile-stack] { flex-direction: column; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 640px) {
          .lp-footer-grid { grid-template-columns: 1fr; gap: 24px; }
          .lp-footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </>
  )
}
