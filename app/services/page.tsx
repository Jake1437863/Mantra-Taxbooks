'use client'
import Link from 'next/link'
import { useState } from 'react'

const itrPlans = [
  {
    name: 'Salary (Nil Return)',
    price: '799',
    per: 'per year',
    badge: null,
    desc: 'Single salary income with total income ≤ ₹12,75,000',
    features: ['Single Employer Salary', 'Income from other sources', 'Total income ≤ ₹12,75,000', 'CA reviewed filing', '100% Data Security'],
  },
  {
    name: 'Salary & Property',
    price: '1,499',
    per: 'per year',
    badge: null,
    desc: 'Salary + One or Multiple House Property income',
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Income from other sources', 'CA reviewed filing', 'Tax saving advice'],
  },
  {
    name: 'Capital Gains',
    price: '1,999',
    per: 'per year',
    badge: 'Most Popular',
    desc: 'Salary + Rent + Capital Gains from shares, MFs or property',
    features: ['Multiple employers & properties', 'Shares, Mutual Funds & Property gains', 'Loss carry forward computation', 'Other sources income', 'CA reviewed filing'],
  },
  {
    name: 'Business / Professional',
    price: '2,499',
    per: 'per year',
    badge: null,
    desc: 'Salary + Rent + Capital Gains + Non-Audit Business/Professional',
    features: ['Presumptive Tax (44AD / 44ADA)', 'Freelancers & Consultants', 'Multiple capital gain incomes', 'Expense deduction optimization', 'CA reviewed filing'],
  },
  {
    name: 'F&O / Cryptocurrency',
    price: '2,999',
    per: 'per year',
    badge: null,
    desc: 'All income types including Futures, Options, and Crypto assets',
    features: ['F&O trading revenue calculation', 'Crypto tax (Sec 115BBH) compliance', 'Audit requirement checking', 'Turnover computation', 'CA reviewed filing'],
  },
  {
    name: 'NRI / Foreign Income',
    price: '5,999',
    per: 'per year',
    badge: null,
    desc: 'NRI with Indian income or Resident with foreign assets / DTAA relief',
    features: ['DTAA Tax Relief (Sec 90/91)', 'Foreign Salary & ESOPs', 'Schedule FA & Foreign Assets', 'NRE/NRO Account interest', 'Dedicated Senior CA Expert'],
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
    icon: 'fa-shield-check',
    title: 'High-Value Transactions & Credibility',
    desc: 'Essential financial record for buying immovable property, investing in high-value assets, starting a business, or participating in government tenders.',
  },
]

const companyTypes = [
  {
    icon: 'fa-building',
    title: 'Private Limited Company (Pvt Ltd)',
    badge: 'Most Popular for Startups',
    desc: 'The most recognized legal entity structure in India. Offers limited liability protection, high investor confidence, and ease of raising equity funding.',
    bullets: ['Min 2 Directors & Shareholders', 'Limited Liability Protection', 'Eligible for Startup India benefits', 'Separate legal identity'],
  },
  {
    icon: 'fa-handshake',
    title: 'Limited Liability Partnership (LLP)',
    badge: 'Ideal for Professional Services',
    desc: 'Combines the flexibility of a partnership with the limited liability of a company. Low compliance cost compared to Private Limited.',
    bullets: ['Min 2 Designated Partners', 'No mandatory audit if turnover < ₹40 Lakhs', 'Lower compliance overhead', 'No Dividend Distribution Tax'],
  },
  {
    icon: 'fa-user-tie',
    title: 'One Person Company (OPC)',
    badge: 'For Solo Founders',
    desc: 'Allows a single entrepreneur to operate a corporate entity with limited liability and complete individual control without needing co-founders.',
    bullets: ['Single Director & Shareholder', '100% control with legal protection', 'Nominee designation required', 'Seamless conversion to Pvt Ltd'],
  },
  {
    icon: 'fa-heart',
    title: 'Section 8 Company (NGO / Trust)',
    badge: 'Non-Profit Entity',
    desc: 'Incorporated for promoting commerce, art, science, sports, education, research, social welfare, or environmental protection.',
    bullets: ['12A & 80G tax exemption eligible', 'No minimum capital requirement', 'High trust for CSR grants', 'Non-profit dividend restriction'],
  },
  {
    icon: 'fa-store',
    title: 'Partnership / Sole Proprietorship',
    badge: 'Quick & Low Cost',
    desc: 'Simplest business setup for small traders, shops, and micro-enterprises looking for fast launching with minimal paperwork.',
    bullets: ['Immediate operation setup', 'GST & MSME / Udyam registration', 'Low initial cost', 'Direct tax pass-through'],
  },
]

