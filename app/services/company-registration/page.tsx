'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function PublicCompanyRegistrationPage() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [inquiryModal, setInquiryModal] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({ companyName: '', phone: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tabsRef = useRef<HTMLDivElement | null>(null)
  const tabLineRef = useRef<HTMLSpanElement | null>(null)

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
    }, 4000)
  }

  const handleServiceItemClick = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
      servicesTimeoutRef.current = null
    }
    setServicesOpen(false)
  }

  const sectionIds = ['overview', 'benefits', 'documents', 'requirements', 'process', 'compliance', 'comparison']

  useEffect(() => {
    const handleScroll = () => {
      const offset = 150
      let activeId = 'overview'
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          activeId = id
        }
      })
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 25) {
        activeId = sectionIds[sectionIds.length - 1]
      }
      setActiveTab(activeId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (tabsRef.current && tabLineRef.current) {
      const activeElement = tabsRef.current.querySelector<HTMLAnchorElement>(`a[href="#${activeTab}"]`)
      if (activeElement) {
        tabLineRef.current.style.left = `${activeElement.offsetLeft}px`
        tabLineRef.current.style.width = `${activeElement.offsetWidth}px`

        const tabs = tabsRef.current
        if (
          activeElement.offsetLeft < tabs.scrollLeft ||
          activeElement.offsetLeft + activeElement.offsetWidth > tabs.scrollLeft + tabs.clientWidth
        ) {
          tabs.scrollTo({ left: activeElement.offsetLeft - 40, behavior: 'smooth' })
        }
      }
    }
  }, [activeTab])

  const scrollToTab = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setActiveTab(id)
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -140
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setInquiryModal(false)
      setInquiryForm({ companyName: '', phone: '', email: '' })
    }, 2200)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070B14', color: '#F1F5F9', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}>
      
      {/* ── TOP NOTIFICATION TICKER ── */}
      <div style={{ background: 'linear-gradient(90deg, #1E3A8A, #1D4ED8, #0F172A)', borderBottom: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 16px', fontSize: '0.78rem', color: '#DBEAFE', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <span style={{ background: '#10B981', color: '#064E3B', padding: '2px 8px', borderRadius: 12, fontWeight: 900, fontSize: '0.68rem', textTransform: 'uppercase' }}>MCA REGISTERED</span>
        <span>Companies Act, 2013 Official Incorporation Portal — SPICe+ &amp; AGILE-PRO-S Support</span>
      </div>

      {/* ── TOP NAV BAR ── */}
      <nav style={{ background: 'rgba(7, 11, 20, 0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 28px', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
              M
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 900, letterSpacing: 1.5, fontSize: '0.95rem', lineHeight: 1 }}>MANTRA</span>
              <span style={{ color: '#60A5FA', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.72rem', lineHeight: 1.2 }}>TAXBOOKS</span>
            </div>
          </Link>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, transition: 'color 0.2s' }}>Home</Link>
            
            {/* SERVICES DROPDOWN */}
            <div style={{ position: 'relative', paddingTop: 4, paddingBottom: 4 }} onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
              <Link href="/services" style={{ color: '#60A5FA', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                Services <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem', transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }} />
              </Link>
              {servicesOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: '#0F172A', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 14, padding: 10, minWidth: 280, boxShadow: '0 16px 40px rgba(0,0,0,0.7)', zIndex: 2000 }} onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                  <Link href="/services/file-itr" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 10, textDecoration: 'none', color: '#CBD5E1' }}>
                    <i className="fas fa-file-invoice-dollar" style={{ color: '#60A5FA', fontSize: '1.2rem' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>File ITR Guide &amp; Mandates</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Rules, Docs &amp; Notice Triggers</div>
                    </div>
                  </Link>
                  <Link href="/services/company-registration" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 10, textDecoration: 'none', color: '#FFFFFF', background: 'rgba(59,130,246,0.16)', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <i className="fas fa-building" style={{ color: '#60A5FA', fontSize: '1.2rem' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Company Registration</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Pvt Ltd, LLP &amp; OPC Compliance</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <button onClick={() => setInquiryModal(true)} style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', padding: '9px 20px', borderRadius: 10, border: 'none', fontSize: '0.88rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,99,235,0.4)', transition: 'all 0.2s' }}>
              Inquire Now
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse at 50% 0%, #1E293B 0%, #070B14 80%)', padding: '70px 28px 60px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(37, 99, 235, 0.12)', border: '1px solid rgba(59, 130, 246, 0.35)', color: '#60A5FA', padding: '6px 18px', borderRadius: 30, fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 22 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            Companies Act, 2013 · MCA Registered Process
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px 0', lineHeight: 1.15, letterSpacing: '-1px' }}>
            Private Limited <span style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Company Registration</span>
          </h1>
          
          <p style={{ color: '#94A3B8', fontSize: '1.15rem', maxWidth: 840, margin: '0 auto 38px auto', lineHeight: 1.7, fontWeight: 400 }}>
            Register your company in just 10 days with complete expert CA assistance — from name approval to incorporation certificate, PAN, TAN, MOA, AOA, and beyond.
          </p>

          <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 38 }}>
            <button
              onClick={() => setInquiryModal(true)}
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#FFFFFF',
                padding: '16px 36px',
                borderRadius: 12,
                border: 'none',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(37,99,235,0.45)',
              }}
            >
              Start Registration <i className="fas fa-arrow-right" />
            </button>

            <a
              href="#pricing"
              onClick={(e) => scrollToTab(e, 'pricing')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#FFFFFF',
                padding: '16px 30px',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '1rem',
              }}
            >
              View Package Details
            </a>
          </div>

          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.92rem', color: '#60A5FA', fontWeight: 700 }}>
            <div>✓ Registration in 10 Days</div>
            <div>✓ Expert CA Assistance</div>
            <div>✓ End-to-End Filings</div>
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" style={{ padding: '60px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-block', background: 'rgba(37, 99, 235, 0.14)', border: '1px solid rgba(59, 130, 246, 0.35)', color: '#60A5FA', padding: '5px 16px', borderRadius: 30, fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14 }}>
            INCORPORATION PACKAGE
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px 0' }}>All-Inclusive Starter Package</h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', margin: 0 }}>Transparent pricing. Government fees of ₹10,000+ applicable additionally.</p>
        </div>

        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ background: '#0F172A', border: '2px solid #2563EB', borderRadius: 20, padding: 36, boxShadow: '0 12px 36px rgba(37,99,235,0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#2563EB', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 900, padding: '4px 16px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              Most Popular Starter
            </div>
            
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 6px 0' }}>Pvt Ltd Starter</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: '0 0 20px 0' }}>Complete MCA company incorporation in 10 days</p>

            <div style={{ paddingBottom: 20, borderBottom: '1px solid #1E293B', marginBottom: 20 }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#3B82F6' }}>₹10,000+</span>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', marginLeft: 8 }}>+ Govt Fees</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Company Name Approval (RUN/SPICe+ Part A)',
                'DSC for 2 Directors',
                'MOA & AOA Drafting',
                'Incorporation Certificate',
                'PAN + TAN Allotment',
                'DIN for 2 Directors',
                'ESI Registration',
                'PF Registration',
                'ADT-1 (Auditor appointment)',
                'INC-20A (Business commencement)',
                'Dedicated CA Assistance',
              ].map((item, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <i className="fas fa-circle-check" style={{ color: '#10B981', fontSize: '0.85rem' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setInquiryModal(true)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                color: '#FFFFFF',
                padding: '14px',
                borderRadius: 12,
                border: 'none',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
              }}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* ── STICKY SECTION TAB BAR ── */}
      <div style={{ position: 'sticky', top: 68, zIndex: 900, background: '#0F172A', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 6px 24px rgba(0,0,0,0.6)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
          <div ref={tabsRef} style={{ display: 'flex', gap: 28, overflowX: 'auto', position: 'relative', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span ref={tabLineRef} style={{ position: 'absolute', bottom: 0, height: 3, background: '#3B82F6', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', borderRadius: '3px 3px 0 0' }} />
            
            {[
              { id: 'overview', label: 'Overview', icon: 'fa-eye' },
              { id: 'benefits', label: 'Benefits', icon: 'fa-gem' },
              { id: 'documents', label: 'Documents', icon: 'fa-folder-tree' },
              { id: 'requirements', label: 'Requirements', icon: 'fa-list-check' },
              { id: 'process', label: 'Process', icon: 'fa-diagram-project' },
              { id: 'compliance', label: 'Compliances', icon: 'fa-scale-balanced' },
              { id: 'comparison', label: 'Company vs LLP', icon: 'fa-code-compare' },
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => scrollToTab(e, tab.id)}
                style={{
                  padding: '18px 4px',
                  color: activeTab === tab.id ? '#60A5FA' : '#94A3B8',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <i className={`fas ${tab.icon}`} /> {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CANVAS ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 28px 90px' }}>

        {/* OVERVIEW */}
        <section id="overview" style={{ scrollMarginTop: 150, marginBottom: 80 }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 14px 0', letterSpacing: '-0.6px' }}>
            What is a Private Limited Company (Pvt Ltd)?
          </h2>
          <div style={{ background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1.5px solid rgba(59, 130, 246, 0.45)', borderRadius: 16, padding: '26px 32px', fontSize: '1.05rem', lineHeight: 1.7, color: '#DBEAFE' }}>
            A private limited company (Pvt Ltd) is a separate legal entity registered under the <strong style={{ color: '#FFF' }}>Companies Act, 2013</strong>, offering limited liability protection to its members. It restricts share transfers, keeping ownership within a trusted group while providing the credibility and structure of a registered corporate entity.
          </div>
        </section>

        {/* BENEFITS */}
        <section id="benefits" style={{ scrollMarginTop: 150, marginBottom: 80 }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 14px 0', letterSpacing: '-0.6px' }}>
            Benefits of Company Registration
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', margin: '0 0 32px 0' }}>Why thousands of founders choose the Private Limited structure.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 22 }}>
            {[
              { num: '1', title: 'Limited Liability Protection', desc: 'Shareholders need not repay debts from personal assets — unlike partnership and proprietorship where personal assets are at risk.' },
              { num: '2', title: 'Perpetual Succession', desc: 'A company has continuous existence independent of its founders. Transfer of shareholding ensures seamless business continuity.' },
              { num: '3', title: 'Access to Capital & VC Funding', desc: 'Institutional investors almost always require a corporate structure. Issue new shares or share classes to raise angel/VC capital.' },
              { num: '4', title: 'Strategic Tax Planning', desc: 'Concessional tax rates (15% for new manufacturing, 22% for existing companies) offer better tax efficiency than individual brackets.' },
              { num: '5', title: 'Seamless Transfer of Ownership', desc: 'Ownership is divided into shares. Transferring control is simply executing a share transfer deed without retitling assets.' },
              { num: '6', title: 'Startup India & Govt Support', desc: 'Eligible for tax exemptions, funding support, faster patent examination, and Make in India subsidies.' },
            ].map((card) => (
              <div key={card.num} style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: 16, padding: 26, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: 14 }}>
                  {card.num}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0' }}>{card.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENTS */}
        <section id="documents" style={{ scrollMarginTop: 150, marginBottom: 80 }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 14px 0', letterSpacing: '-0.6px' }}>
            Documents Required for Company Registration
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', margin: '0 0 32px 0' }}>Keep these ready for a smooth, delay-free incorporation.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 26 }}>
            <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: 20, padding: 30 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#60A5FA', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #1E293B' }}>
                For Directors &amp; Shareholders
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Passport-sized photograph (recent, clear)',
                  'PAN Card (mandatory for Indian citizens)',
                  'Identity Proof: Aadhaar, Passport, Voter ID or DL',
                  'Residential Address Proof (< 60 days): utility bill, bank statement',
                  'Digital Signature Certificate (DSC)',
                  'Director Identification Number (DIN)',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className="fas fa-circle-check" style={{ color: '#10B981', fontSize: '0.85rem' }} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: 20, padding: 30 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#60A5FA', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #1E293B' }}>
                For Registered Office Address
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Address Proof (< 60 days): electricity or water bill',
                  'No Objection Certificate (NOC) from property owner',
                  'Tenancy / Lease Agreement or property ownership deed',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className="fas fa-circle-check" style={{ color: '#10B981', fontSize: '0.85rem' }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>

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
              <li><Link href="/services">GST Compliance</Link></li>
              <li><Link href="/services">TDS Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services/company-registration">Pricing</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@demandassociatesllp.com">info@demandassociatesllp.com</a></li>
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>© 2026 Mantra Taxbooks — D E M &amp; Associates LLP. All rights reserved.</span>
          <span>CA Services | Tax Filing | GST | ROC</span>
        </div>
      </footer>

      {/* INQUIRY MODAL */}
      {inquiryModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: 24, padding: 36, maxWidth: 480, width: '100%', position: 'relative' }}>
            <button onClick={() => setInquiryModal(false)} style={{ position: 'absolute', top: 22, right: 22, background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 8 }}>Inquire Company Registration</h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: 24 }}>Enter your details to receive expert CA incorporation guidance.</p>

            {submitted ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', color: '#34D399', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                ✓ Inquiry received! Our team will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#E2E8F0', marginBottom: 6 }}>Proposed Company Name</label>
                  <input type="text" required style={{ width: '100%', padding: '12px 14px', background: '#070B14', border: '1px solid #1E293B', borderRadius: 10, color: '#FFF' }} placeholder="My Brand Private Limited" value={inquiryForm.companyName} onChange={(e) => setInquiryForm({ ...inquiryForm, companyName: e.target.value })} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#E2E8F0', marginBottom: 6 }}>Email Address</label>
                  <input type="email" required style={{ width: '100%', padding: '12px 14px', background: '#070B14', border: '1px solid #1E293B', borderRadius: 10, color: '#FFF' }} placeholder="founder@company.com" value={inquiryForm.email} onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#E2E8F0', marginBottom: 6 }}>Phone Number</label>
                  <input type="tel" required style={{ width: '100%', padding: '12px 14px', background: '#070B14', border: '1px solid #1E293B', borderRadius: 10, color: '#FFF' }} placeholder="+91 98765 43210" value={inquiryForm.phone} onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', border: 'none', borderRadius: 10, fontWeight: 900, cursor: 'pointer' }}>Submit Inquiry</button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
