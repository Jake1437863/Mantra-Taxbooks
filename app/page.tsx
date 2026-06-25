'use client'
import Link from 'next/link'
import { useState } from 'react'

const services = [
  { icon: 'fa-file-invoice', title: 'ITR Filing', desc: 'Accurate income tax return filing for individuals, HUFs, and businesses across all ITR forms.' },
  { icon: 'fa-percentage', title: 'GST Compliance', desc: 'End-to-end GST registration, return filing (GSTR-1, 3B), reconciliation, and advisory.' },
  { icon: 'fa-building', title: 'Company Registration', desc: 'Pvt Ltd, LLP, OPC and partnership firm registration with MCA compliance.' },
  { icon: 'fa-book', title: 'Accounting & Bookkeeping', desc: 'Monthly bookkeeping, financial statements, P&L, balance sheet preparation.' },
  { icon: 'fa-search-dollar', title: 'Tax Advisory', desc: 'Strategic tax planning, investment advice, and deduction optimization.' },
  { icon: 'fa-balance-scale', title: 'Legal Compliance', desc: 'ROC filings, TDS returns, PF/ESI compliance, and audit support.' },
]

const packages = [
  {
    name: 'Salary Basic',
    price: '₹499',
    per: '/year',
    tax: '+ GST',
    desc: 'For salaried individuals with a single employer.',
    featured: false,
    badge: null,
    features: ['ITR-1 Filing', 'Form 16 processing', 'Standard deductions', 'Email support', 'Filing acknowledgement'],
  },
  {
    name: 'Salary Plus',
    price: '₹999',
    per: '/year',
    tax: '+ GST',
    desc: 'For multiple employers, HRA, and other income.',
    featured: true,
    badge: 'Most Popular',
    features: ['ITR-1 / ITR-2 Filing', 'Multiple Form 16s', 'HRA & 80C optimization', 'Capital gains reporting', 'Phone + Email support', 'Quick turnaround'],
  },
  {
    name: 'Business Pro',
    price: '₹2,499',
    per: '/year',
    tax: '+ GST',
    desc: 'For business owners, freelancers, and professionals.',
    featured: false,
    badge: null,
    features: ['ITR-3 / ITR-4 Filing', 'Business income & expenses', 'Presumptive taxation', 'Depreciation calculation', 'Audit support', 'Dedicated CA', 'Priority support'],
  },
]

