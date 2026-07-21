'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'

const services = [
  { icon: 'fa-file-invoice-dollar', title: 'Income Tax Return (ITR)', desc: 'CA-reviewed ITR filing for salaried individuals, business owners, NRIs and professionals with all income types.' },
  { icon: 'fa-receipt', title: 'GST Compliance', desc: 'GSTR-1, GSTR-3B preparation, ITC reconciliation, annual returns GSTR-9 and GSTR-9C.' },
  { icon: 'fa-building', title: 'ROC / MCA Filings', desc: 'Annual return MGT-7, AOC-4, Director KYC, DPT-3, MSME-1 and all event-based company filings.' },
  { icon: 'fa-percentage', title: 'TDS Compliance', desc: 'TDS working, deduction register, 26Q/24Q quarterly returns, TDS challan preparation.' },
  { icon: 'fa-users', title: 'PF & ESI Compliance', desc: 'Monthly PF and ESI workings, ECR challan data, employer and employee contribution calculations.' },
  { icon: 'fa-landmark', title: 'Professional Tax', desc: 'State-wise PT computation from salary register, PT challan preparation and returns.' },
  { icon: 'fa-chart-line', title: 'Business Accounting', desc: 'Monthly bookkeeping, Tally management, MIS reports and financial statement preparation.' },
  { icon: 'fa-search-dollar', title: 'Tax Planning & Advisory', desc: 'Strategic tax planning, deduction optimization under 80C/80D, advance tax computation.' },
]

