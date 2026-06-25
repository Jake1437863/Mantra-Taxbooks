'use client'
import Link from 'next/link'
import { useState } from 'react'

const PLANS = [
  {
    id: 'salary-nil',
    name: 'Salary — Nil Return',
    price: 799,
    tag: null as string | null,
    types: ['salaried'],
    desc: 'Single employer, total income ≤ ₹12,75,000',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: false },
      { label: 'House Property Income', yes: false },
      { label: 'Capital Gains (Shares / MF)', yes: false },
      { label: 'Capital Gains (Property)', yes: false },
      { label: 'Business / Professional', yes: false },
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
    tag: null as string | null,
    types: ['salaried'],
    desc: 'Salary with one or more house properties',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: false },
      { label: 'Capital Gains (Property)', yes: false },
      { label: 'Business / Professional', yes: false },
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
    tag: 'Most Popular' as string | null,
    types: ['capital-gains'],
    desc: 'Salary + Rent + Capital Gains from shares, MFs or property',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: true },
      { label: 'Capital Gains (Property)', yes: true },
      { label: 'Business / Professional', yes: false },
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
    tag: null as string | null,
    types: ['business'],
    desc: 'Salary + Capital Gains + Business or Professional income (non-audit)',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: true },
      { label: 'Capital Gains (Property)', yes: true },
      { label: 'Business / Professional', yes: true },
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
    tag: null as string | null,
    types: ['fno'],
    desc: 'All income types including Futures & Options and Cryptocurrency',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: true },
      { label: 'Capital Gains (Property)', yes: true },
      { label: 'Business / Professional', yes: true },
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
    tag: null as string | null,
    types: ['nri'],
    desc: 'NRI with Indian income or resident with foreign income / DTAA relief',
    features: [
      { label: 'Single Employer Salary', yes: true },
      { label: 'Income from Other Sources', yes: true },
      { label: 'Multiple Employers', yes: true },
      { label: 'House Property Income', yes: true },
      { label: 'Capital Gains (Shares / MF)', yes: true },
      { label: 'Capital Gains (Property)', yes: true },
      { label: 'Business / Professional', yes: true },
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
  'Business / Professional',
  'F&O / Cryptocurrency Income',
  'DTAA Relief / Foreign Income',
  'CA Reviewed Filing',
  'AES-256 Secure Storage',
]

const TRUST = [
  { icon: 'fa-user-tie', label: 'CA Reviewed', sub: 'Every return checked by a CA' },
  { icon: 'fa-lock', label: 'AES-256 Secure', sub: 'Bank-grade encryption' },
  { icon: 'fa-clock', label: '24–48 hr Filing', sub: 'Fast turnaround' },
  { icon: 'fa-users', label: '5000+ Clients', sub: 'Trusted across India' },
]

const FAQS = [
  {
    q: 'What is CA Reviewed Filing?',
    a: 'Every return is prepared and reviewed by a qualified Chartered Accountant before submission. Unlike DIY platforms, your return is not filed automatically — a CA checks for accuracy, deductions, and compliance before hitting submit.',
  },
  {
    q: 'Which plan should I choose?',
    a: 'Choose based on your income type. Salaried only → Salary Nil Return. Have property? → Salary + Property. Stocks or MFs? → Capital Gains. Business or freelance? → Business/Professional. F&O or crypto? → F&O / Cryptocurrency. NRI or foreign income? → NRI / Foreign Income.',
  },
  {
    q: 'Are the prices inclusive of GST?',
    a: 'No. All prices shown are exclusive of 18% GST. The final invoice will include GST at checkout.',
  },
  {
    q: 'How long does filing take after I submit documents?',
    a: 'Most returns are filed within 24–48 hours of complete document submission during normal season. Peak months (July–September) may take slightly longer.',
  },
  {
    q: 'What documents will I need to provide?',
    a: 'Typically: PAN, Aadhaar, Form 16 (salaried), bank statements, capital gains statements from broker/CDSL, and investment proofs for 80C/80D. Our team will send a document checklist once you register.',
  },
  {
    q: 'Is my financial data safe?',
    a: 'Yes. All documents and personal data are protected with AES-256 bank-grade encryption, stored on AWS S3 with restricted access. We never share your data with third parties.',
  },
]

