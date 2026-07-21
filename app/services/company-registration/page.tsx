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
    }, 5000)
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
      const yOffset = -130
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
    }, 2500)
  }

  return (
    <div style={{ background: '#f7f9fc', color: '#1f2937', minHeight: '100vh', fontFamily: "'Segoe UI', system-ui, -apple-system, Arial, sans-serif" }}>
      {/* ── HEADER ── */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e3e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: '1.35rem', fontWeight: 800, color: '#0e3a9c' }}>
            Mantra <span style={{ color: '#1a56db' }}>Taxbooks</span>
          </Link>

          <ul style={{ display: 'flex', gap: 26, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
            <li>
              <Link href="/" style={{ textDecoration: 'none', color: '#5b6472', fontSize: '0.95rem', fontWeight: 500 }}>
                Home
              </Link>
            </li>
            <li
              style={{ position: 'relative', paddingTop: 4, paddingBottom: 4 }}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <Link
                href="/services"
                style={{ textDecoration: 'none', color: '#1a56db', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}
              >
                Services <i className={`fas fa-chevron-down`} style={{ fontSize: '0.65rem', transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }} />
              </Link>
              {servicesOpen && (
                <div
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#ffffff',
                    border: '1px solid #e3e8f0',
                    borderRadius: 10,
                    boxShadow: '0 12px 30px rgba(16,42,115,.15)',
                    minWidth: 230,
                    padding: '8px 0',
                    listStyle: 'none',
                    zIndex: 100,
                  }}
                >
                  <Link href="/services/file-itr" onClick={handleServiceItemClick} style={{ display: 'block', padding: '10px 18px', color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>
                    File ITR
                  </Link>
                  <Link href="/services/company-registration" onClick={handleServiceItemClick} style={{ display: 'block', padding: '10px 18px', color: '#1a56db', background: '#e8effd', textDecoration: 'none', fontWeight: 700 }}>
                    Company Registration
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link href="/login" style={{ textDecoration: 'none', color: '#5b6472', fontSize: '0.95rem', fontWeight: 500 }}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a2a73 0%, #1a56db 100%)', color: '#ffffff', padding: '72px 0 84px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.3)', padding: '6px 16px', borderRadius: 100, fontSize: '0.85rem', marginBottom: 18 }}>
            Companies Act, 2013 · MCA Registered Process
          </span>
          <h1 style={{ fontSize: '2.6rem', lineHeight: 1.2, marginBottom: 14, fontWeight: 800 }}>
            Private Limited Company Registration
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: 640, margin: '0 auto 28px', opacity: 0.92, lineHeight: 1.6 }}>
            Register your company in just 10 days with complete expert assistance — from name approval to incorporation certificate, PAN, TAN and beyond.
          </p>
          <a
            href="#pricing"
            onClick={(e) => scrollToTab(e, 'pricing')}
            style={{
              display: 'inline-block',
              padding: '14px 34px',
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              background: '#ffffff',
              color: '#0e3a9c',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            }}
          >
            Get Started
          </a>

          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', marginTop: 34, flexWrap: 'wrap', fontSize: '0.95rem' }}>
            <div>✓ Registration in 10 days</div>
            <div>✓ Expert assistance</div>
            <div>✓ End-to-end filings</div>
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 10, color: '#0a2a73', fontWeight: 800 }}>
            Our Package
          </h2>
          <p style={{ textAlign: 'center', color: '#5b6472', maxWidth: 680, margin: '0 auto 44px', fontSize: '1rem' }}>
            Transparent pricing. Government fees of ₹10,000+ applicable additionally.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, maxWidth: 420, margin: '0 auto' }}>
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #1a56db',
                borderRadius: 14,
                padding: '34px 30px',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(26,86,219,.15)',
              }}
            >
              <h3 style={{ fontSize: '1.3rem', color: '#0a2a73', marginBottom: 4, fontWeight: 700 }}>Starter</h3>
              <p style={{ color: '#5b6472', fontSize: '0.92rem', marginBottom: 14 }}>Company registration in 10 days</p>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1f2937', marginBottom: 20 }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0a2a73' }}>₹10,000+</span>{' '}
                <small style={{ color: '#5b6472', fontWeight: 500 }}>Govt fees</small>
              </p>
              <ul style={{ listStyle: 'none', marginBottom: 24, padding: 0 }}>
                {[
                  'Company Name approval',
                  'DSC for 2 Directors',
                  'MOA & AOA',
                  'Incorporation certificate',
                  'PAN + TAN',
                  'DIN for 2 Directors',
                  'ESI Registration',
                  'PF Registration',
                  'ADT-1 (Auditor appointment)',
                  'INC-20A (Business commencement)',
                  'Expert assistance',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: '7px 0 7px 26px',
                      position: 'relative',
                      fontSize: '0.94rem',
                      borderBottom: '1px dashed #e3e8f0',
                      color: '#1f2937',
                    }}
                  >
                    <span style={{ position: 'absolute', left: 0, color: '#0e9f6e', fontWeight: 800 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setInquiryModal(true)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  background: '#1a56db',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY SECTION TAB BAR (VAKILSEARCH STYLE) ── */}
      <nav style={{ position: 'sticky', top: 66, background: '#ffffff', borderBottom: '1px solid #e3e8f0', zIndex: 40, boxShadow: '0 2px 8px rgba(16,42,115,.06)' }}>
        <div ref={tabsRef} style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 20px', maxWidth: 1140, margin: '0 auto', position: 'relative' }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'benefits', label: 'Benefits' },
            { id: 'documents', label: 'Documents' },
            { id: 'requirements', label: 'Requirements' },
            { id: 'process', label: 'Process' },
            { id: 'compliance', label: 'Compliances' },
            { id: 'comparison', label: 'Company vs LLP' },
          ].map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={(e) => scrollToTab(e, tab.id)}
              style={{
                whiteSpace: 'nowrap',
                padding: '14px 16px',
                textDecoration: 'none',
                color: activeTab === tab.id ? '#1a56db' : '#5b6472',
                fontWeight: 600,
                fontSize: '0.92rem',
                transition: 'color 0.2s',
              }}
            >
              {tab.label}
            </a>
          ))}
          <span
            ref={tabLineRef}
            style={{
              position: 'absolute',
              bottom: 0,
              height: 3,
              background: '#1a56db',
              borderRadius: '3px 3px 0 0',
              transition: 'left 0.3s ease, width 0.3s ease',
              left: 0,
              width: 0,
            }}
          />
        </div>
      </nav>

      {/* ── OVERVIEW SECTION ── */}
      <section id="overview" style={{ background: '#ffffff', padding: '64px 0', scrollMarginTop: 126 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 24, color: '#0a2a73', fontWeight: 800 }}>
            What is a Private Limited Company (Pvt Ltd)?
          </h2>
          <div
            style={{
              background: '#e8effd',
              borderLeft: '5px solid #1a56db',
              borderRadius: '0 14px 14px 0',
              padding: '28px 32px',
              maxWidth: 860,
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: '#1f2937',
            }}
          >
            A private limited company (Pvt Ltd) is a separate legal entity registered under the <strong>Companies Act, 2013</strong>, offering limited liability protection to its members. It restricts share transfers, keeping ownership within a trusted group while providing the credibility and structure of a registered company.
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section id="benefits" style={{ padding: '64px 0', scrollMarginTop: 126 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 10, color: '#0a2a73', fontWeight: 800 }}>
            Benefits of Company Registration
          </h2>
          <p style={{ textAlign: 'center', color: '#5b6472', maxWidth: 680, margin: '0 auto 44px', fontSize: '1rem' }}>
            Why thousands of founders choose the Private Limited structure.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 22 }}>
            {[
              { num: '1', title: 'Limited Liability Protection', desc: 'If the company takes a loan and suffers genuine business losses, shareholders need not repay from personal assets — unlike partnership and proprietorship, where personal assets are at risk.' },
              { num: '2', title: 'Perpetual Succession', desc: 'A company has continuous existence independent of its founders. If a shareholder or director leaves, becomes incapacitated, or passes away, the company does not dissolve.' },
              { num: '3', title: 'Easier Access to Capital & Funding', desc: 'Institutional investors almost always require a corporate structure. Issue new shares or share classes to bring on angel investors or VCs, and gain credibility with banks for large credit lines.' },
              { num: '4', title: 'Strategic Tax Planning', desc: 'Companies enjoy better tax efficiencies than individual tax brackets — 15% tax rate for manufacturing companies and 22% for other companies.' },
              { num: '5', title: 'Seamless Transfer of Ownership', desc: 'Ownership is broken into shares. Transferring control is simply a share transfer deed and a registry update — no messy retitling of physical assets individually.' },
              { num: '6', title: 'Eligibility for Government Schemes', desc: 'Startup India: tax exemptions, funding support and easier compliance. Make in India: incentives, subsidies and promotional support for manufacturing businesses.' },
              { num: '7', title: 'Ease of Ownership Transfer', desc: 'Ownership can be transferred easily by selling shares, making it simple to attract new investors or transition leadership.' },
              { num: '8', title: 'Global Opportunities', desc: 'Incorporation enables entry into international markets, attracts Foreign Direct Investment (FDI), and establishes a credible presence globally.' },
              { num: '9', title: 'Compliance & Legal Safeguards', desc: 'Structured compliance — annual filings, financial disclosures and legal obligations — reduces disputes and ensures smoother business operations.' },
            ].map((card) => (
              <div key={card.num} style={{ background: '#ffffff', border: '1px solid #e3e8f0', borderRadius: 14, padding: 26, boxShadow: '0 2px 8px rgba(16,42,115,.04)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 10, background: '#e8effd', color: '#1a56db', fontWeight: 800, marginBottom: 12 }}>
                  {card.num}
                </span>
                <h4 style={{ fontSize: '1.08rem', marginBottom: 8, color: '#0a2a73', fontWeight: 700 }}>{card.title}</h4>
                <p style={{ fontSize: '0.93rem', color: '#5b6472', margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS SECTION ── */}
      <section id="documents" style={{ background: '#ffffff', padding: '64px 0', scrollMarginTop: 126 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 10, color: '#0a2a73', fontWeight: 800 }}>
            Documents Required for Company Registration
          </h2>
          <p style={{ textAlign: 'center', color: '#5b6472', maxWidth: 680, margin: '0 auto 44px', fontSize: '1rem' }}>
            Keep these ready for a smooth, delay-free incorporation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
            <div style={{ background: '#ffffff', border: '1px solid #e3e8f0', borderRadius: 14, padding: 26 }}>
              <h4 style={{ color: '#0e3a9c', marginBottom: 14, fontSize: '1.05rem', paddingBottom: 10, borderBottom: '2px solid #e8effd', fontWeight: 700 }}>
                For Directors &amp; Shareholders
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Passport-sized photograph (recent, colour, clear)',
                  'PAN Card (mandatory for all Indian citizens)',
                  'Identity Proof (any one): Aadhaar Card, Passport, Voter ID or Driver\'s Licence',
                  'Residential Address Proof (not older than 60 days): utility bill, bank statement, or phone bill',
                  'Digital Signature Certificate (DSC) to sign documents on the MCA portal',
                  'Director Identification Number (DIN) for each proposed director',
                  'Foreign nationals: notarized & apostilled identity and address proofs',
                ].map((item, idx) => (
                  <li key={idx} style={{ padding: '6px 0 6px 24px', position: 'relative', fontSize: '0.92rem', color: '#1f2937' }}>
                    <span style={{ position: 'absolute', left: 4, color: '#1a56db', fontWeight: 'bold' }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e3e8f0', borderRadius: 14, padding: 26 }}>
              <h4 style={{ color: '#0e3a9c', marginBottom: 14, fontSize: '1.05rem', paddingBottom: 10, borderBottom: '2px solid #e8effd', fontWeight: 700 }}>
                For Registered Office Address
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Proof of Address (within 60 days): electricity bill, water bill or property tax receipt',
                  'No Objection Certificate (NOC) from the property owner',
                  'Tenancy or Ownership Proof: registered rental agreement (leased) or ownership deed (owned)',
                ].map((item, idx) => (
                  <li key={idx} style={{ padding: '6px 0 6px 24px', position: 'relative', fontSize: '0.92rem', color: '#1f2937' }}>
                    <span style={{ position: 'absolute', left: 4, color: '#1a56db', fontWeight: 'bold' }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e3e8f0', borderRadius: 14, padding: 26 }}>
              <h4 style={{ color: '#0e3a9c', marginBottom: 14, fontSize: '1.05rem', paddingBottom: 10, borderBottom: '2px solid #e8effd', fontWeight: 700 }}>
                Company Formation Documents
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Memorandum of Association (MoA): legal name, registered office, capital structure and principal business activities',
                  'Articles of Association (AoA): internal rules, governance policies, director roles and shareholder rights',
                  'Director & Shareholder details: full name, date of birth, nationality, occupation and shareholding %',
                ].map((item, idx) => (
                  <li key={idx} style={{ padding: '6px 0 6px 24px', position: 'relative', fontSize: '0.92rem', color: '#1f2937' }}>
                    <span style={{ position: 'absolute', left: 4, color: '#1a56db', fontWeight: 'bold' }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS SECTION ── */}
      <section id="requirements" style={{ padding: '64px 0', scrollMarginTop: 126 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 10, color: '#0a2a73', fontWeight: 800 }}>
            Requirements for Pvt Ltd Registration
          </h2>
          <p style={{ textAlign: 'center', color: '#5b6472', maxWidth: 680, margin: '0 auto 44px', fontSize: '1rem' }}>
            Meeting these requirements is essential before filing the SPICe+ form for incorporation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 20 }}>
            {[
              { title: 'Minimum Two Directors', desc: 'At least two directors are required, and at least one must be a resident of India (staying 182+ days in the financial year).' },
              { title: 'Minimum Two Shareholders', desc: 'Directors and shareholders can be the same individuals. Both individuals and corporate entities are eligible to be shareholders.' },
              { title: 'Registered Office Address', desc: 'A valid Indian address with proof of address and a NOC from the property owner.' },
              { title: 'Digital Signature Certificate (DSC)', desc: 'All proposed directors need a valid DSC to digitally sign incorporation documents.' },
              { title: 'Director Identification Number (DIN)', desc: 'Each director must obtain a DIN — a unique ID issued by the Ministry of Corporate Affairs.' },
              { title: 'Unique Company Name', desc: 'The name must not be identical or similar to existing companies or trademarks.' },
            ].map((req, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid #e3e8f0', borderRadius: 14, padding: 26, boxShadow: '0 2px 8px rgba(16,42,115,.04)' }}>
                <h4 style={{ fontSize: '1.08rem', marginBottom: 8, color: '#0a2a73', fontWeight: 700 }}>{req.title}</h4>
                <p style={{ fontSize: '0.93rem', color: '#5b6472', margin: 0, lineHeight: 1.6 }}>{req.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <section id="process" style={{ background: '#ffffff', padding: '64px 0', scrollMarginTop: 126 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 10, color: '#0a2a73', fontWeight: 800 }}>
            Company Registration Process — Step by Step
          </h2>
          <p style={{ textAlign: 'center', color: '#5b6472', maxWidth: 680, margin: '0 auto 44px', fontSize: '1rem' }}>
            A systematic process governed by the Ministry of Corporate Affairs (MCA), filed with the Registrar of Companies (RoC) under the Companies Act, 2013.
          </p>

          <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
            {[
              {
                num: '1',
                title: 'Choose the Right Business Structure',
                body: (
                  <>
                    <p style={{ margin: 0, fontSize: '0.93rem', color: '#5b6472' }}>Your business type determines liability, funding access and regulatory obligations:</p>
                    <ul style={{ margin: '8px 0 0 18px', fontSize: '0.93rem', color: '#5b6472' }}>
                      <li><strong>Private Limited (Pvt Ltd):</strong> ideal for startups; limited liability and equity funding eligibility</li>
                      <li><strong>LLP:</strong> partnership-style governance with corporate shielding</li>
                      <li><strong>One Person Company (OPC):</strong> for solo founders seeking legal separation</li>
                      <li><strong>Public Limited (PLC):</strong> for large ventures raising public capital</li>
                      <li><strong>Sole Proprietorship / Partnership:</strong> basic compliance; no Company Registration Certificate</li>
                    </ul>
                  </>
                ),
              },
              {
                num: '2',
                title: 'Get a Digital Signature Certificate (DSC)',
                time: '⏱ 1–2 working days',
                body: <p style={{ margin: 0, fontSize: '0.93rem', color: '#5b6472' }}>Enables directors to sign electronic documents filed with the MCA. Apply via licensed authorities like eMudhra, Sify or Ncode with PAN, address proof and photograph.</p>,
              },
              {
                num: '3',
                title: 'Obtain Director Identification Number (DIN)',
                time: '⏱ 1 working day',
                body: <p style={{ margin: 0, fontSize: '0.93rem', color: '#5b6472' }}>Mandatory under Section 153 of the Companies Act, 2013 — applied through the SPICe+ form or a separate DIN application on the MCA portal.</p>,
              },
              {
                num: '4',
                title: 'Choose & Reserve a Unique Company Name',
                time: '⏱ 1–2 working days',
                body: <p style={{ margin: 0, fontSize: '0.93rem', color: '#5b6472' }}>Ensure the name is unique, legally permissible and trademark-safe. Check availability via the MCA RUN (Reserve Unique Name) service, complying with Companies (Incorporation) Rules, 2014. Approved names are reserved for 20 days.</p>,
              },
              {
                num: '5',
                title: 'Draft Incorporation Documents (MoA & AoA)',
                body: <p style={{ margin: 0, fontSize: '0.93rem', color: '#5b6472' }}><strong>MoA</strong> states business objectives and operational scope; <strong>AoA</strong> governs internal procedures, director roles and voting rights. Both must be signed digitally by all subscribers and directors.</p>,
              },
              {
                num: '6',
                title: 'File the SPICe+ Form on the MCA Portal',
                body: <p style={{ margin: 0, fontSize: '0.93rem', color: '#5b6472' }}>SPICe+ integrates name reservation (Part A) and incorporation (Part B). Attach MoA &amp; AoA, DIN &amp; DSC, ID/address proofs, registered office documents, and INC-9 &amp; DIR-2 declarations. Also file <strong>AGILE-PRO-S</strong> for GST registration, EPFO &amp; ESIC enrolment, Professional Tax (state-specific) and bank account setup.</p>,
              },
              {
                num: '7',
                title: 'Pay Statutory Fees',
                body: <p style={{ margin: 0, fontSize: '0.93rem', color: '#5b6472' }}>Pay applicable government fees on the MCA portal based on your authorized share capital and company type.</p>,
              },
              {
                num: '8',
                title: 'Receive the Company Registration Certificate',
                body: <p style={{ margin: 0, fontSize: '0.93rem', color: '#5b6472' }}>Once the Registrar of Companies approves your SPICe+ application, your Certificate of Incorporation is issued — your company is officially born.</p>,
              },
            ].map((step, idx, arr) => (
              <div key={step.num} style={{ display: 'flex', gap: 20, paddingBottom: 30, position: 'relative' }}>
                {idx !== arr.length - 1 && (
                  <span style={{ position: 'absolute', left: 21, top: 46, bottom: 0, width: 2, background: '#e3e8f0' }} />
                )}
                <div style={{ flex: '0 0 44px', height: 44, borderRadius: '50%', background: '#1a56db', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.05rem', zIndex: 1 }}>
                  {step.num}
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e3e8f0', borderRadius: 14, padding: '20px 24px', flex: 1 }}>
                  <h4 style={{ color: '#0a2a73', marginBottom: 6, fontSize: '1.05rem', fontWeight: 700 }}>{step.title}</h4>
                  {step.body}
                  {step.time && (
                    <span style={{ display: 'inline-block', marginTop: 10, background: '#e8effd', color: '#0e3a9c', fontSize: '0.8rem', fontWeight: 700, padding: '3px 12px', borderRadius: 100 }}>
                      {step.time}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCES SECTION ── */}
      <section id="compliance" style={{ padding: '64px 0', scrollMarginTop: 126 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 10, color: '#0a2a73', fontWeight: 800 }}>
            Post-Incorporation Compliances
          </h2>
          <p style={{ textAlign: 'center', color: '#5b6472', maxWidth: 680, margin: '0 auto 44px', fontSize: '1rem' }}>
            Mandatory compliances — including INC-20A, AOC-4, MGT-7 and DIR-3 KYC — keep your company legally active and penalty-free.
          </p>

          <div style={{ overflowX: 'auto', background: '#ffffff', border: '1px solid #e3e8f0', borderRadius: 14 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={{ background: '#0a2a73', color: '#ffffff', textAlign: 'left', padding: '14px 18px', fontSize: '0.92rem' }}>Timeline</th>
                  <th style={{ background: '#0a2a73', color: '#ffffff', textAlign: 'left', padding: '14px 18px', fontSize: '0.92rem' }}>Key Compliances</th>
                  <th style={{ background: '#0a2a73', color: '#ffffff', textAlign: 'left', padding: '14px 18px', fontSize: '0.92rem' }}>Detailed Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: 'Within 30 Days', key: 'Initial Setup & Governance', actions: ['Opening of bank account', 'Holding first board meeting', 'Appointment of first auditor', 'Disclosure of directors\' interest', 'Preparation of notice, agenda & minutes', 'Printing of letterhead & statutory registers'] },
                  { time: 'Within 60 Days', key: 'Capital & Share Compliance', actions: ['Deposit of subscription money (as per MOA)', 'Allotment of shares', 'Issuance of share certificates', 'Payment of stamp duty to state authorities'] },
                  { time: 'Within 180 Days', key: 'Commencement of Business', actions: ['Filing of INC-20A (Declaration for Commencement of Business) with ROC'] },
                  { time: 'Quarterly', key: 'Ongoing Board Compliance', actions: ['Holding board meetings as per Companies Act requirements'] },
                  { time: 'Ongoing', key: 'Statutory Records & Accounts', actions: ['Maintenance of statutory registers — members, charges, KMP, loans & advances', 'Maintenance of minutes book (board & general meetings)', 'Proper maintenance of books of accounts'] },
                  { time: 'Annually', key: 'Financial & Regulatory Filings', actions: ['Conducting Annual General Meeting (AGM)', 'Adoption of financial statements', 'Filing of Income Tax Return', 'Filing of AOC-4 & MGT-7 with ROC', 'Filing of Director KYC'] },
                  { time: 'Within 30 Days of AGM', key: 'Annual ROC Filings', actions: ['Filing of annual return & list of shareholders', 'Board report', 'Forms MGT-7, AOC-4 & ADT-1'] },
                ].map((row, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 1 ? '#f7f9fc' : '#ffffff' }}>
                    <td style={{ padding: '14px 18px', borderTop: '1px solid #e3e8f0', fontSize: '0.92rem', fontWeight: 700, color: '#0e3a9c', whiteSpace: 'nowrap' }}>{row.time}</td>
                    <td style={{ padding: '14px 18px', borderTop: '1px solid #e3e8f0', fontSize: '0.92rem', color: '#1f2937' }}>{row.key}</td>
                    <td style={{ padding: '14px 18px', borderTop: '1px solid #e3e8f0', fontSize: '0.92rem', color: '#5b6472' }}>
                      <ul style={{ margin: '0 0 0 16px', padding: 0 }}>
                        {row.actions.map((act, i) => (
                          <li key={i} style={{ margin: '2px 0' }}>{act}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── COMPARISON SECTION ── */}
      <section id="comparison" style={{ background: '#ffffff', padding: '64px 0', scrollMarginTop: 126 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 10, color: '#0a2a73', fontWeight: 800 }}>
            Private Limited Company vs LLP
          </h2>
          <p style={{ textAlign: 'center', color: '#5b6472', maxWidth: 680, margin: '0 auto 44px', fontSize: '1rem' }}>
            Not sure which structure suits your business? Here's a detailed side-by-side comparison to help you decide.
          </p>

          <div style={{ overflowX: 'auto', background: '#ffffff', border: '1px solid #e3e8f0', borderRadius: 14 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
              <thead>
                <tr>
                  <th style={{ background: '#0a2a73', color: '#ffffff', padding: '14px 18px', fontSize: '0.92rem', textAlign: 'left' }}>Aspect</th>
                  <th style={{ background: '#0a2a73', color: '#ffffff', padding: '14px 18px', fontSize: '0.92rem', textAlign: 'left' }}>Private Limited Company (Pvt Ltd)</th>
                  <th style={{ background: '#0a2a73', color: '#ffffff', padding: '14px 18px', fontSize: '0.92rem', textAlign: 'left' }}>Limited Liability Partnership (LLP)</th>
                  <th style={{ background: '#0a2a73', color: '#ffffff', padding: '14px 18px', fontSize: '0.92rem', textAlign: 'left' }}>In Simple Terms</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Governing Law', 'Companies Act, 2013', 'LLP Act, 2008', 'Company follows stricter corporate rules; LLP is more partnership-like but with protection.'],
                  ['Best Suited For', 'Startups aiming to scale, tech companies, manufacturing, businesses seeking funding/investors', 'Professional services (CA, lawyers, consultants), small–medium firms, family businesses', 'Company for big growth ambitions; LLP for simpler professional or collaborative work.'],
                  ['Minimum Members', '2 members', '2 partners', 'Both need at least 2 people to start.'],
                  ['Maximum Members', '200 shareholders', 'No upper limit', 'LLP is more flexible if you want to add many partners.'],
                  ['Ownership', 'Shareholders own the company (via shares)', 'Partners own the LLP (via capital contribution & agreement)', 'In a Company, owners (shareholders) can be different from managers (directors); in an LLP, partners are usually both.'],
                  ['Management', 'Board of Directors manages; formal structure with meetings', 'Partners manage directly; flexible as per LLP Agreement', 'Company has a more formal hierarchy; LLP is like a flexible team.'],
                  ['Liability', 'Limited to unpaid share capital', 'Limited to agreed contribution (partners protected from other partners\' wrongful acts)', 'Both protect personal assets, but details vary slightly.'],
                  ['Perpetual Succession', 'Yes (exists even if owners change)', 'Yes', 'Business continues even if members leave or die.'],
                  ['Compliance & Filings', 'High: mandatory annual audits, board meetings, multiple ROC filings (AOC-4, MGT-7 etc.), DIR-3 KYC', 'Lower: fewer filings (Form 8, Form 11); audit only if turnover > ₹40 lakh or capital > ₹25 lakh', 'LLP is simpler & cheaper for small businesses; Company has more paperwork.'],
                  ['Statutory Audit', 'Mandatory every year', 'Mandatory only above thresholds; otherwise not required', 'Company always needs a CA audit; LLP often skips it.'],
                  ['Taxation', 'Corporate tax (22% under new regime or 25–30%); dividends taxable in hands of shareholders', 'Taxed as partnership (flat ~30% + surcharge/cess); profits passed to partners\' personal returns', 'Similar overall, but LLP avoids double taxation on dividends; Company is better for some incentives.'],
                  ['Raising Funds', 'Easy: issue shares to investors, venture capital, angels; better for equity funding', 'Difficult: no shares; relies on loans and partner contributions; less attractive to big investors', 'Company is preferred if you want external investment.'],
                  ['Transfer of Ownership', 'Easy: transfer shares via proper procedure', 'More complex: requires changes in LLP Agreement & filings', 'Selling part of a Company is simpler.'],
                  ['Incorporation Cost & Time', 'Slightly higher (~₹7,000–15,000+); takes 1–2 weeks', 'Lower (~₹5,000–10,000); faster', 'LLP is cheaper & quicker to start.'],
                  ['Public Disclosure', 'High: many documents public on MCA portal', 'Lower: LLP Agreement is private', 'Company details are more transparent to outsiders.'],
                  ['Conversion', 'Can convert to LLP or Public Ltd', 'Can convert to Company', 'Flexible to switch later.'],
                  ['Penalties for Non-Compliance', 'Higher penalties and stricter enforcement', 'Relatively lower', 'Company has more risk if you miss rules.'],
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid #e3e8f0' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0e3a9c', fontSize: '0.92rem' }}>{row[0]}</td>
                    <td style={{ padding: '14px 18px', fontSize: '0.92rem', background: 'rgba(26,86,219,.045)', color: '#1f2937' }}>{row[1]}</td>
                    <td style={{ padding: '14px 18px', fontSize: '0.92rem', color: '#1f2937' }}>{row[2]}</td>
                    <td style={{ padding: '14px 18px', fontSize: '0.92rem', color: '#5b6472', fontStyle: 'italic' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #1a56db 0%, #0a2a73 100%)',
              color: '#ffffff',
              textAlign: 'center',
              borderRadius: 14,
              padding: '52px 30px',
            }}
          >
            <h2 style={{ fontSize: '1.9rem', marginBottom: 10, fontWeight: 800 }}>Ready to Register Your Company?</h2>
            <p style={{ opacity: 0.9, marginBottom: 24, fontSize: '1.05rem' }}>
              Get your Private Limited Company incorporated in 10 days with complete expert assistance.
            </p>
            <button
              onClick={() => setInquiryModal(true)}
              style={{
                display: 'inline-block',
                padding: '14px 34px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: '1rem',
                background: '#ffffff',
                color: '#0e3a9c',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              }}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a2a73', color: '#cdd8f5', textAlign: 'center', padding: '28px 0', fontSize: '0.9rem', marginTop: 64 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          © 2026 Mantra Taxbooks. All rights reserved. | Company Registration Services in India
        </div>
      </footer>

      {/* ── INQUIRY MODAL ── */}
      {inquiryModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#ffffff', borderRadius: 16, width: '100%', maxWidth: 480, padding: 32, position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
            <button
              onClick={() => setInquiryModal(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#5b6472', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              ✕
            </button>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0a2a73', marginBottom: 6 }}>
              Get Started with Company Registration
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#5b6472', marginBottom: 20 }}>
              Enter your details for free MCA name verification and CA assistance.
            </p>

            {submitted ? (
              <div style={{ background: '#e8effd', border: '1px solid #1a56db', color: '#0e3a9c', padding: 16, borderRadius: 8, textAlign: 'center', fontWeight: 600 }}>
                ✓ Thank you! Our experts will get in touch with you shortly.
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>Proposed Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mantra Tech Solutions Pvt Ltd"
                    value={inquiryForm.companyName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, companyName: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e3e8f0', borderRadius: 6, fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit phone number"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e3e8f0', borderRadius: 6, fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e3e8f0', borderRadius: 6, fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: '#1a56db', color: '#ffffff', padding: '12px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', marginTop: 6 }}
                >
                  Submit Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