const packages = [
  {
    name: 'Salary (Nil Return)',
    price: '999',
    per: 'per year',
    tax: 'Exclusive of GST',
    desc: 'Single salary income with total income ≤ ₹12,75,000',
    featured: false,
    badge: null,
    features: ['Single Employer', 'Income from other sources', 'Total income ≤ ₹12,75,000', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report'],
  },
  {
    name: 'Salary & Property',
    price: '2,000',
    per: 'per year',
    tax: 'Exclusive of GST',
    desc: 'Salary + House Property income',
    featured: false,
    badge: null,
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Income from other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report'],
  },
  {
    name: 'Capital Gains',
    price: '2,500',
    per: 'per year',
    tax: 'Exclusive of GST',
    desc: 'Salary + Rent + Capital Gains (shares, MFs, properties)',
    featured: true,
    badge: 'Most Popular',
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Multiple capital gain incomes (shares, MFs, properties)', 'Other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report', 'Losses carried forward report'],
  },
  {
    name: 'Business / Professional Income',
    price: '3,000',
    per: 'per year',
    tax: 'Exclusive of GST',
    desc: 'Salary + Rent + Capital Gains + Business/Professional Income',
    featured: false,
    badge: null,
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Multiple capital gain incomes', 'Business/Professional Income (Non-Audit) — without B/S & P&L', 'Other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report', 'Losses carried forward report'],
  },
  {
    name: 'Futures & Options / Cryptocurrency',
    price: '3,500',
    per: 'per year',
    tax: 'Exclusive of GST',
    desc: 'All income types including F&O and Crypto',
    featured: false,
    badge: null,
    features: ['Single or multiple employers', 'Single or multiple house properties', 'Multiple capital gain incomes', 'Business/Professional Income (Non-Audit) — without B/S & P&L', 'Revenue from F&O / Crypto', 'Other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report', 'Losses carried forward report'],
  },
  {
    name: 'NRI / Foreign Income',
    price: '5,000',
    per: 'per year',
    tax: 'Exclusive of GST',
    desc: 'NRI with Indian income or Resident with foreign income',
    featured: false,
    badge: null,
    features: ['Single or multiple employers', 'Multiple house properties', 'Multiple capital gain incomes', 'Business & Professional Income (Non-Audit)', 'Revenue from F&O / Crypto', 'DTAA Tax Relief', 'Foreign salary (including foreign tax relief)', 'Other sources', 'CA reviewed filing'],
    deliverables: ['Income tax return acknowledgement', 'Statement of Income', 'Financial health report', 'Tax planning report', 'Losses carried forward report'],
  },
]

const whyUs = [
  { icon: 'fa-user-tie', title: 'CA Reviewed', desc: 'Every return is reviewed by a qualified Chartered Accountant before filing.' },
  { icon: 'fa-lock', title: '100% Secure', desc: 'Bank-grade AES-256 encryption protects all your documents and personal data.' },
  { icon: 'fa-clock', title: 'Fast Turnaround', desc: 'Most returns filed within 24–48 hours of complete document submission.' },
  { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Reach us via WhatsApp, call or email. We respond within business hours.' },
]

const contactItems = [
  { icon: 'fa-envelope', label: 'Email', value: 'info@demandassociatesllp.com' },
  { icon: 'fa-phone', label: 'Phone', value: '+91 98765 43210' },
  { icon: 'fab fa-whatsapp', label: 'WhatsApp', value: 'Chat with us instantly' },
  { icon: 'fa-map-marker-alt', label: 'Office', value: 'India' },
]

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [contactStatus, setContactStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [modalStep, setModalStep] = useState<null | 'choose' | 'google-disclosure'>(null)
  const [googleLoading, setGoogleLoading] = useState(false)
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus('ok')
  }

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="logo" onClick={() => scrollTo('hero')} style={{ cursor: 'pointer' }}>
            <span className="logo-m">MANTRA</span>
            <span className="logo-t">TAXBOOKS</span>
          </div>

          <ul className="lp-nav-links hide-mobile">
            <li><button className="lp-nav-btn" onClick={() => scrollTo('hero')}>Home</button></li>
            <li className="lp-dropdown-wrap" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
              <Link href="/services" className="lp-nav-btn lp-dropdown-trigger">
                Services <i className={`fas fa-chevron-down lp-caret${servicesOpen ? ' open' : ''}`} />
              </Link>
              {servicesOpen && (
                <div className="lp-dropdown" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                  <Link href="/services/file-itr" className="lp-dropdown-item" onClick={handleServiceItemClick}>
                    <i className="fas fa-file-invoice-dollar" />
                    <div>
                      <div className="lp-dropdown-label">File ITR</div>
                      <div className="lp-dropdown-sub">Why It's Needed &amp; CA Plans</div>
                    </div>
                  </Link>
                  <Link href="/services/company-registration" className="lp-dropdown-item" onClick={handleServiceItemClick}>
                    <i className="fas fa-building" />
                    <div>
                      <div className="lp-dropdown-label">Company Registration</div>
                      <div className="lp-dropdown-sub">Pvt Ltd, LLP, OPC &amp; Contact</div>
                    </div>
                  </Link>
                </div>
              )}
            </li>
            <li><button className="lp-nav-btn" onClick={() => scrollTo('about')}>About</button></li>
            <li><button className="lp-nav-btn" onClick={() => scrollTo('contact')}>Contact</button></li>
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
            <button className="lp-mobile-link" onClick={() => scrollTo('hero')}>Home</button>
            <Link href="/services" className="lp-mobile-link" onClick={() => setMenuOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textDecoration: 'none', color: '#fff' }}>
              Services <i className="fas fa-chevron-right" style={{ fontSize: '.75rem', color: '#888' }} />
            </Link>
            <Link href="/services/file-itr" className="lp-mobile-link" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', paddingLeft: 20, display: 'flex', alignItems: 'center', gap: 8, color: '#1A56DB', fontWeight: 600 }}>
              <i className="fas fa-file-invoice-dollar" style={{ fontSize: '.8rem' }} /> File ITR
            </Link>
            <Link href="/services/company-registration" className="lp-mobile-link" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', paddingLeft: 20, display: 'flex', alignItems: 'center', gap: 8, color: '#1A56DB', fontWeight: 600 }}>
              <i className="fas fa-building" style={{ fontSize: '.8rem' }} /> Company Registration
            </Link>
            <button className="lp-mobile-link" onClick={() => scrollTo('about')}>About</button>
            <button className="lp-mobile-link" onClick={() => scrollTo('contact')}>Contact</button>
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

      {/* ── HERO ── */}
      <section id="hero" className="lp-hero">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="lp-hero-video"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="lp-hero-overlay" />
        <div className="lp-hero-bg" />
        <div className="lp-hero-content">
          <div className="lp-hero-badge">
            <i className="fas fa-shield-alt" /> Trusted CA Firm Since 2010
          </div>
          <h1 className="lp-hero-h1">
            Expert <span style={{ color: '#1A56DB' }}>Tax Filing</span> &amp; Financial Compliance Services
          </h1>
          <p className="lp-hero-p">
            CA-reviewed ITR filing, GST compliance, ROC filings, and complete financial services tailored for individuals and businesses across India.
          </p>
          <div className="lp-hero-actions">
            <Link href="/register" className="btn btn-primary btn-lg">
              <i className="fas fa-file-alt" /> File ITR Now
            </Link>
            <button className="btn btn-outline btn-lg" onClick={() => scrollTo('contact')}>
              <i className="fas fa-calendar-alt" /> Book Free Meeting
            </button>
          </div>
        </div>
        <div className="lp-hero-stats hide-mobile">
          {[['5000+', 'Happy Clients'], ['15+', 'Years Experience'], ['99%', 'On-time Filing'], ['100%', 'CA Reviewed']].map(([n, l]) => (
            <div key={l} className="lp-stat-card">
              <span className="lp-stat-n">{n}</span>
              <span className="lp-stat-l">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="lp-section lp-section-dark">
        <div className="lp-sec-head lp-sec-head-dark">
          <div className="lp-sec-tag lp-sec-tag-dark">ITR Filing Plans</div>
          <h2>Transparent Pricing for AY 2026-27</h2>
          <p>CA-reviewed filing at honest prices. Choose the plan that matches your income type.</p>
        </div>
        <div className="lp-pricing-grid">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`lp-pkg-card${pkg.featured ? ' featured' : ''}`}>
              {pkg.badge && <div className="lp-pkg-badge">{pkg.badge}</div>}
              <h3>{pkg.name}</h3>
              <div className="lp-pkg-price">
                <span className="lp-pkg-cur">₹</span>
                <span className="lp-pkg-amt">{pkg.price}</span>
              </div>
              <div className="lp-pkg-per">{pkg.per}</div>
              <div className="lp-pkg-tax">{pkg.tax}</div>
              <p className="lp-pkg-desc">{pkg.desc}</p>
              <ul className="lp-pkg-feats">
                {pkg.features.map((f) => (
                  <li key={f}><i className="fas fa-check-circle" /> {f}</li>
                ))}
              </ul>
              {pkg.deliverables && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 16 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                    Deliverables:
                  </div>
                  <ul className="lp-pkg-feats" style={{ margin: 0 }}>
                    {pkg.deliverables.map((d) => (
                      <li key={d} style={{ color: '#E2E8F0', marginBottom: 4 }}>
                        <i className="fas fa-file-download" style={{ color: '#60A5FA' }} /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button className="btn btn-primary btn-block" onClick={() => setModalStep('choose')}>
                <i className="fas fa-file-alt" /> Get Started
              </button>
            </div>
          ))}
        </div>
        <p className="lp-pricing-note">* All prices exclusive of GST &nbsp;|&nbsp; CA reviewed filing included in all plans</p>
      </section>

      {/* ── WHY US ── */}
      <section id="about" className="lp-section">
        <div className="lp-sec-head">
          <div className="lp-sec-tag">Why Mantra Taxbooks</div>
          <h2>Your Trusted Financial Partner</h2>
          <p>We combine technology with CA expertise to deliver fast, accurate compliance at honest prices.</p>
        </div>
        <div className="lp-why-grid">
          {whyUs.map((w) => (
            <div key={w.title} className="lp-why-card">
              <div className="lp-why-icon"><i className={`fas ${w.icon}`} /></div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="lp-section lp-section-bg">
        <div className="lp-sec-head">
          <div className="lp-sec-tag">Get In Touch</div>
          <h2>We&apos;d Love to Hear From You</h2>
        </div>
        <div className="lp-contact-grid">
          <div className="lp-contact-info">
            <h3>D E M &amp; Associates LLP</h3>
            <p>CA firm offering expert tax, compliance and financial advisory services. Get in touch to discuss how we can help you stay compliant and save tax.</p>
            {contactItems.map((c) => (
              <div key={c.label} className="lp-c-item">
                <div className="lp-c-icon"><i className={c.icon.startsWith('fab') ? c.icon : `fas ${c.icon}`} /></div>
                <div>
                  <strong>{c.label}</strong>
                  <span>{c.value}</span>
                </div>
              </div>
            ))}
            <div className="lp-contact-btns">
              <button className="btn btn-primary" onClick={() => scrollTo('contact')}>
                <i className="fas fa-phone" /> Request Callback
              </button>
              <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
                <i className="fas fa-video" /> Book Meeting
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Send Us a Message</h3></div>
            <div className="card-body">
              {contactStatus === 'ok' && (
                <div className="alert alert-ok"><i className="fas fa-check-circle" /> Message sent! We&apos;ll contact you soon.</div>
              )}
              <form onSubmit={handleContact}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-control" placeholder="Your name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input className="form-control" placeholder="+91 ..." value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-control" type="email" placeholder="email@example.com" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input className="form-control" placeholder="How can we help?" value={contactForm.subject} onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-control" placeholder="Describe your query..." value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  <i className="fas fa-paper-plane" /> Send Message
                </button>
              </form>
            </div>
          </div>
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
            <p>Expert CA services for individuals, businesses and corporations. Trusted by 5000+ clients across India for ITR filing, GST, ROC and all compliance needs.</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/file-itr">ITR Filing</Link></li>
              <li><Link href="/services/company-registration">Company Registration</Link></li>
              <li><button onClick={() => scrollTo('services')}>GST Compliance</button></li>
              <li><button onClick={() => scrollTo('services')}>TDS Compliance</button></li>
              <li><button onClick={() => scrollTo('services')}>PF &amp; ESI</button></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => scrollTo('hero')}>Home</button></li>
              <li><Link href="/file-itr">Pricing</Link></li>
              <li><button onClick={() => scrollTo('about')}>About Us</button></li>
              <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@demandassociatesllp.com">info@demandassociatesllp.com</a></li>
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
              <li><button onClick={() => scrollTo('contact')}>Request Callback</button></li>
              <li><button onClick={() => scrollTo('contact')}>Book Free Meeting</button></li>
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>© 2026 Mantra Taxbooks — D E M &amp; Associates LLP. All rights reserved.</span>
          <span>CA Services | Tax Filing | GST | ROC</span>
        </div>
      </footer>

      {/* ── GET STARTED MODAL ── */}
      {modalStep && (
        <div className="gs-overlay" onClick={() => { setModalStep(null); setGoogleLoading(false) }}>
          <div className="gs-modal" onClick={e => e.stopPropagation()}>
            <button className="gs-close" onClick={() => { setModalStep(null); setGoogleLoading(false) }}>
              <i className="fas fa-times" />
            </button>

            {modalStep === 'choose' && (
              <>
                <div className="gs-logo">
                  <span className="logo-m">MANTRA</span>
                  <span className="logo-t">TAXBOOKS</span>
                </div>
                <h2 className="gs-title">Create your account</h2>
                <p className="gs-sub">Start your CA-reviewed ITR filing today</p>

                <button
                  className="gs-google-btn"
                  onClick={() => setModalStep('google-disclosure')}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                  <i className="fas fa-chevron-right gs-arrow" />
                </button>

                <div className="gs-divider"><span>or</span></div>

                <Link
                  href="/register"
                  className="btn btn-outline btn-block gs-email-btn"
                  onClick={() => setModalStep(null)}
                >
                  <i className="fas fa-envelope" /> Sign up with email
                </Link>

                <p className="gs-footer-note">
                  Already have an account?{' '}
                  <Link href="/login" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }} onClick={() => setModalStep(null)}>Sign in</Link>
                </p>
              </>
            )}

            {modalStep === 'google-disclosure' && (
              <>
                <button className="gs-back" onClick={() => setModalStep('choose')}>
                  <i className="fas fa-arrow-left" /> Back
                </button>

                <div className="gs-google-header">
                  <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <h2 className="gs-title" style={{ marginTop: 10 }}>Continue with Google</h2>
                </div>

                <p className="gs-disclosure-lead">
                  One tap to sign in. We&apos;ll show you exactly what we use on the next screen before anything is saved.
                </p>

                <ul className="gs-disclosure-list">
                  <li>
                    <span className="gs-disc-icon"><i className="fas fa-user-circle" /></span>
                    <span>Google shares your <strong>name, email</strong> and <strong>profile photo</strong> with MantraTaxbooks.</span>
                  </li>
                  <li>
                    <span className="gs-disc-icon gs-disc-icon--green"><i className="fas fa-shield-alt" /></span>
                    <span>We <strong>never</strong> see your Google password. You can revoke access anytime from your Google account.</span>
                  </li>
                  <li>
                    <span className="gs-disc-icon gs-disc-icon--blue"><i className="fas fa-file-contract" /></span>
                    <span>On the next step you&apos;ll review and accept our <strong>Terms</strong> and <strong>Privacy Policy</strong>.</span>
                  </li>
                </ul>

                <button
                  className="gs-google-btn gs-google-btn--proceed"
                  disabled={googleLoading}
                  onClick={() => { setGoogleLoading(true); signIn('google', { callbackUrl: '/terms-accept' }) }}
                >
                  {googleLoading ? (
                    <i className="fas fa-spinner fa-spin" />
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  {googleLoading ? 'Redirecting...' : 'Continue with Google'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── FLOAT BUTTONS ── */}
      <div className="float-btns">
        <a href="https://wa.me/919876543210" className="fb fb-wa" target="_blank" rel="noopener noreferrer" title="WhatsApp">
          <i className="fab fa-whatsapp" />
        </a>
        <button className="fb fb-cb" onClick={() => scrollTo('contact')} title="Request Callback">
          <i className="fas fa-phone-alt" />
        </button>
      </div>

      <style>{`
        /* NAV */
        .lp-nav { position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(20,20,20,.97);backdrop-filter:blur(10px);border-bottom:1px solid rgba(37,99,235,.4);box-shadow:0 2px 20px rgba(0,0,0,.4); }
        .lp-nav-inner { padding:12px 5%;display:flex;align-items:center;justify-content:space-between;gap:16px; }
        .lp-nav-links { display:flex;align-items:center;gap:24px;list-style:none;margin:0;padding:0; }
        .lp-nav-btn { background:none;border:none;color:#ccc;font-size:.875rem;font-weight:500;cursor:pointer;letter-spacing:.3px;font-family:inherit;transition:color .2s; }
        .lp-nav-btn:hover { color:#60A5FA; }
        .lp-dropdown-wrap { position:relative; padding-top:4px; padding-bottom:4px; }
        .lp-dropdown-wrap::after { content:''; position:absolute; top:100%; left:-20px; right:-20px; height:14px; }
        .lp-dropdown-trigger { display:flex;align-items:center;gap:6px; }
        .lp-caret { font-size:.65rem;transition:transform .2s; }
        .lp-caret.open { transform:rotate(180deg); }
        .lp-dropdown { position:absolute;top:calc(100% + 4px);left:50%;transform:translateX(-50%);background:#1C1C1C;border:1px solid rgba(37,99,235,.4);border-radius:10px;padding:6px;min-width:230px;box-shadow:0 8px 32px rgba(0,0,0,.5);z-index:2000;pointer-events:auto; }
        .lp-dropdown::before { content:'';position:absolute;top:-6px;left:50%;width:10px;height:10px;background:#1C1C1C;border-left:1px solid rgba(37,99,235,.4);border-top:1px solid rgba(37,99,235,.4);transform:translateX(-50%) rotate(45deg); }
        .lp-dropdown-item { display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:7px;text-decoration:none;transition:background .15s;color:#E0E0E0;cursor:pointer; }
        .lp-dropdown-item:hover { background:rgba(37,99,235,.15);color:#60A5FA; }
        .lp-dropdown-item .fa-file-invoice-dollar, .lp-dropdown-item .fa-building { color:#60A5FA;font-size:.95rem;flex-shrink:0; }
        .lp-dropdown-label { font-weight:700;font-size:.85rem; }
        .lp-dropdown-sub { font-size:.72rem;color:#888;margin-top:1px; }
        .lp-nav-cta { display:flex;align-items:center;gap:10px;flex-shrink:0; }
        .lp-hamburger { background:none;border:none;color:#ccc;font-size:1.2rem;cursor:pointer; }
        .lp-mobile-menu { background:#1a1a1a;border-top:1px solid rgba(37,99,235,.3);padding:12px 5%; }
        .lp-mobile-link { display:block;width:100%;text-align:left;padding:10px 0;background:none;border:none;color:#ccc;font-size:.9rem;cursor:pointer;font-family:inherit;border-bottom:1px solid rgba(255,255,255,.05); }
        .lp-mobile-auth { display:flex;gap:10px;padding-top:14px; }

        /* HERO */
        .lp-hero { min-height:100vh;background:linear-gradient(135deg,#0d0d0d 0%,#09152b 50%,#0d0d0d 100%);display:flex;align-items:center;padding:100px 5% 60px;position:relative;overflow:hidden; }
        .lp-hero-video { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:0.9; }
        .lp-hero-overlay { position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,15,30,.45) 0%,rgba(10,30,70,.45) 100%);z-index:1; }
        .lp-hero-bg { position:absolute;inset:0;background-image:radial-gradient(circle at 20% 50%,rgba(26,86,219,.12) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(192,192,192,.05) 0%,transparent 40%);z-index:1;pointer-events:none; }
        .lp-hero-content { position:relative;z-index:2;max-width:600px; }
        .lp-hero-badge { display:inline-flex;align-items:center;gap:8px;background:rgba(26,86,219,.15);border:1px solid rgba(26,86,219,.4);color:#1A56DB;padding:6px 16px;border-radius:20px;font-size:.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:22px; }
        .lp-hero-h1 { font-size:clamp(1.8rem,5vw,3rem);font-weight:900;color:#fff;line-height:1.15;margin-bottom:20px; }
        .lp-hero-p { font-size:1.05rem;color:#A0A0A0;line-height:1.75;margin-bottom:36px; }
        .lp-hero-actions { display:flex;gap:14px;flex-wrap:wrap; }
        .lp-hero-stats { position:absolute;right:5%;top:50%;transform:translateY(-50%);display:grid;grid-template-columns:1fr 1fr;gap:14px;z-index:2; }
        .lp-stat-card { background:rgba(255,255,255,.04);border:1px solid rgba(192,192,192,.18);border-radius:12px;padding:20px;text-align:center;backdrop-filter:blur(6px); }
        .lp-stat-n { font-size:2rem;font-weight:900;color:#1A56DB;display:block; }
        .lp-stat-l { font-size:.72rem;color:#A0A0A0;text-transform:uppercase;letter-spacing:1px;margin-top:4px;display:block; }

        /* SECTIONS */
        .lp-section { padding:80px 5%; }
        .lp-section-bg { background:#F5F5F5; }
        .lp-section-dark { background:#1A1A1A; }
        .lp-sec-head { text-align:center;margin-bottom:52px; }
        .lp-sec-tag { display:inline-block;background:rgba(26,86,219,.1);color:#1A56DB;padding:5px 16px;border-radius:20px;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px; }
        .lp-sec-tag-dark { background:rgba(26,86,219,.2);color:#2563EB; }
        .lp-sec-head h2 { font-size:clamp(1.4rem,3vw,2.1rem);font-weight:800;margin-bottom:12px; }
        .lp-sec-head p { color:#666;font-size:1rem;max-width:540px;margin:0 auto;line-height:1.7; }
        .lp-sec-head-dark h2 { color:#fff; }
        .lp-sec-head-dark p { color:#A0A0A0; }

        /* SERVICES */
        .lp-services-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px; }
        .lp-svc-card { background:#fff;border-radius:12px;padding:26px;border:1px solid #E0E0E0;transition:all .3s;position:relative;overflow:hidden; }
        .lp-svc-card:hover { transform:translateY(-4px);box-shadow:0 12px 32px rgba(26,86,219,.1);border-color:rgba(26,86,219,.25); }
        .lp-svc-bar { position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(to bottom,#1A56DB,#0A2A73); }
        .lp-svc-icon { width:48px;height:48px;background:linear-gradient(135deg,#1A56DB,#0A2A73);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem;margin-bottom:14px; }
        .lp-svc-card h3 { font-size:.95rem;font-weight:700;margin-bottom:8px; }
        .lp-svc-card p { font-size:.83rem;color:#666;line-height:1.6;margin:0; }

        /* PRICING */
        .lp-pricing-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:18px; }
        .lp-pkg-card { background:rgba(255,255,255,.04);border:1px solid rgba(192,192,192,.15);border-radius:14px;padding:26px;position:relative;transition:all .3s;display:flex;flex-direction:column; }
        .lp-pkg-card.featured { background:linear-gradient(145deg,rgba(26,86,219,.18),rgba(10,42,115,.1));border-color:#1A56DB; }
        .lp-pkg-card:hover { border-color:#1A56DB;box-shadow:0 8px 28px rgba(26,86,219,.22); }
        .lp-pkg-badge { position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#1A56DB,#0A2A73);color:#fff;padding:3px 14px;border-radius:10px;font-size:.72rem;font-weight:700;white-space:nowrap; }
        .lp-pkg-card h3 { font-size:.95rem;font-weight:700;color:#E8E8E8;margin-bottom:6px; }
        .lp-pkg-price { display:flex;align-items:flex-start;gap:3px;margin:10px 0 3px; }
        .lp-pkg-cur { font-size:1.1rem;margin-top:5px;color:#1A56DB;font-weight:700; }
        .lp-pkg-amt { font-size:2.2rem;font-weight:900;color:#1A56DB; }
        .lp-pkg-per { font-size:.78rem;color:#A0A0A0; }
        .lp-pkg-tax { font-size:.72rem;color:#A0A0A0;opacity:.7;margin-bottom:14px; }
        .lp-pkg-desc { font-size:.78rem;color:#A0A0A0;line-height:1.5;margin:0 0 16px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.07); }
        .lp-pkg-feats { list-style:none;padding:0;margin:0 0 22px;flex:1; }
        .lp-pkg-feats li { display:flex;align-items:flex-start;gap:8px;font-size:.8rem;color:#A0A0A0;margin-bottom:7px; }
        .lp-pkg-feats li i { color:#27AE60;margin-top:2px;flex-shrink:0;font-size:.75rem; }
        .lp-pricing-note { text-align:center;color:#A0A0A0;font-size:.78rem;margin-top:22px; }

        /* WHY US */
        .lp-why-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px; }
        .lp-why-card { text-align:center;padding:28px 20px; }
        .lp-why-icon { width:60px;height:60px;background:linear-gradient(135deg,#1A56DB,#0A2A73);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.4rem;margin:0 auto 16px; }
        .lp-why-card h3 { font-size:.95rem;font-weight:700;margin-bottom:8px; }
        .lp-why-card p { font-size:.83rem;color:#666;line-height:1.6;margin:0; }

        /* CONTACT */
        .lp-contact-grid { display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start; }
        .lp-contact-info h3 { font-size:1.4rem;font-weight:700;margin-bottom:14px; }
        .lp-contact-info > p { color:#666;line-height:1.7;margin-bottom:28px;font-size:.9rem; }
        .lp-c-item { display:flex;align-items:flex-start;gap:14px;margin-bottom:18px; }
        .lp-c-icon { width:40px;height:40px;background:linear-gradient(135deg,#1A56DB,#0A2A73);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.95rem;flex-shrink:0; }
        .lp-c-item strong { display:block;font-size:.83rem;font-weight:600;margin-bottom:2px; }
        .lp-c-item span { font-size:.83rem;color:#666; }
        .lp-contact-btns { margin-top:20px;display:flex;gap:10px;flex-wrap:wrap; }

        /* FOOTER */
        .lp-footer { background:#1A1A1A;color:#A0A0A0;padding:60px 5% 24px; }
        .lp-footer-grid { display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;margin-bottom:36px; }
        .lp-footer-brand p { font-size:.83rem;line-height:1.7;margin-top:12px;color:#A0A0A0; }
        .lp-footer h4 { color:#E8E8E8;font-size:.85rem;font-weight:700;margin-bottom:14px; }
        .lp-footer ul { list-style:none;padding:0;margin:0; }
        .lp-footer ul li { margin-bottom:7px; }
        .lp-footer ul li a, .lp-footer ul li button { color:#A0A0A0;text-decoration:none;font-size:.82rem;cursor:pointer;background:none;border:none;font-family:inherit;padding:0;transition:color .2s; }
        .lp-footer ul li a:hover, .lp-footer ul li button:hover { color:#60A5FA; }
        .lp-footer-bottom { border-top:1px solid rgba(192,192,192,.1);padding-top:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:.78rem; }

        /* SHOW/HIDE HELPERS */
        @media (max-width:768px) {
          .hide-mobile { display:none !important; }
          .show-mobile { display:flex !important; }
        }
        @media (min-width:769px) {
          .show-mobile { display:none !important; }
        }

        /* RESPONSIVE — TABLET */
        @media (max-width:900px) {
          .lp-hero-stats { display:none; }
          .lp-contact-grid { grid-template-columns:1fr; gap:32px; }
          .lp-footer-grid { grid-template-columns:1fr 1fr; }
        }

        /* RESPONSIVE — MOBILE */
        @media (max-width:640px) {
          .lp-hero { padding:90px 5% 50px; min-height:auto; }
          .lp-hero-h1 { font-size:1.75rem; }
          .lp-hero-p { font-size:.92rem; }
          .lp-hero-actions { flex-direction:column; }
          .lp-hero-actions .btn { width:100%; justify-content:center; }

          .lp-section { padding:52px 5%; }
          .lp-sec-head { margin-bottom:32px; }
          .lp-sec-head h2 { font-size:1.3rem; }
          .lp-sec-head p { font-size:.88rem; }

          .lp-services-grid { grid-template-columns:1fr; gap:14px; }
          .lp-svc-card { padding:20px 18px; }

          .lp-pricing-grid { grid-template-columns:1fr; }
          .lp-pkg-card { padding:22px 18px; }

          .lp-why-grid { grid-template-columns:1fr 1fr; gap:16px; }
          .lp-why-card { padding:20px 12px; }
          .lp-why-icon { width:48px; height:48px; font-size:1.1rem; }

          .lp-contact-grid { grid-template-columns:1fr; gap:28px; }
          .lp-contact-btns { flex-direction:column; }
          .lp-contact-btns .btn { width:100%; justify-content:center; }

          .lp-footer-grid { grid-template-columns:1fr; gap:28px; }
          .lp-footer-bottom { flex-direction:column; text-align:center; gap:6px; }
          .lp-footer { padding:40px 5% 20px; }
        }

        @media (max-width:380px) {
          .lp-why-grid { grid-template-columns:1fr; }
        }

        /* GET STARTED MODAL */
        .gs-overlay { position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px; }
        .gs-modal { background:#fff;border-radius:18px;padding:36px 32px;width:100%;max-width:420px;position:relative;box-shadow:0 24px 64px rgba(0,0,0,.25);max-height:90vh;overflow-y:auto; }
        .gs-close { position:absolute;top:14px;right:16px;background:none;border:none;font-size:1.1rem;color:#999;cursor:pointer;padding:4px 8px;border-radius:6px;transition:background .15s; }
        .gs-close:hover { background:#f0f0f0;color:#333; }
        .gs-logo { display:flex;align-items:center;gap:6px;justify-content:center;margin-bottom:18px; }
        .gs-title { font-size:1.35rem;font-weight:800;color:#1A1A1A;text-align:center;margin-bottom:6px; }
        .gs-sub { font-size:.85rem;color:#666;text-align:center;margin-bottom:26px; }
        .gs-google-btn { width:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:13px 20px;background:#fff;border:2px solid #e0e0e0;border-radius:10px;font-size:.95rem;font-weight:600;color:#1A1A1A;cursor:pointer;transition:all .2s;position:relative; }
        .gs-google-btn:hover { border-color:#4285F4;box-shadow:0 4px 16px rgba(66,133,244,.15); }
        .gs-google-btn--proceed { background:#1A1A1A;color:#fff;border-color:#1A1A1A;margin-top:8px; }
        .gs-google-btn--proceed:hover { background:#333;border-color:#333; }
        .gs-google-btn--proceed:disabled { opacity:.6;cursor:not-allowed; }
        .gs-arrow { position:absolute;right:16px;font-size:.75rem;color:#bbb; }
        .gs-divider { display:flex;align-items:center;gap:14px;margin:18px 0;color:#bbb;font-size:.82rem; }
        .gs-divider::before,.gs-divider::after { content:'';flex:1;height:1px;background:#e8e8e8; }
        .gs-email-btn { display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;color:#333;border-color:#d0d0d0; }
        .gs-email-btn:hover { border-color:#2563EB;color:#2563EB; }
        .gs-footer-note { text-align:center;margin-top:18px;font-size:.83rem;color:#888; }
        .gs-back { display:flex;align-items:center;gap:8px;background:none;border:none;color:#888;font-size:.83rem;cursor:pointer;padding:0;margin-bottom:20px;font-family:inherit;transition:color .15s; }
        .gs-back:hover { color:#333; }
        .gs-google-header { display:flex;flex-direction:column;align-items:center;margin-bottom:16px; }
        .gs-disclosure-lead { font-size:.9rem;color:#444;line-height:1.6;text-align:center;margin-bottom:22px;padding:14px 16px;background:#f8f8f8;border-radius:10px;border-left:3px solid #4285F4; }
        .gs-disclosure-list { list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:14px; }
        .gs-disclosure-list li { display:flex;align-items:flex-start;gap:14px;font-size:.87rem;color:#444;line-height:1.6; }
        .gs-disc-icon { width:34px;height:34px;border-radius:50%;background:rgba(66,133,244,.1);display:flex;align-items:center;justify-content:center;color:#4285F4;font-size:.85rem;flex-shrink:0;margin-top:1px; }
        .gs-disc-icon--green { background:rgba(39,174,96,.1);color:#27AE60; }
        .gs-disc-icon--blue { background:rgba(37,99,235,.1);color:#2563EB; }

        @media (max-width:480px) {
          .gs-modal { padding:28px 20px; }
          .gs-title { font-size:1.2rem; }
        }
      `}</style>
    </>
  )
}