export default function FileITRPage() {
  const [filter, setFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const visible = PLANS.filter(p => filter === 'all' || p.types.includes(filter))

  return (
    <>
      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
            <span className="logo-m" style={{ fontSize: '.85rem', padding: '5px 10px' }}>MANTRA</span>
            <span className="logo-t" style={{ fontSize: '.85rem', padding: '5px 10px' }}>TAXBOOKS</span>
          </Link>

          <ul className="lp-nav-links hide-mobile">
            <li><Link href="/" className="lp-nav-btn">Home</Link></li>
            <li><Link href="/#services" className="lp-nav-btn">Services</Link></li>
            <li><Link href="/file-itr" className="lp-nav-btn" style={{ color: '#E8334A', fontWeight: 700 }}>File ITR</Link></li>
            <li><Link href="/#contact" className="lp-nav-btn">Contact</Link></li>
          </ul>

          <div className="lp-nav-cta">
            <Link href="/login" className="btn btn-outline btn-sm hide-mobile">
              <i className="fas fa-sign-in-alt" /> Login
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm hide-mobile">
              <i className="fas fa-user-plus" /> Register
            </Link>
            <button className="lp-hamburger show-mobile" onClick={() => setMenuOpen(!menuOpen)}>
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lp-mobile-menu">
            <Link href="/" className="lp-mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <button
              className="lp-mobile-link"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
            >
              Services <i className={`fas fa-chevron-${mobileServicesOpen ? 'up' : 'down'}`} style={{ fontSize: '.75rem', color: '#888' }} />
            </button>
            {mobileServicesOpen && (
              <Link href="/file-itr" className="lp-mobile-link" onClick={() => setMenuOpen(false)} style={{ paddingLeft: 20, color: '#E8334A', fontWeight: 600 }}>
                <i className="fas fa-file-invoice-dollar" style={{ marginRight: 8, fontSize: '.8rem' }} />File ITR
              </Link>
            )}
            <Link href="/#contact" className="lp-mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>
            <div className="lp-mobile-auth">
              <Link href="/login" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="fitr-hero">
        <div className="fitr-hero-badge">
          <i className="fas fa-user-tie" /> CA Reviewed Filing — AY 2026-27
        </div>
        <h1 className="fitr-hero-h1">
          Transparent Pricing.<br />
          <span style={{ color: '#E8334A' }}>Zero Hidden Costs.</span>
        </h1>
        <p className="fitr-hero-p">
          Every plan includes CA-reviewed filing. Pick your income type and get started in minutes.
        </p>

        <div className="fitr-trust-grid">
          {TRUST.map(t => (
            <div key={t.label} className="fitr-trust-badge">
              <div className="fitr-trust-icon">
                <i className={`fas ${t.icon}`} />
              </div>
              <div>
                <div className="fitr-trust-label">{t.label}</div>
                <div className="fitr-trust-sub">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn btn-primary btn-lg"
        >
          <i className="fas fa-arrow-down" /> View All Plans
        </button>
      </section>

      {/* ── CA REVIEWED CALLOUT ── */}
      <section className="fitr-callout">
        <div className="fitr-callout-inner">
          <div className="fitr-callout-icon">
            <i className="fas fa-user-tie" />
          </div>
          <div>
            <h2 className="fitr-callout-h2">What is CA Reviewed Filing?</h2>
            <p className="fitr-callout-p">
              Unlike DIY platforms that auto-file returns, every return on Mantra Taxbooks is individually reviewed by a qualified Chartered Accountant before submission. The CA checks for accuracy, maximises deductions, verifies compliance, and files only after confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* ── INCOME FILTER ── */}
      <section id="plans" className="fitr-filter-section">
        <div className="fitr-filter-head">
          <div className="fitr-section-tag">Find Your Plan</div>
          <h2 className="fitr-filter-h2">Select Your Income Type</h2>
        </div>
        <div className="fitr-filter-scroll">
          <div className="fitr-filter-row">
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`fitr-filter-btn${filter === f.id ? ' active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="fitr-filter-hint">
          {visible.length} plan{visible.length !== 1 ? 's' : ''} match · All prices exclusive of 18% GST · CA reviewed included
        </div>
      </section>

      {/* ── PLAN CARDS ── */}
      <section className="fitr-cards-section">
        {visible.length === 0 ? (
          <div className="fitr-empty">
            No plans match —{' '}
            <button onClick={() => setFilter('all')} className="fitr-reset-btn">view all</button>
          </div>
        ) : (
          <div className="fitr-cards-grid">
            {visible.map(plan => (
              <div key={plan.id} className={`fitr-card${plan.tag ? ' featured' : ''}`}>
                {plan.tag && <div className="fitr-card-badge">{plan.tag}</div>}

                <div className="fitr-card-reviewed">
                  <i className="fas fa-user-tie" /> CA Reviewed Filing
                </div>

                <h3 className="fitr-card-name">{plan.name}</h3>
                <p className="fitr-card-desc">{plan.desc}</p>

                <div className="fitr-card-price-row">
                  <span className="fitr-card-cur">₹</span>
                  <span className="fitr-card-amt">{plan.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="fitr-card-per">per year · Exclusive of GST</div>

                <ul className="fitr-card-features">
                  {plan.features.filter(f => f.yes).map(f => (
                    <li key={f.label}>
                      <i className="fas fa-check-circle" />
                      {f.label}
                    </li>
                  ))}
                </ul>

                <Link href="/register" className="btn btn-primary btn-block">
                  <i className="fas fa-file-alt" /> Get Started
                </Link>
              </div>
            ))}
          </div>
        )}
        <p className="fitr-note">* All prices exclusive of 18% GST &nbsp;|&nbsp; CA reviewed filing included &nbsp;|&nbsp; No hidden charges</p>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="fitr-table-section">
        <div className="fitr-sec-head">
          <div className="fitr-section-tag">Plan Comparison</div>
          <h2 className="fitr-sec-h2">Compare All Plans</h2>
          <p className="fitr-sec-p">Detailed feature matrix — see exactly what each plan covers</p>
        </div>
        <div className="fitr-table-hint show-mobile">
          <i className="fas fa-arrows-left-right" style={{ fontSize: '.75rem' }} /> Scroll right to see all plans
        </div>
        <div className="fitr-table-wrap">
          <table className="fitr-table">
            <thead>
              <tr>
                <th className="fitr-th-feature">Feature</th>
                {PLANS.map(p => (
                  <th key={p.id} className={`fitr-th-plan${p.tag ? ' popular' : ''}`}>
                    <div className="fitr-th-name">{p.name}</div>
                    <div className="fitr-th-price">₹{p.price.toLocaleString('en-IN')}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_ROWS.map((feat, ri) => (
                <tr key={feat} className={ri % 2 === 0 ? 'fitr-row-even' : 'fitr-row-odd'}>
                  <td className={`fitr-td-feat${ri % 2 === 0 ? ' even' : ' odd'}`}>
                    {feat === 'CA Reviewed Filing' || feat === 'AES-256 Secure Storage' ? (
                      <span className="fitr-feat-highlight">
                        <i className={`fas ${feat === 'CA Reviewed Filing' ? 'fa-user-tie' : 'fa-lock'}`} />
                        <strong>{feat}</strong>
                      </span>
                    ) : feat}
                  </td>
                  {PLANS.map(plan => {
                    const f = plan.features.find(x => x.label === feat)
                    return (
                      <td key={plan.id} className="fitr-td-check">
                        {f?.yes
                          ? <i className="fas fa-check-circle fitr-check-yes" />
                          : <i className="fas fa-times-circle fitr-check-no" />}
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr className="fitr-row-cta">
                <td className="fitr-td-feat-dark" />
                {PLANS.map(plan => (
                  <td key={plan.id} className="fitr-td-cta">
                    <Link href="/register" className="btn btn-primary btn-sm" style={{ justifyContent: 'center', fontSize: '.72rem', whiteSpace: 'nowrap' }}>
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
      <section className="fitr-faq-section">
        <div className="fitr-sec-head">
          <div className="fitr-section-tag">FAQ</div>
          <h2 className="fitr-sec-h2">Frequently Asked Questions</h2>
        </div>
        <div className="fitr-faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className="fitr-faq-item">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="fitr-faq-q"
              >
                <span>{faq.q}</span>
                <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'} fitr-faq-chevron`} />
              </button>
              {openFaq === i && (
                <div className="fitr-faq-a">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="fitr-cta-section">
        <h2 className="fitr-cta-h2">Ready to File Your ITR?</h2>
        <p className="fitr-cta-p">Register in minutes. CA reviews your return. You get peace of mind.</p>
        <div className="fitr-cta-btns">
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
              <li><Link href="/file-itr">File ITR</Link></li>
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
        /* PAGE WRAPPER */
        * { box-sizing: border-box; }

        /* HERO */
        .fitr-hero {
          background: linear-gradient(135deg, #0d0d0d, #2a0810);
          padding: 110px 5% 60px;
          text-align: center;
        }
        .fitr-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(196,30,58,.15); border: 1px solid rgba(196,30,58,.4);
          color: #E8334A; padding: 5px 16px; border-radius: 20px;
          font-size: .75rem; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 20px;
        }
        .fitr-hero-h1 {
          color: #fff; font-size: clamp(1.7rem, 4vw, 2.8rem);
          font-weight: 900; margin: 0 0 16px; line-height: 1.2;
        }
        .fitr-hero-p {
          color: #A0A0A0; font-size: 1rem; max-width: 540px;
          margin: 0 auto 36px; line-height: 1.75;
        }
        .fitr-trust-grid {
          display: grid; grid-template-columns: repeat(4, auto);
          gap: 16px; justify-content: center;
          margin-bottom: 36px;
        }
        .fitr-trust-badge {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
          border-radius: 10px; padding: 10px 16px;
        }
        .fitr-trust-icon {
          width: 34px; height: 34px; background: rgba(196,30,58,.2);
          border-radius: 8px; display: flex; align-items: center;
          justify-content: center; color: #E8334A; font-size: .85rem; flex-shrink: 0;
        }
        .fitr-trust-label { color: #E8E8E8; font-weight: 700; font-size: .82rem; }
        .fitr-trust-sub { color: #888; font-size: .72rem; }

        /* CALLOUT */
        .fitr-callout {
          background: #fff; padding: 36px 5%;
          border-bottom: 1px solid #F0F0F0;
        }
        .fitr-callout-inner {
          max-width: 900px; margin: 0 auto;
          display: flex; align-items: center; gap: 24px;
        }
        .fitr-callout-icon {
          width: 64px; height: 64px; flex-shrink: 0;
          background: linear-gradient(135deg, #C41E3A, #8B0000);
          border-radius: 14px; display: flex; align-items: center;
          justify-content: center; color: #fff; font-size: 1.6rem;
        }
        .fitr-callout-h2 { font-weight: 800; font-size: 1.05rem; margin: 0 0 6px; }
        .fitr-callout-p { color: #555; font-size: .86rem; margin: 0; line-height: 1.7; }

        /* FILTER */
        .fitr-filter-section {
          background: #F5F5F5; padding: 40px 5% 0;
          position: sticky; top: 64px; z-index: 50;
          border-bottom: 1px solid #E0E0E0;
        }
        .fitr-filter-head { text-align: center; margin-bottom: 20px; }
        .fitr-section-tag {
          display: inline-block; background: rgba(196,30,58,.1);
          color: #C41E3A; padding: 4px 14px; border-radius: 20px;
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px; margin-bottom: 8px;
        }
        .fitr-filter-h2 { font-weight: 800; font-size: clamp(1.1rem, 3vw, 1.6rem); margin: 0; }
        .fitr-filter-scroll { overflow-x: auto; padding-bottom: 4px; }
        .fitr-filter-row {
          display: flex; gap: 8px; justify-content: center;
          padding: 0 2px 4px; flex-wrap: nowrap; min-width: max-content;
          margin: 0 auto;
        }
        .fitr-filter-btn {
          padding: 8px 18px; border-radius: 8px; font-weight: 600;
          font-size: .82rem; cursor: pointer; transition: all .2s;
          font-family: inherit; background: #fff; color: #555;
          border: 1px solid #E0E0E0; white-space: nowrap;
        }
        .fitr-filter-btn.active {
          background: linear-gradient(135deg, #C41E3A, #8B0000);
          color: #fff; border-color: #8B0000;
          box-shadow: 0 4px 14px rgba(196,30,58,.35);
        }
        .fitr-filter-hint {
          text-align: center; padding: 8px 0 12px;
          color: #888; font-size: .75rem;
        }

        /* CARDS */
        .fitr-cards-section {
          background: #F5F5F5; padding: 32px 5% 48px;
        }
        .fitr-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px; max-width: 1200px; margin: 0 auto;
        }
        .fitr-card {
          background: #fff; border: 1px solid #E0E0E0; border-radius: 14px;
          padding: 24px; position: relative; transition: all .3s;
          box-shadow: 0 2px 8px rgba(0,0,0,.05);
          display: flex; flex-direction: column;
        }
        .fitr-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,.1); transform: translateY(-2px); }
        .fitr-card.featured {
          background: linear-gradient(145deg, #1a1a1a, #2a0810);
          border: 2px solid #C41E3A;
          box-shadow: 0 8px 32px rgba(196,30,58,.25);
        }
        .fitr-card-badge {
          position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, #C41E3A, #8B0000); color: #fff;
          padding: 3px 16px; border-radius: 10px; font-size: .7rem;
          font-weight: 700; white-space: nowrap;
        }
        .fitr-card-reviewed {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(196,30,58,.08); color: #E8334A;
          padding: 3px 10px; border-radius: 8px; font-size: .68rem;
          font-weight: 700; margin-bottom: 12px;
        }
        .fitr-card.featured .fitr-card-reviewed { background: rgba(196,30,58,.2); }
        .fitr-card-name { font-weight: 800; font-size: 1rem; color: #1A1A1A; margin: 0 0 6px; }
        .fitr-card.featured .fitr-card-name { color: #E8E8E8; }
        .fitr-card-desc { font-size: .8rem; color: #666; margin: 0 0 16px; line-height: 1.6; }
        .fitr-card.featured .fitr-card-desc { color: #A0A0A0; }
        .fitr-card-price-row { display: flex; align-items: flex-start; gap: 2px; }
        .fitr-card-cur { color: #E8334A; font-weight: 700; font-size: 1rem; margin-top: 6px; }
        .fitr-card-amt { color: #E8334A; font-weight: 900; font-size: 2.3rem; line-height: 1; }
        .fitr-card-per { color: #999; font-size: .73rem; margin-bottom: 18px; }
        .fitr-card.featured .fitr-card-per { color: #888; }
        .fitr-card-features {
          list-style: none; padding: 0; margin: 0 0 20px; flex: 1;
        }
        .fitr-card-features li {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: .8rem; color: #555; margin-bottom: 6px;
        }
        .fitr-card.featured .fitr-card-features li { color: #C0C0C0; }
        .fitr-card-features li .fa-check-circle { color: #27AE60; margin-top: 2px; flex-shrink: 0; font-size: .75rem; }
        .fitr-empty { text-align: center; padding: 60px; color: #888; }
        .fitr-reset-btn { color: #C41E3A; background: none; border: none; cursor: pointer; font-weight: 700; font-family: inherit; }
        .fitr-note { text-align: center; color: #999; font-size: .77rem; margin-top: 24px; }

        /* COMPARISON TABLE */
        .fitr-table-section { background: #fff; padding: 56px 5%; }
        .fitr-sec-head { text-align: center; margin-bottom: 32px; }
        .fitr-sec-h2 { font-weight: 800; font-size: clamp(1.2rem, 3vw, 1.8rem); margin: 0 0 8px; }
        .fitr-sec-p { color: #666; font-size: .9rem; margin: 0; }
        .fitr-table-hint {
          text-align: center; color: #888; font-size: .77rem;
          margin-bottom: 12px;
        }
        .fitr-table-wrap {
          overflow-x: auto; max-width: 1100px; margin: 0 auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 10px; border: 1px solid #E8E8E8;
        }
        .fitr-table {
          width: 100%; border-collapse: collapse; font-size: .82rem; min-width: 680px;
        }
        .fitr-th-feature {
          text-align: left; padding: 14px 16px;
          background: #1A1A1A; color: #E8E8E8; font-weight: 700;
          font-size: .73rem; text-transform: uppercase; letter-spacing: .5px;
          white-space: nowrap; position: sticky; left: 0; z-index: 2;
          border-right: 1px solid #2D2D2D;
        }
        .fitr-th-plan {
          padding: 14px 10px; background: #1A1A1A; color: #E8E8E8;
          font-weight: 700; font-size: .73rem; text-align: center;
          border-left: 1px solid #2D2D2D; min-width: 110px;
        }
        .fitr-th-plan.popular { background: #C41E3A; }
        .fitr-th-name { white-space: nowrap; font-size: .72rem; }
        .fitr-th-price { color: #E8334A; font-weight: 900; font-size: .95rem; margin-top: 3px; }
        .fitr-th-plan.popular .fitr-th-price { color: #fff; }
        .fitr-td-feat {
          padding: 10px 16px; font-weight: 500; color: #333;
          border-bottom: 1px solid #F0F0F0; white-space: nowrap;
          position: sticky; left: 0; z-index: 1;
          border-right: 1px solid #E8E8E8;
        }
        .fitr-td-feat.even { background: #fff; }
        .fitr-td-feat.odd { background: #F9F9F9; }
        .fitr-feat-highlight { display: flex; align-items: center; gap: 6px; }
        .fitr-feat-highlight i { color: #C41E3A; font-size: .78rem; }
        .fitr-td-check {
          padding: 10px 10px; text-align: center;
          border-bottom: 1px solid #F0F0F0; border-left: 1px solid #F0F0F0;
        }
        .fitr-check-yes { color: #27AE60; font-size: 1rem; }
        .fitr-check-no { color: #DDD; font-size: 1rem; }
        .fitr-row-cta { background: #1A1A1A; }
        .fitr-td-feat-dark {
          padding: 14px 16px; background: #1A1A1A;
          position: sticky; left: 0; z-index: 1;
          border-right: 1px solid #2D2D2D;
        }
        .fitr-td-cta {
          padding: 14px 10px; text-align: center;
          border-left: 1px solid #2D2D2D;
        }

        /* FAQ */
        .fitr-faq-section { background: #F5F5F5; padding: 56px 5%; }
        .fitr-faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
        .fitr-faq-item { background: #fff; border: 1px solid #E0E0E0; border-radius: 10px; overflow: hidden; }
        .fitr-faq-q {
          width: 100%; text-align: left; padding: 16px 20px; background: none;
          border: none; cursor: pointer; display: flex; justify-content: space-between;
          align-items: center; gap: 12px; font-family: inherit;
          font-weight: 600; font-size: .88rem; color: #1A1A1A;
        }
        .fitr-faq-chevron { color: #C41E3A; flex-shrink: 0; font-size: .8rem; }
        .fitr-faq-a {
          padding: 0 20px 16px; font-size: .85rem; color: #555;
          line-height: 1.75; border-top: 1px solid #F0F0F0;
        }

        /* BOTTOM CTA */
        .fitr-cta-section {
          background: linear-gradient(135deg, #0d0d0d, #2a0810);
          padding: 56px 5%; text-align: center;
        }
        .fitr-cta-h2 { color: #fff; font-weight: 900; font-size: clamp(1.4rem, 3vw, 2rem); margin: 0 0 12px; }
        .fitr-cta-p { color: #A0A0A0; font-size: .95rem; margin: 0 0 28px; }
        .fitr-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        /* ── RESPONSIVE ────────────────── */

        /* Tablet (≤900px) */
        @media (max-width: 900px) {
          .fitr-trust-grid {
            grid-template-columns: repeat(2, auto);
          }
        }

        /* Mobile (≤640px) */
        @media (max-width: 640px) {
          .fitr-hero { padding: 90px 5% 44px; }
          .fitr-hero-h1 { font-size: 1.6rem; }
          .fitr-hero-p { font-size: .9rem; }
          .fitr-trust-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .fitr-trust-badge { padding: 8px 12px; }
          .fitr-trust-label { font-size: .78rem; }
          .fitr-trust-sub { font-size: .68rem; }

          .fitr-callout-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
          .fitr-callout-icon { width: 48px; height: 48px; font-size: 1.2rem; }

          .fitr-filter-section { top: 56px; padding: 24px 0 0; }
          .fitr-filter-head { padding: 0 5%; }
          .fitr-filter-scroll { padding: 0 5% 4px; }
          .fitr-filter-row { justify-content: flex-start; }
          .fitr-filter-hint { padding: 6px 5% 10px; }

          .fitr-cards-section { padding: 24px 4% 40px; }
          .fitr-cards-grid { grid-template-columns: 1fr; gap: 16px; }

          .fitr-table-section { padding: 40px 4%; }
          .fitr-table { min-width: 560px; font-size: .78rem; }
          .fitr-th-plan { min-width: 90px; }
          .fitr-td-feat { font-size: .78rem; }

          .fitr-faq-section { padding: 40px 4%; }
          .fitr-faq-q { font-size: .84rem; padding: 14px 16px; }
          .fitr-faq-a { padding: 0 16px 14px; font-size: .82rem; }

          .fitr-cta-section { padding: 44px 5%; }
          .fitr-cta-btns { flex-direction: column; align-items: center; }
          .fitr-cta-btns .btn { width: 100%; max-width: 280px; justify-content: center; }
        }

        /* Extra-small (≤400px) */
        @media (max-width: 400px) {
          .fitr-trust-grid { grid-template-columns: 1fr; }
          .fitr-trust-badge { justify-content: flex-start; }
        }
      `}</style>
    </>
  )
}
