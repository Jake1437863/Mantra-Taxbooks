'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'

export default function PublicCompanyRegistrationPage() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [inquiryModal, setInquiryModal] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({
    companyName: '',
    directorsCount: '2',
    state: '',
    phone: '',
    email: '',
    comments: '',
  })
  const [submitted, setSubmitted] = useState(false)

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

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setInquiryModal(false)
      setInquiryForm({ companyName: '', directorsCount: '2', state: '', phone: '', email: '', comments: '' })
    }, 2500)
  }

  const entityTypes = [
    {
      name: 'Private Limited Company',
      price: '10,000+',
      popular: true,
      badge: 'STARTER ALL-INCLUSIVE PACKAGE',
      desc: 'Most popular business structure in India for startups, tech ventures, and scalable businesses seeking funding.',
      features: [
        'Company Name Approval via SPICe+ Part A',
        'Digital Signature Certificates (DSC Class 3) for 2 Directors',
        'Director Identification Numbers (DIN) for 2 Directors',
        'Drafting of Memorandum & Articles of Association (MOA & AOA)',
        'Certificate of Incorporation (COI) with CIN issued by MCA',
        'Company PAN & TAN Generation',
        'Statutory Auditor ADT-1 Appointment Filing',
        'INC-20A Business Commencement Certificate Filing Assistance',
        'ESI & PF Registration',
        'Bank Current Account Opening Support',
        'Dedicated CA / CS Expert Assistance',
      ],
    },
    {
      name: 'Limited Liability Partnership (LLP)',
      price: '6,999+',
      popular: false,
      badge: 'PARTNERSHIP STRUCTURE',
      desc: 'Ideal for professional service providers, consultants, and family businesses looking for operational flexibility with limited liability.',
      features: [
        'RUN-LLP Name Reservation',
        '2 DSC Class 3 for Designated Partners',
        'DPIN Allocation for Designated Partners',
        'FiLLiP Incorporation Form Filing with MCA',
        'Certificate of Incorporation from MCA',
        'LLP Agreement Drafting & Form 3 Filing',
        'PAN & TAN for LLP',
        'Current Account Opening Support',
      ],
    },
    {
      name: 'One Person Company (OPC)',
      price: '7,999+',
      popular: false,
      badge: 'SOLO ENTREPRENEUR',
      desc: 'Perfect for single founders seeking corporate structure, limited liability, and full control over business operations.',
      features: [
        'MCA Name Approval for OPC',
        '1 DSC for Director + Nominee Consent Form',
        'DIN Allocation & SPICe+ Filing',
        'MOA & AOA tailored for One Person Company',
        'COI, PAN & TAN Generation',
        'Bank Current Account opening assistance',
      ],
    },
    {
      name: 'Section 8 Company (NGO / NPO)',
      price: '14,999+',
      popular: false,
      badge: 'NON-PROFIT ENTITY',
      desc: 'Formed for promoting commerce, art, science, sports, education, research, social welfare, or environmental protection.',
      features: [
        'Section 8 License Approval from MCA',
        'Name Approval for NGO / Foundation',
        '2 DSC Class 3 & DIN Allocation',
        'MOA & AOA Drafting for Charitable Objects',
        '12A & 80G Tax Exemption Consultation',
        'COI, PAN & TAN Generation',
      ],
    },
  ]

  const incorporationSteps = [
    { step: '01', title: 'Name Reservation (SPICe+ Part A)', desc: 'We conduct a comprehensive trademark & MCA database check and apply for name reservation with 2 proposed names.' },
    { step: '02', title: 'Digital Signatures (DSC Class 3)', desc: 'Class 3 Digital Signature Certificates are issued for all proposed directors for secure e-filing.' },
    { step: '03', title: 'SPICe+ Part B & Document Drafting', desc: 'Our legal team drafts the Memorandum of Association (MOA) and Articles of Association (AOA) tailored to your business objects.' },
    { step: '04', title: 'COI, PAN & TAN Issuance', desc: 'MCA issues the official Certificate of Incorporation (COI) along with Company PAN and TAN numbers.' },
    { step: '05', title: 'Bank Account & INC-20A Filing', desc: 'We assist in opening your zero-balance current account and file the INC-20A Commencement of Business declaration.' },
  ]

  const requiredDocuments = [
    {
      category: 'For Directors & Shareholders',
      items: [
        'PAN Card (Mandatory for Indian Nationals)',
        'Aadhaar Card / Voter ID / Passport / Driving License',
        'Passport Size Photograph',
        'Latest Bank Statement / Utility Bill (showing current address, not older than 2 months)',
      ],
    },
    {
      category: 'For Registered Office Address',
      items: [
        'Electricity Bill / Water Bill / Gas Bill of the premises (not older than 2 months)',
        'No Objection Certificate (NOC) from the property owner',
        'Rent Agreement (if rented premises)',
      ],
    },
  ]

  const comparisonTable = [
    { feature: 'Minimum Members', pvt: '2 Directors / 2 Shareholders', llp: '2 Designated Partners', opc: '1 Director / 1 Nominee' },
    { feature: 'Limited Liability Protection', pvt: 'Yes (Limited to Share Capital)', llp: 'Yes (Limited to Agreed Contribution)', opc: 'Yes (Limited to Shares)' },
    { feature: 'VC & Angel Funding Suitability', pvt: 'High (Preferred by Investors)', llp: 'Low (Debt / Loan funding preferred)', opc: 'Moderate (Can convert to Pvt Ltd)' },
    { feature: 'Annual Compliance Burden', pvt: 'Mandatory Audit & Board Meetings', llp: 'Lower (Audit required if turnover > ₹40L)', opc: 'Simplified Compliance' },
    { feature: 'Separate Legal Entity Status', pvt: 'Yes', llp: 'Yes', opc: 'Yes' },
  ]

  const faqs = [
    { q: 'How long does Private Limited Company Registration take?', a: 'Under normal MCA processing times, complete incorporation takes 7 to 10 working days after receiving all required digital signatures and documents.' },
    { q: 'What is included in the ₹10,000+ Starter Registration Plan?', a: 'It includes Name Approval, 2 Class-3 DSCs, 2 DINs, MOA & AOA drafting, MCA Incorporation Certificate (COI), PAN, TAN, ESI & PF registration, ADT-1 filing, and INC-20A assistance.' },
    { q: 'Do I need a commercial office space to register a company?', a: 'No, you can register a company at a residential address, home address, or rented property as long as utility bills and NOC are provided.' },
    { q: 'Is physical presence required at MCA office or our office?', a: 'No! The entire process is 100% online. You simply need to upload digital copies of documents and complete digital signature authorization.' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', color: '#E2E8F0', paddingBottom: 80, fontFamily: 'inherit' }}>
      {/* ── STICKY TOP NAV BAR WITH WORKING DROPDOWN ── */}
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
              <Link href="/services/company-registration" style={{ color: '#2563EB', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                Services <i className={`fas fa-chevron-down`} style={{ fontSize: '0.65rem', transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }} />
              </Link>
              {servicesOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: '#1C1C1C', border: '1px solid rgba(37,99,235,.4)', borderRadius: 10, padding: 6, minWidth: 240, boxShadow: '0 8px 32px rgba(0,0,0,.5)', zIndex: 2000 }} onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                  <Link href="/services/file-itr" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 7, textDecoration: 'none', color: '#E0E0E0' }}>
                    <i className="fas fa-file-invoice-dollar" style={{ color: '#60A5FA' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>File ITR</div>
                      <div style={{ fontSize: '0.72rem', color: '#888' }}>Why It's Needed &amp; CA Plans</div>
                    </div>
                  </Link>
                  <Link href="/services/company-registration" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 7, textDecoration: 'none', color: '#E0E0E0', background: 'rgba(37,99,235,0.15)' }}>
                    <i className="fas fa-building" style={{ color: '#60A5FA' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Company Registration</div>
                      <div style={{ fontSize: '0.72rem', color: '#888' }}>Pvt Ltd, LLP, OPC &amp; Contact</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <button onClick={() => setInquiryModal(true)} style={{ background: '#2563EB', color: '#FFF', padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              Free Name Verification
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 0' }}>
        {/* HERO BANNER (MATCHES IMAGE 1 SCREENSHOT SPECIFICATIONS) */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
            color: '#FFFFFF',
            borderRadius: 20,
            padding: '44px 36px',
            marginBottom: 32,
            boxShadow: '0 12px 36px rgba(29, 78, 216, 0.3)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '4px 16px',
              borderRadius: 20,
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: 1,
              marginBottom: 16,
            }}
          >
            Companies Act, 2013 · MCA Registered Process
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, margin: '0 0 12px 0', lineHeight: 1.15 }}>
            Private Limited Company Registration
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E0E7FF', maxWidth: 720, margin: '0 0 28px 0', lineHeight: 1.6 }}>
            Register your company in just 10 days with complete expert assistance — from name approval to incorporation certificate, PAN, TAN and beyond.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
            <button
              onClick={() => setInquiryModal(true)}
              style={{
                background: '#FFFFFF',
                color: '#1E40AF',
                padding: '12px 26px',
                borderRadius: 8,
                border: 'none',
                fontSize: '0.92rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              }}
            >
              Get Started Now
            </button>
            <a
              href="https://wa.me/919999999999?text=Hi%20Mantra%20Taxbooks,%20I%20want%20to%20register%20a%20Company."
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#25D366',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '0.85rem', color: '#DBEAFE', fontWeight: 600 }}>
            <span>✓ Registration in 10 days</span>
            <span>✓ Expert assistance</span>
            <span>✓ End-to-end filings</span>
          </div>
        </div>

        {/* ── FEATURED STARTER REGISTRATION PLAN (₹10,000+ MATCHING IMAGE 1) ── */}
        <div style={{ marginBottom: 44 }}>
          <div
            style={{
              background: '#0F172A',
              border: '2px solid #2563EB',
              borderRadius: 16,
              padding: '32px 36px',
              position: 'relative',
              boxShadow: '0 8px 32px rgba(37,99,235,0.2)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: -12,
                left: 36,
                background: '#2563EB',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 14px',
                borderRadius: 20,
                letterSpacing: 1,
              }}
            >
              ALL-INCLUSIVE STARTER PACKAGE
            </span>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                  Starter Registration Plan
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0 }}>
                  Company registration completed in 10 working days.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                  ₹10,000<span style={{ fontSize: '1.5rem', color: '#60A5FA' }}>+</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>
                  + Govt fees applicable additionally
                </div>
                <button
                  onClick={() => setInquiryModal(true)}
                  style={{
                    marginTop: 12,
                    background: '#2563EB',
                    color: '#FFFFFF',
                    padding: '8px 22px',
                    borderRadius: 6,
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 12,
                paddingTop: 20,
                borderTop: '1px solid #1E293B',
              }}
            >
              {[
                'Company Name approval',
                'DSC for 2 Directors',
                'MOA & AOA Drafting',
                'Incorporation certificate',
                'PAN + TAN Generation',
                'DIN for 2 Directors',
                'ESI & PF Registration',
                'ADT-1 (Auditor appointment)',
                'INC-20A (Business commencement)',
                'Dedicated CA Expert Assistance',
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <span style={{ color: '#22C55E', fontWeight: 'bold' }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ALL BUSINESS ENTITY TYPES & PRICING ── */}
        <div style={{ marginBottom: 50 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
            Choose Your Business Structure
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: 28 }}>
            Transparent pricing packages tailored for every scale of business incorporation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 20 }}>
            {entityTypes.map((ent, idx) => (
              <div
                key={idx}
                style={{
                  background: '#1E293B',
                  border: ent.popular ? '2px solid #2563EB' : '1px solid #334155',
                  borderRadius: 14,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#60A5FA', letterSpacing: 1, display: 'block', marginBottom: 8 }}>
                    {ent.badge}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>{ent.name}</h3>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>
                    ₹{ent.price}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: 16, lineHeight: 1.5 }}>{ent.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
                    {ent.features.map((f, i) => (
                      <li key={i} style={{ fontSize: '0.8rem', color: '#E2E8F0', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: '#22C55E' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setInquiryModal(true)}
                  style={{
                    width: '100%',
                    background: ent.popular ? '#2563EB' : '#334155',
                    color: '#FFFFFF',
                    padding: '10px',
                    borderRadius: 6,
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Select &amp; Register →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── STEP-BY-STEP MCA INCORPORATION PROCESS ── */}
        <div style={{ marginBottom: 50 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
            5-Step MCA Incorporation Process
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: 28 }}>
            How Mantra Taxbooks handles your company registration seamlessly from start to finish.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {incorporationSteps.map((s) => (
              <div key={s.step} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#60A5FA', marginBottom: 8 }}>{s.step}</div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 6px 0' }}>{s.title}</h4>
                <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MANDATORY DOCUMENTS CHECKLIST ── */}
        <div style={{ marginBottom: 50 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
            Documents Required for Registration
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: 24 }}>
            Digital scan copies required for submission (No hard copies needed).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {requiredDocuments.map((doc, idx) => (
              <div key={idx} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#60A5FA', margin: '0 0 14px 0' }}>{doc.category}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {doc.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.83rem', color: '#CBD5E1', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#2563EB' }}>📄</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── ENTITY COMPARISON TABLE ── */}
        <div style={{ marginBottom: 50 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
            Business Structure Comparison
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: 24 }}>
            Compare Private Limited vs LLP vs OPC to pick the right legal structure for your growth.
          </p>

          <div style={{ overflowX: 'auto', background: '#1E293B', border: '1px solid #334155', borderRadius: 12, padding: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: '#CBD5E1' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155', color: '#60A5FA', textAlign: 'left' }}>
                  <th style={{ padding: 12 }}>Feature</th>
                  <th style={{ padding: 12 }}>Private Limited</th>
                  <th style={{ padding: 12 }}>LLP</th>
                  <th style={{ padding: 12 }}>OPC</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: 12, fontWeight: 700, color: '#FFFFFF' }}>{row.feature}</td>
                    <td style={{ padding: 12 }}>{row.pvt}</td>
                    <td style={{ padding: 12 }}>{row.llp}</td>
                    <td style={{ padding: 12 }}>{row.opc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FREQUENTLY ASKED QUESTIONS ── */}
        <div style={{ marginBottom: 50 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: 6 }}>{faq.q}</div>
                <div style={{ fontSize: '0.83rem', color: '#94A3B8', lineHeight: 1.6 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FREE NAME VERIFICATION & REGISTRATION INQUIRY MODAL ── */}
      {inquiryModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, width: '100%', maxWidth: 500, padding: 32, position: 'relative' }}>
            <button
              onClick={() => setInquiryModal(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
              Free MCA Name Availability Search
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: '0 0 20px 0' }}>
              Enter your proposed company name to verify trademark &amp; MCA availability with our CA experts.
            </p>

            {submitted ? (
              <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22C55E', color: '#4ADE80', padding: 16, borderRadius: 8, textAlign: 'center', fontSize: '0.88rem' }}>
                ✓ Inquiry received! Our CS team will verify your company name and contact you within 30 minutes.
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: 4, fontWeight: 600 }}>Proposed Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Solutions Pvt Ltd"
                    value={inquiryForm.companyName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, companyName: e.target.value })}
                    style={{ width: '100%', background: '#0F172A', border: '1px solid #334155', borderRadius: 6, padding: '10px 12px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: 4, fontWeight: 600 }}>Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      style={{ width: '100%', background: '#0F172A', border: '1px solid #334155', borderRadius: 6, padding: '10px 12px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: 4, fontWeight: 600 }}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      style={{ width: '100%', background: '#0F172A', border: '1px solid #334155', borderRadius: 6, padding: '10px 12px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ background: '#2563EB', color: '#FFFFFF', padding: '12px', borderRadius: 6, border: 'none', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', marginTop: 8 }}
                >
                  Verify Name &amp; Get Consultation →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