const registrationProcess = [
  { step: '01', title: 'Name Approval', desc: 'Filing RUN / SPICe+ Part A for MCA name reservation and checking trademark availability.' },
  { step: '02', title: 'Digital Signature (DSC)', desc: 'Procuring Class-3 Digital Signature Certificates for proposed directors and founders.' },
  { step: '03', title: 'SPICe+ MCA Documentation', desc: 'Drafting Memorandum of Association (MoA), Articles of Association (AoA), & INC-9 declarations.' },
  { step: '04', title: 'Incorporation Certificate', desc: 'MCA approval and generation of Certificate of Incorporation (COI) along with PAN & TAN.' },
  { step: '05', title: 'Bank Account & GST', desc: 'Assistance in opening zero-balance current bank account and applying for GSTIN & MSME registration.' },
]

const requiredDocs = [
  'PAN Card of all Directors & Shareholders',
  'Aadhaar Card / Voter ID / Passport / Driving License',
  'Latest Bank Statement / Electricity Bill (proof of residence)',
  'Passport-size photos of all directors',
  'Registered office address proof (Electricity bill / Gas bill)',
  'NOC from property owner + Rent Agreement',
]

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    entityType: 'Private Limited Company (Pvt Ltd)',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const whatsappMessage = encodeURIComponent(
    'Hi Mantra Taxbooks team, I would like to get information regarding Company Registration services.'
  )
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#333' }}>
      {/* ── NAVBAR ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <Link href="/" className="logo">
            <span className="logo-m">MANTRA</span>
            <span className="logo-t">TAXBOOKS</span>
          </Link>

          <ul className="lp-nav-links hide-mobile">
            <li>
              <Link href="/" className="lp-nav-btn">Home</Link>
            </li>
            <li>
              <Link href="/services" className="lp-nav-btn active" style={{ color: '#1A56DB', fontWeight: 700 }}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/#about" className="lp-nav-btn">About</Link>
            </li>
            <li>
              <Link href="/#contact" className="lp-nav-btn">Contact</Link>
            </li>
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
            <Link href="/services" className="lp-mobile-link" onClick={() => setMenuOpen(false)} style={{ color: '#1A56DB', fontWeight: 700 }}>Services</Link>
            <Link href="/#about" className="lp-mobile-link" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/#contact" className="lp-mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>
            <div className="lp-mobile-auth">
              <Link href="/login" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
                <i className="fas fa-sign-in-alt" /> Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
                <i className="fas fa-user-plus" /> Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO BANNER ── */}
      <section style={{ background: 'linear-gradient(135deg, #0A2A73 0%, #1A56DB 100%)', color: '#fff', padding: '120px 20px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255, 255, 255, 0.15)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.4)', padding: '6px 16px', borderRadius: 30, fontSize: '0.85rem', fontWeight: 600, marginBottom: 20 }}>
            <i className="fas fa-briefcase" /> Professional Tax &amp; MCA Compliance Services
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
            Our Premium Services
          </h1>
          <p style={{ color: '#ccc', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 750, margin: '0 auto 30px' }}>
            From hassle-free CA-reviewed Income Tax Return (ITR) filings to end-to-end legal Company Incorporation — we handle your financial compliance with precision.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }}>
            <a href="#file-itr" className="btn btn-primary btn-lg" style={{ borderRadius: 30, background: '#fff', color: '#0A2A73' }}>
              <i className="fas fa-file-invoice-dollar" /> File ITR Services &amp; Pricing
            </a>
            <a href="#company-registration" className="btn btn-outline btn-lg" style={{ borderRadius: 30, borderColor: '#666', color: '#fff' }}>
              <i className="fas fa-building" /> Company Registration
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SERVICE 1: FILE ITR
         ════════════════════════════════════════════════════════════ */}
      <section id="file-itr" style={{ padding: '80px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ color: '#1A56DB', textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.82rem', fontWeight: 700, marginBottom: 8 }}>
            Service #1
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111' }}>
            Income Tax Return (ITR) Filing
          </h2>
          <div style={{ width: 60, height: 4, background: '#1A56DB', margin: '12px auto 16px', borderRadius: 2 }} />
          <p style={{ color: '#666', maxWidth: 700, margin: '0 auto', fontSize: '1rem' }}>
            Get your tax returns filed and verified by experienced Chartered Accountants (CAs). 100% accurate, hassle-free, and maximum tax savings.
          </p>
        </div>

        {/* WHY ITR IS NEEDED */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E5E7EB', padding: '40px 30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 35 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>
              <i className="fas fa-question-circle" style={{ color: '#1A56DB', marginRight: 10 }} />
              Why is Filing ITR Needed?
            </h3>
            <p style={{ color: '#666', fontSize: '0.92rem', marginTop: 6 }}>
              Key benefits and mandatory compliance reasons to file your Income Tax Return every year
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {whyFileItr.map((item, idx) => (
              <div key={idx} style={{ background: '#F8F9FA', borderRadius: 12, padding: 24, border: '1px solid #EDEDED', transition: 'transform 0.2s', display: 'flex', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(26, 86, 219, 0.1)', color: '#1A56DB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  <i className={`fas ${item.icon}`} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111', marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ITR PRICING & PLANS */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111' }}>
              ITR Filing Pricing Plans
            </h3>
            <p style={{ color: '#666', fontSize: '0.95rem', marginTop: 6 }}>
              Select a plan matching your income sources. Click any plan to login &amp; start filing immediately.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 26 }}>
            {itrPlans.map((plan, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  border: plan.badge ? '2px solid #1A56DB' : '1px solid #E5E7EB',
                  padding: 30,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: plan.badge ? '0 10px 30px rgba(26,86,219,0.12)' : '0 4px 15px rgba(0,0,0,0.04)',
                }}
              >
                {plan.badge && (
                  <span style={{ position: 'absolute', top: -14, right: 24, background: '#1A56DB', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {plan.badge}
                  </span>
                )}
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111', marginBottom: 6 }}>{plan.name}</h4>
                <p style={{ fontSize: '0.85rem', color: '#666', minHeight: 38, marginBottom: 20 }}>{plan.desc}</p>

                <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #F0F0F0' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1A56DB' }}>₹</span>
                    <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#111', lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: '0.82rem', color: '#888', marginLeft: 4 }}>/ year (excl. GST)</span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flex: 1 }}>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.86rem', color: '#444', marginBottom: 10 }}>
                      <i className="fas fa-check-circle" style={{ color: '#27AE60', fontSize: '0.9rem' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* ROUTE TO LOGIN FOR ALL ITR BUTTONS/PRICING */}
                <Link href="/login" className={`btn ${plan.badge ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center', padding: '12px', borderRadius: 8, borderColor: plan.badge ? undefined : '#111', color: plan.badge ? '#fff' : '#111' }}>
                  <i className="fas fa-file-alt" /> File ITR Now — ₹{plan.price}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SERVICE 2: COMPANY REGISTRATION
         ════════════════════════════════════════════════════════════ */}
      <section id="company-registration" style={{ background: '#fff', padding: '90px 20px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div style={{ color: '#1A56DB', textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.82rem', fontWeight: 700, marginBottom: 8 }}>
              Service #2
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111' }}>
              Company Registration &amp; Incorporation
            </h2>
            <div style={{ width: 60, height: 4, background: '#1A56DB', margin: '12px auto 16px', borderRadius: 2 }} />
            <p style={{ color: '#666', maxWidth: 750, margin: '0 auto', fontSize: '1rem' }}>
              Turn your business idea into a legally recognized corporate entity. Complete MCA filing, Digital Signatures, DIN, MoA/AoA, PAN/TAN, and bank account setup.
            </p>
          </div>

          {/* ENTITY TYPES */}
          <div style={{ marginBottom: 60 }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111', marginBottom: 24, textAlign: 'center' }}>
              Choose the Right Business Structure
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              {companyTypes.map((type, idx) => (
                <div key={idx} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 14, padding: 26, position: 'relative' }}>
                  <div style={{ display: 'inline-block', background: 'rgba(26, 86, 219, 0.1)', color: '#1A56DB', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 12, marginBottom: 12 }}>
                    {type.badge}
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className={`fas ${type.icon}`} style={{ color: '#1A56DB' }} /> {type.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5, marginBottom: 16 }}>{type.desc}</p>

                  <div style={{ borderTop: '1px border #EAEAEA', paddingTop: 12 }}>
                    {type.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{ fontSize: '0.82rem', color: '#444', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <i className="fas fa-check" style={{ color: '#1A56DB', fontSize: '0.75rem' }} /> {b}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PROCESS & DOCUMENTS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 30, marginBottom: 70 }}>
            {/* Step-by-Step Process */}
            <div style={{ background: '#1A1A1A', color: '#fff', borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
                <i className="fas fa-list-ol" style={{ color: '#1A56DB' }} /> Step-by-Step Registration Process
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {registrationProcess.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ background: '#1A56DB', color: '#fff', fontWeight: 800, fontSize: '0.8rem', padding: '4px 10px', borderRadius: 6, flexShrink: 0, marginTop: 2 }}>
                      {p.step}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{p.title}</div>
                      <div style={{ fontSize: '0.82rem', color: '#aaa', marginTop: 2, lineHeight: 1.4 }}>{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20, color: '#111', display: 'flex', alignItems: 'center', gap: 10 }}>
                <i className="fas fa-folder-open" style={{ color: '#1A56DB' }} /> Mandatory Documents Required
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {requiredDocs.map((doc, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: idx !== requiredDocs.length - 1 ? '1px solid #EAEAEA' : 'none', fontSize: '0.88rem', color: '#333' }}>
                    <i className="fas fa-file-check" style={{ color: '#1A56DB', fontSize: '1rem' }} />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24, background: 'rgba(26, 86, 219, 0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(26, 86, 219, 0.2)', fontSize: '0.82rem', color: '#666', lineHeight: 1.4 }}>
                <i className="fas fa-info-circle" style={{ color: '#1A56DB', marginRight: 6 }} />
                Our team will verify all your documents before submitting them to MCA to guarantee zero rejection.
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              CONTACT & WHATSAPP & GET IN TOUCH FOR COMPANY REGISTRATION
             ════════════════════════════════════════════════════════════ */}
          <div id="company-contact" style={{ background: 'linear-gradient(135deg, #0A2A73 0%, #1A1A1A 100%)', borderRadius: 20, padding: '50px 30px', color: '#fff', boxShadow: '0 15px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{ background: '#25D366', color: '#fff', fontSize: '0.78rem', fontWeight: 700, padding: '5px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                <i className="fab fa-whatsapp" style={{ marginRight: 6 }} /> Instant Assistance
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginTop: 14, marginBottom: 10, color: '#fff' }}>
                Get In Touch for Company Registration
              </h3>
              <p style={{ color: '#ccc', maxWidth: 650, margin: '0 auto', fontSize: '0.95rem' }}>
                Have questions about structure, pricing, or compliance? Connect with our senior CA advisory team directly on WhatsApp or submit your inquiry below.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
              {/* WhatsApp & Quick Channels */}
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
                  Direct Channels
                </h4>

                {/* WHATSAPP ACTION BUTTON */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    background: '#25D366',
                    color: '#fff',
                    padding: '18px 24px',
                    borderRadius: 14,
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.35)',
                    transition: 'transform 0.2s',
                    marginBottom: 24,
                  }}
                >
                  <i className="fab fa-whatsapp" style={{ fontSize: '2.2rem' }} />
                  <div>
                    <div style={{ lineHeight: 1.2 }}>Chat on WhatsApp</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.9, fontWeight: 400, marginTop: 2 }}>
                      Get instant replies from our incorporation expert
                    </div>
                  </div>
                </a>

                {/* OTHER CONTACT DETAILS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <i className="fas fa-phone-alt" style={{ color: '#1A56DB', fontSize: '1.2rem' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase' }}>Phone Support</div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>+91 98765 43210</div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <i className="fas fa-envelope" style={{ color: '#1A56DB', fontSize: '1.2rem' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase' }}>Email Inquiry</div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>info@demandassociatesllp.com</div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <i className="fas fa-clock" style={{ color: '#1A56DB', fontSize: '1.2rem' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase' }}>Business Hours</div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Mon - Sat: 9:30 AM – 6:30 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GET IN TOUCH FORM */}
              <div style={{ background: '#fff', color: '#333', padding: 30, borderRadius: 16 }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: 6 }}>
                  Get In Touch Form
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 20 }}>
                  Fill in your details below and our company setup specialist will reach out within 2 hours.
                </p>

                {submitted ? (
                  <div style={{ background: '#E8F8F0', border: '1px solid #27AE60', color: '#1E7E34', padding: 20, borderRadius: 10, textAlign: 'center' }}>
                    <i className="fas fa-check-circle" style={{ fontSize: '2rem', marginBottom: 10, display: 'block' }} />
                    <strong style={{ fontSize: '1.05rem' }}>Inquiry Submitted Successfully!</strong>
                    <p style={{ fontSize: '0.85rem', margin: '8px 0 0', color: '#27AE60' }}>
                      Thank you for contacting Mantra Taxbooks. Our team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit}>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="e.g. Rahul Sharma"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Phone Number *</label>
                        <input
                          type="tel"
                          required
                          className="form-control"
                          placeholder="+91 9876543210"
                          value={inquiryForm.phone}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Email Address *</label>
                        <input
                          type="email"
                          required
                          className="form-control"
                          placeholder="name@company.com"
                          value={inquiryForm.email}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Entity Type Preferred</label>
                      <select
                        className="form-control"
                        value={inquiryForm.entityType}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, entityType: e.target.value })}
                      >
                        <option value="Private Limited Company (Pvt Ltd)">Private Limited Company (Pvt Ltd)</option>
                        <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                        <option value="One Person Company (OPC)">One Person Company (OPC)</option>
                        <option value="Section 8 Company (NGO)">Section 8 Company (NGO)</option>
                        <option value="Partnership / Proprietorship">Partnership / Proprietorship</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Message / Specific Requirements</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Tell us about your business idea or questions..."
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" style={{ padding: '12px', borderRadius: 8, fontSize: '0.95rem' }}>
                      <i className="fas fa-paper-plane" /> Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#111', color: '#888', padding: '40px 20px', textAlign: 'center', borderTop: '1px solid #222', fontSize: '0.85rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#fff', fontWeight: 800 }}>MANTRA TAXBOOKS</span>
            <span>— CA Reviewed Financial &amp; Tax Compliance</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
            <Link href="/services" style={{ color: '#1A56DB', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
            <Link href="/login" style={{ color: '#aaa', textDecoration: 'none' }}>Login</Link>
            <Link href="/register" style={{ color: '#aaa', textDecoration: 'none' }}>Register</Link>
          </div>
        </div>
        <div style={{ marginTop: 20, color: '#555' }}>
          &copy; {new Date().getFullYear()} Mantra Taxbooks. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