const whyUs = [
  { icon: 'fa-user-graduate', title: 'Expert CAs', desc: 'Our team of qualified Chartered Accountants brings decades of combined experience.' },
  { icon: 'fa-shield-alt', title: '100% Secure', desc: 'Bank-level encryption for all your financial data and documents.' },
  { icon: 'fa-clock', title: 'On-Time Filing', desc: 'We track all deadlines so you never pay a late fee.' },
  { icon: 'fa-headset', title: '24/7 Support', desc: 'Round-the-clock support via phone, email, and WhatsApp.' },
]

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [contactStatus, setContactStatus] = useState<'idle' | 'ok' | 'err'>('idle')

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
      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(20,20,20,.97)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(196,30,58,.35)', boxShadow: '0 2px 20px rgba(0,0,0,.4)' }}>
        <div style={{ padding: '12px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="logo">
            <span className="logo-m">MANTRA</span>
            <span className="logo-t">TAXBOOKS</span>
          </div>

          {/* Desktop nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 24, listStyle: 'none', margin: 0, padding: 0 }} className="hide-mobile">
            {['Services', 'Pricing', 'Why Us', 'Contact'].map((item) => (
              <li key={item}>
                <button onClick={() => scrollTo(item.toLowerCase().replace(' ', ''))} style={{ background: 'none', border: 'none', color: '#ccc', fontSize: '.875rem', fontWeight: 500, cursor: 'pointer', letterSpacing: '.3px', transition: 'color .2s', fontFamily: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8334A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link href="/login" className="btn btn-outline btn-sm">Login</Link>
            <button onClick={() => scrollTo('contact')} className="btn btn-primary btn-sm">Get Started</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#ccc', fontSize: '1.2rem', cursor: 'pointer' }} className="show-mobile">
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: '#1a1a1a', borderTop: '1px solid rgba(196,30,58,.2)', padding: '12px 5%' }}>
            {['Services', 'Pricing', 'Why Us', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(' ', ''))}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0', background: 'none', border: 'none', color: '#ccc', fontSize: '.9rem', cursor: 'pointer', fontFamily: 'inherit', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0d0d0d 0%,#2a0810 50%,#0d0d0d 100%)', display: 'flex', alignItems: 'center', padding: '100px 5% 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%,rgba(196,30,58,.12) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(192,192,192,.05) 0%,transparent 40%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(196,30,58,.15)', border: '1px solid rgba(196,30,58,.4)', color: '#E8334A', padding: '6px 16px', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 22 }}>
            <i className="fas fa-star" /> Trusted by 10,000+ Taxpayers
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
            Expert CA Services <span style={{ color: '#E8334A' }}>for Every Indian</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#A0A0A0', lineHeight: 1.75, marginBottom: 36 }}>
            From ITR filing to GST compliance, company registration to tax planning — we handle your finances so you can focus on what matters.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('pricing')} className="btn btn-primary btn-lg">
              <i className="fas fa-rocket" /> Get Started
            </button>
            <button onClick={() => scrollTo('contact')} className="btn btn-outline btn-lg">
              <i className="fas fa-phone" /> Talk to CA
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, zIndex: 1 }} className="hide-mobile">
          {[['10K+', 'Returns Filed'], ['₹50Cr+', 'Tax Saved'], ['98%', 'Client Satisfaction'], ['15+', 'Years Experience']].map(([n, l]) => (
            <div key={l} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(192,192,192,.18)', borderRadius: 12, padding: '20px', textAlign: 'center', backdropFilter: 'blur(6px)' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#E8334A', display: 'block' }}>{n}</span>
              <span style={{ fontSize: '.72rem', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4, display: 'block' }}>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '80px 5%', background: '#F5F5F5' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ display: 'inline-block', background: 'rgba(196,30,58,.1)', color: 'var(--red)', padding: '5px 16px', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Our Services</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', fontWeight: 800, marginBottom: 12 }}>Complete Tax & Compliance Solutions</h2>
          <p style={{ color: '#666', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>Everything you need to stay compliant and tax-efficient.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 22 }}>
          {services.map((s) => (
            <div key={s.title} className="svc-card" style={{ background: '#fff', borderRadius: 12, padding: 26, border: '1px solid #E0E0E0', transition: 'all .3s', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom,#C41E3A,#8B0000)' }} />
              <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg,#C41E3A,#8B0000)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', marginBottom: 14 }}>
                <i className={`fas ${s.icon}`} />
              </div>
              <h3 style={{ fontSize: '.95rem', fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: '.83rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 5%', background: '#1A1A1A' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ display: 'inline-block', background: 'rgba(196,30,58,.2)', color: '#E8334A', padding: '5px 16px', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Pricing</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', fontWeight: 800, marginBottom: 12, color: '#fff' }}>Transparent, Affordable Pricing</h2>
          <p style={{ color: '#A0A0A0', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>No hidden charges. Pay only for what you need.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 18, maxWidth: 900, margin: '0 auto' }}>
          {packages.map((pkg) => (
            <div key={pkg.name} style={{ background: pkg.featured ? 'linear-gradient(145deg,rgba(196,30,58,.18),rgba(139,0,0,.1))' : 'rgba(255,255,255,.04)', border: `1px solid ${pkg.featured ? '#C41E3A' : 'rgba(192,192,192,.15)'}`, borderRadius: 14, padding: 26, position: 'relative', transition: 'all .3s' }}>
              {pkg.badge && (
                <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#C41E3A,#8B0000)', color: '#fff', padding: '3px 14px', borderRadius: 10, fontSize: '.72rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{pkg.badge}</div>
              )}
              <h3 style={{ fontSize: '.95rem', fontWeight: 700, color: '#E8E8E8', marginBottom: 6 }}>{pkg.name}</h3>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 3, margin: '10px 0 3px' }}>
                <span style={{ fontSize: '1.1rem', marginTop: 5, color: '#E8334A', fontWeight: 700 }}>₹</span>
                <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#E8334A' }}>{pkg.price.replace('₹', '')}</span>
              </div>
              <div style={{ fontSize: '.78rem', color: '#A0A0A0' }}>{pkg.per} &nbsp; <span style={{ opacity: .7 }}>{pkg.tax}</span></div>
              <p style={{ fontSize: '.78rem', color: '#A0A0A0', lineHeight: 1.5, margin: '10px 0 16px', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,.07)' }}>{pkg.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px' }}>
                {pkg.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '.8rem', color: '#A0A0A0', marginBottom: 7 }}>
                    <i className="fas fa-check-circle" style={{ color: '#27AE60', marginTop: 2, flexShrink: 0, fontSize: '.75rem' }} /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('contact')} className="btn btn-primary btn-block">Get Started <i className="fas fa-arrow-right" /></button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="whyus" style={{ padding: '80px 5%', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ display: 'inline-block', background: 'rgba(196,30,58,.1)', color: 'var(--red)', padding: '5px 16px', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Why Choose Us</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', fontWeight: 800, marginBottom: 12 }}>India's Most Trusted CA Firm</h2>
          <p style={{ color: '#666', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>We combine expertise with technology to deliver the best experience.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
          {whyUs.map((w) => (
            <div key={w.title} style={{ textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg,#C41E3A,#8B0000)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.4rem', margin: '0 auto 16px' }}>
                <i className={`fas ${w.icon}`} />
              </div>
              <h3 style={{ fontSize: '.95rem', fontWeight: 700, marginBottom: 8 }}>{w.title}</h3>
              <p style={{ fontSize: '.83rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 5%', background: '#F5F5F5' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ display: 'inline-block', background: 'rgba(196,30,58,.1)', color: 'var(--red)', padding: '5px 16px', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Contact Us</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', fontWeight: 800, marginBottom: 12 }}>Get a Free Consultation</h2>
          <p style={{ color: '#666', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>Talk to our CA experts today. No obligation, no fees for the first call.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, maxWidth: 900, margin: '0 auto' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 14 }}>Contact Information</h3>
            <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 28, fontSize: '.9rem' }}>Reach out via any channel. We typically respond within 2 hours on business days.</p>
            {[
              { icon: 'fa-phone', title: 'Phone', value: '+91 98765 43210' },
              { icon: 'fa-envelope', title: 'Email', value: 'info@mantrataxbooks.com' },
              { icon: 'fa-map-marker-alt', title: 'Office', value: 'India' },
            ].map((c) => (
              <div key={c.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
                <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#C41E3A,#8B0000)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.95rem', flexShrink: 0 }}>
                  <i className={`fas ${c.icon}`} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '.83rem', fontWeight: 600, marginBottom: 2 }}>{c.title}</strong>
                  <span style={{ fontSize: '.83rem', color: '#666' }}>{c.value}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleContact} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #E0E0E0' }}>
            {contactStatus === 'ok' && <div className="alert alert-ok"><i className="fas fa-check" /> Message sent! We'll contact you soon.</div>}
            {contactStatus === 'err' && <div className="alert alert-err"><i className="fas fa-times" /> Something went wrong. Please try again.</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Your Name</label>
                <input className="form-control" placeholder="Rahul Sharma" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input className="form-control" placeholder="+91 98765..." value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input className="form-control" type="email" placeholder="you@example.com" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea className="form-control" placeholder="Tell us what you need help with..." value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              <i className="fas fa-paper-plane" /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1A1A1A', color: '#A0A0A0', padding: '60px 5% 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 36, marginBottom: 36 }}>
          <div>
            <div className="logo" style={{ marginBottom: 14 }}>
              <span className="logo-m">MANTRA</span>
              <span className="logo-t">TAXBOOKS</span>
            </div>
            <p style={{ fontSize: '.83rem', lineHeight: 1.7, color: '#A0A0A0', marginTop: 12 }}>Expert CA services for individuals, businesses, and enterprises across India.</p>
          </div>
          {[
            { title: 'Services', links: ['ITR Filing', 'GST Compliance', 'Company Registration', 'Accounting', 'Tax Advisory'] },
            { title: 'Portal', links: ['Client Login', 'Admin Login', 'Track Status', 'Upload Documents'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Disclaimer'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ color: '#E8E8E8', fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map((l) => (
                  <li key={l} style={{ marginBottom: 7 }}>
                    <span style={{ color: '#A0A0A0', fontSize: '.82rem', cursor: 'pointer' }}>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(192,192,192,.1)', paddingTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: '.78rem' }}>
          <span>© {new Date().getFullYear()} Mantra Taxbooks. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['fa-facebook', 'fa-twitter', 'fa-instagram', 'fa-linkedin'].map((icon) => (
              <span key={icon} style={{ cursor: 'pointer', transition: 'color .2s' }}>
                <i className={`fab ${icon}`} />
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* FLOAT BUTTONS */}
      <div className="float-btns">
        <a href="https://wa.me/919876543210" className="fb fb-wa" target="_blank" rel="noopener noreferrer" title="WhatsApp">
          <i className="fab fa-whatsapp" />
        </a>
        <button onClick={() => scrollTo('contact')} className="fb fb-cb" title="Request Callback">
          <i className="fas fa-phone-alt" />
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        .svc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(196,30,58,.1); border-color: rgba(196,30,58,.25); }
      `}</style>
    </>
  )
}
