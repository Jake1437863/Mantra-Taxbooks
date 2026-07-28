'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function FileITRDetailsPage() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('mandatory-filing')
  const [callbackModal, setCallbackModal] = useState<null | 'call' | 'consultation'>(null)
  const [modalForm, setModalForm] = useState({ name: '', email: '', phone: '', incomeType: 'salary' })
  const [modalSuccess, setModalSuccess] = useState(false)

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

  const sectionIds = ['mandatory-filing', 'required-documents', 'benefits', 'why-choose-us', 'notice-triggers']

  useEffect(() => {
    const handleScroll = () => {
      const offset = 160
      let activeId = 'mandatory-filing'
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          activeId = id
        }
      })
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 30) {
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
          tabs.scrollTo({ left: activeElement.offsetLeft - 30, behavior: 'smooth' })
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

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModalSuccess(true)
    setTimeout(() => {
      setModalSuccess(false)
      setCallbackModal(null)
      setModalForm({ name: '', email: '', phone: '', incomeType: 'salary' })
    }, 2200)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#090D16', color: '#E2E8F0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* ── TOP NAV BAR ── */}
      <nav style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(51, 65, 85, 0.6)', padding: '14px 24px', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'linear-gradient(135deg, #1E40AF, #3B82F6)', color: '#FFF', fontWeight: 900, padding: '5px 12px', borderRadius: 6, letterSpacing: 2, fontSize: '0.88rem', boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)' }}>MANTRA</span>
            <span style={{ color: '#CBD5E1', fontWeight: 800, padding: '4px 6px', letterSpacing: 2, fontSize: '0.88rem' }}>TAXBOOKS</span>
          </Link>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, transition: 'color 0.2s' }}>Home</Link>
            
            {/* SERVICES DROPDOWN */}
            <div style={{ position: 'relative', paddingTop: 4, paddingBottom: 4 }} onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
              <Link href="/services" style={{ color: '#60A5FA', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                Services <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem', transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }} />
              </Link>
              {servicesOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: '#0F172A', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 12, padding: 8, minWidth: 260, boxShadow: '0 12px 36px rgba(0,0,0,0.6)', zIndex: 2000 }} onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                  <Link href="/services/file-itr" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 8, textDecoration: 'none', color: '#FFFFFF', background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <i className="fas fa-file-invoice-dollar" style={{ color: '#60A5FA', fontSize: '1.1rem' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>File ITR Guide &amp; Mandates</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Rules, Docs &amp; Notice Triggers</div>
                    </div>
                  </Link>
                  <Link href="/services/company-registration" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 8, textDecoration: 'none', color: '#CBD5E1' }}>
                    <i className="fas fa-building" style={{ color: '#60A5FA', fontSize: '1.1rem' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Company Registration</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Pvt Ltd, LLP &amp; OPC Compliance</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <button onClick={() => setCallbackModal('consultation')} style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', padding: '8px 18px', borderRadius: 8, border: 'none', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)', transition: 'all 0.2s' }}>
              Consult Senior CA
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER ── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at 50% 0%, #1E293B 0%, #090D16 100%)', padding: '60px 24px 50px', borderBottom: '1px solid #1E293B' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 1000, height: 350, background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37, 99, 235, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60A5FA', padding: '6px 16px', borderRadius: 30, fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 18 }}>
            <i className="fas fa-shield-halved" /> Income Tax Return (ITR) Complete Guide &amp; Filing
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.18, letterSpacing: '-0.8px' }}>
            Income Tax Return (ITR) Filing &amp; <span style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CA Consultation</span>
          </h1>
          
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: 840, margin: '0 0 32px 0', lineHeight: 1.65, fontWeight: 400 }}>
            Stay 100% tax compliant, reclaim your TDS refunds, carry forward market losses, and safeguard yourself against automated AIS scrutiny notices with expert Chartered Accountant verification.
          </p>

          {/* 3 CORE PILLARS BANNER (FROM PDF HEADER) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 36 }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                <i className="fas fa-user-check" />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>CA Reviewed Filing</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.78rem', margin: '2px 0 0 0' }}>100% precision &amp; compliance check</p>
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #059669, #10B981)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
                <i className="fas fa-chart-pie" />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Tax Planning Report</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.78rem', margin: '2px 0 0 0' }}>Legally minimize upcoming tax liability</p>
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(139,92,246,0.3)' }}>
                <i className="fas fa-heart-pulse" />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Tax Health Report</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.78rem', margin: '2px 0 0 0' }}>Evaluate investments &amp; savings</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => setCallbackModal('consultation')}
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: 10,
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 6px 20px rgba(37,99,235,0.4)',
              }}
            >
              Request CA Consultation <i className="fas fa-arrow-right" />
            </button>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20assistance%20with%20my%20Income%20Tax%20Return%20(ITR)%20Filing."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#10B981',
                color: '#FFFFFF',
                padding: '14px 24px',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 6px 20px rgba(16,185,129,0.3)',
              }}
            >
              <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }} /> Instant WhatsApp Assistance
            </a>
          </div>
        </div>
      </section>

      {/* ── STICKY NAVIGATION TABS BAR ── */}
      <div style={{ position: 'sticky', top: 61, zIndex: 900, background: '#0B132B', borderBottom: '1px solid #1E293B', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div ref={tabsRef} style={{ display: 'flex', gap: 24, overflowX: 'auto', position: 'relative', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span ref={tabLineRef} style={{ position: 'absolute', bottom: 0, height: 3, background: '#3B82F6', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', borderRadius: '3px 3px 0 0' }} />
            
            <a href="#mandatory-filing" onClick={(e) => scrollToTab(e, 'mandatory-filing')} style={{ padding: '16px 4px', color: activeTab === 'mandatory-filing' ? '#60A5FA' : '#94A3B8', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-gavel" /> Mandatory Criteria
            </a>
            <a href="#required-documents" onClick={(e) => scrollToTab(e, 'required-documents')} style={{ padding: '16px 4px', color: activeTab === 'required-documents' ? '#60A5FA' : '#94A3B8', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-folder-open" /> Required Documents
            </a>
            <a href="#benefits" onClick={(e) => scrollToTab(e, 'benefits')} style={{ padding: '16px 4px', color: activeTab === 'benefits' ? '#60A5FA' : '#94A3B8', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-gift" /> Benefits &amp; Advantages
            </a>
            <a href="#why-choose-us" onClick={(e) => scrollToTab(e, 'why-choose-us')} style={{ padding: '16px 4px', color: activeTab === 'why-choose-us' ? '#60A5FA' : '#94A3B8', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-award" /> Why Mantra Taxbooks
            </a>
            <a href="#notice-triggers" onClick={(e) => scrollToTab(e, 'notice-triggers')} style={{ padding: '16px 4px', color: activeTab === 'notice-triggers' ? '#60A5FA' : '#94A3B8', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-triangle-exclamation" style={{ color: '#F59E0B' }} /> Notice Triggers &amp; AIS
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ════════════════════════════════════════════════════════════
            SECTION 1: WHEN INCOME TAX RETURN FILING IS MANDATORY
           ════════════════════════════════════════════════════════════ */}
        <section id="mandatory-filing" style={{ scrollMarginTop: 150, marginBottom: 72 }}>
          <div style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>
            GOVERNMENT COMPLIANCE MANDATE
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
            When Income Tax Return (ITR) Filing is Mandatory
          </h2>
          
          {/* CRITICAL PDF HIGHLIGHT ALERT BOX */}
          <div style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.1) 100%)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 12, padding: '18px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
            <i className="fas fa-exclamation-circle" style={{ color: '#F87171', fontSize: '1.6rem', flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#FCA5A5', fontSize: '1rem', fontWeight: 700, margin: 0 }}>Important Statutory Provision</h4>
              <p style={{ color: '#FECACA', fontSize: '0.92rem', margin: '4px 0 0 0', fontWeight: 500 }}>
                Income tax return filing is <strong style={{ textDecoration: 'underline' }}>mandatory</strong> even with <strong style={{ color: '#FFF' }}>Nil tax liability</strong> and <strong style={{ color: '#FFF' }}>zero refund</strong> if you meet any of the specified criteria below.
              </p>
            </div>
          </div>

          {/* 8 MANDATORY CONDITIONS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
            
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 14, padding: 24, transition: 'transform 0.2s', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#3B82F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-wallet" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', padding: '3px 10px', borderRadius: 12 }}>Threshold &gt; ₹4 Lakhs</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>Total Income Exceeds Exemption Limit</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                When total income exceeds the basic exemption limit (&gt; ₹4 Lakhs under New Tax Regime).
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#3B82F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-building-columns" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', padding: '3px 10px', borderRadius: 12 }}>Current Account</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>Current Account Deposits &gt; ₹1 Crore</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                Deposits over Rs. 1 crore in one or more current accounts in a financial year.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#3B82F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-plane-departure" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', padding: '3px 10px', borderRadius: 12 }}>Foreign Travel</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>Overseas Travel Expenses &gt; ₹2 Lakh</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                Foreign travel expenses exceeding Rs. 2 lakh for yourself or any other person.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#3B82F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-bolt" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', padding: '3px 10px', borderRadius: 12 }}>Electricity Bills</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>Electricity Bills Exceeding ₹1 Lakh</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                Payment of electricity consumption bills aggregating over Rs. 1 lakh in a year.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#3B82F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-store" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', padding: '3px 10px', borderRadius: 12 }}>Business Turnover</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>Business Turnover Above ₹60 Lakh</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                Total sales, turnover, or gross receipts from business exceeding Rs. 60 lakh.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#3B82F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-user-doctor" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', padding: '3px 10px', borderRadius: 12 }}>Profession Receipts</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>Professional Receipts Above ₹10 Lakh</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                Gross receipts from profession (doctor, CA, consultant, engineer) exceeding Rs. 10 lakh.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#3B82F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-receipt" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', padding: '3px 10px', borderRadius: 12 }}>TDS/TCS Deducted</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>TDS/TCS Aggregating ₹25,000+</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                Total TDS/TCS deducted is Rs. 25,000 or more (Rs. 50,000 or more for senior citizens).
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#3B82F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-piggy-bank" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#93C5FD', padding: '3px 10px', borderRadius: 12 }}>Savings Deposit</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>Savings Deposits Exceeding ₹50 Lakh</h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                Aggregate deposits in one or more savings bank accounts exceeding Rs. 50 lakh.
              </p>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2: DOCUMENTS REQUIRED FOR INCOME TAX RETURN FILING
           ════════════════════════════════════════════════════════════ */}
        <section id="required-documents" style={{ scrollMarginTop: 150, marginBottom: 72 }}>
          <div style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60A5FA', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>
            FILING PREPARATION CHECKLIST
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
            Documents Required for Income Tax Return Filing
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: '0 0 32px 0' }}>
            Gather the required documents based on your sources of income to ensure smooth, error-free filing.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
            
            {/* SALARY */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #1E40AF)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-briefcase" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>1. Salary Income</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: 10 }}>
                  <i className="fas fa-file-invoice" style={{ color: '#60A5FA', marginTop: 3, fontSize: '0.95rem' }} />
                  <div>
                    <strong style={{ color: '#FFF', fontSize: '0.9rem', display: 'block' }}>Form 16</strong>
                    <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Part A &amp; Part B provided by employer</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: 10 }}>
                  <i className="fas fa-file-lines" style={{ color: '#60A5FA', marginTop: 3, fontSize: '0.95rem' }} />
                  <div>
                    <strong style={{ color: '#FFF', fontSize: '0.9rem', display: 'block' }}>Monthly Salary Slips</strong>
                    <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>For calculating allowance exemptions &amp; HRA</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <i className="fas fa-percent" style={{ color: '#60A5FA', fontSize: '0.95rem' }} />
                    <strong style={{ color: '#FFF', fontSize: '0.9rem' }}>Section 80 Deductions Proofs</strong>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <li style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '0.75rem' }} /> School fee receipts</li>
                    <li style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '0.75rem' }} /> Life insurance premium certificate</li>
                    <li style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '0.75rem' }} /> Health Insurance premium certificate (80D)</li>
                    <li style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '0.75rem' }} /> NPS contribution certificate (80CCD)</li>
                    <li style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '0.75rem' }} /> ELSS Investment statement</li>
                    <li style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '0.75rem' }} /> Certificate of Fixed Deposit for 5 years</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* HOUSE PROPERTY */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #059669, #047857)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-house-chimney" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>2. House Property</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
                {[
                  { title: 'House property address', icon: 'fa-location-dot' },
                  { title: 'Monthly Rentals income details', icon: 'fa-money-bill-wave' },
                  { title: 'Owner of the house property details', icon: 'fa-user-gear' },
                  { title: 'Loan statements for home loan', icon: 'fa-building-columns' },
                  { title: 'Home Loan Interest Certificate (Sec 24)', icon: 'fa-certificate' },
                  { title: 'Loan sanction letter from bank', icon: 'fa-file-signature' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: 10 }}>
                    <i className={`fas ${item.icon}`} style={{ color: '#34D399', fontSize: '0.9rem', width: 18 }} />
                    <span style={{ color: '#E2E8F0', fontSize: '0.88rem', fontWeight: 600 }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CAPITAL GAINS */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-chart-line" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>3. Capital Gains</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: 10 }}>
                  <strong style={{ color: '#A78BFA', fontSize: '0.9rem', display: 'block', marginBottom: 4 }}>Shares, Mutual Funds &amp; Crypto P&amp;L</strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: 0 }}>
                    Capital gain and P&amp;L statement from brokers like <strong style={{ color: '#FFF' }}>Groww, Upstox, Zerodha</strong>, etc.
                  </p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: 10 }}>
                  <strong style={{ color: '#A78BFA', fontSize: '0.9rem', display: 'block', marginBottom: 4 }}>Immovable Property</strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: 0 }}>
                    Registered Sale deed &amp; purchase deed of plot, land, or house.
                  </p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: 10 }}>
                  <strong style={{ color: '#A78BFA', fontSize: '0.9rem', display: 'block', marginBottom: 4 }}>Precious Metals</strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: 0 }}>
                    Gold &amp; Silver sale and purchase invoices/documents.
                  </p>
                </div>
              </div>
            </div>

            {/* F&O & CRYPTO */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #D97706, #B45309)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-coins" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>4. F &amp; O , Crypto Trading</h3>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: 10 }}>
                <i className="fas fa-arrow-trend-up" style={{ color: '#FBBF24', fontSize: '1.2rem', marginBottom: 8, display: 'block' }} />
                <strong style={{ color: '#FFF', fontSize: '0.95rem', display: 'block', marginBottom: 6 }}>F&amp;O, Crypto Tax &amp; P&amp;L Statements</strong>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  Consolidated financial tax report &amp; profit &amp; loss statements from registered stock exchanges &amp; crypto platforms.
                </p>
              </div>
            </div>

            {/* BUSINESS & PROFESSION */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-store" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>5. Business &amp; Profession Income</h3>
              </div>

              <span style={{ display: 'inline-block', background: 'rgba(59,130,246,0.15)', color: '#60A5FA', padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, marginBottom: 14 }}>
                Non-Audit / Presumptive Income (Sec 44AD / 44ADA)
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <i className="fas fa-check" style={{ color: '#10B981' }} />
                  <div>
                    <strong style={{ color: '#FFF', fontSize: '0.88rem', display: 'block' }}>If GST Registered</strong>
                    <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Turnover fetched directly from GST Returns</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <i className="fas fa-check" style={{ color: '#10B981' }} />
                  <div>
                    <strong style={{ color: '#FFF', fontSize: '0.88rem', display: 'block' }}>If NOT GST Registered</strong>
                    <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Self-declared Turnover and bank receipts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FOREIGN ASSETS */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #0284C7, #0369A1)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-globe" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>6. Foreign Assets</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: 10 }}>
                  <i className="fas fa-passport" style={{ color: '#38BDF8', fontSize: '0.9rem' }} />
                  <span style={{ color: '#E2E8F0', fontSize: '0.88rem', fontWeight: 600 }}>1042S form / W-2 (US income tax form)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: 10 }}>
                  <i className="fas fa-file-contract" style={{ color: '#38BDF8', fontSize: '0.9rem' }} />
                  <span style={{ color: '#E2E8F0', fontSize: '0.88rem', fontWeight: 600 }}>Foreign Broker Account Statement</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: 10 }}>
                  <i className="fas fa-sack-dollar" style={{ color: '#38BDF8', fontSize: '0.9rem' }} />
                  <span style={{ color: '#E2E8F0', fontSize: '0.88rem', fontWeight: 600 }}>Foreign Dividend &amp; Interest Statement</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3: BENEFITS OF FILING INCOME TAX RETURN (ITR)
           ════════════════════════════════════════════════════════════ */}
        <section id="benefits" style={{ scrollMarginTop: 150, marginBottom: 72 }}>
          <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34D399', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>
            KEY ADVANTAGES AT A GLANCE
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
            Benefits of Filing Income Tax Return (ITR)
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: '0 0 32px 0' }}>
            Filing your ITR is not just a statutory burden—it unlocks key financial privileges and safeguards your wealth.
          </p>

          {/* STUNNING TABLE / COMPARISON MATRIX */}
          <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', marginBottom: 56 }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 650 }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderBottom: '2px solid #334155' }}>
                    <th style={{ padding: '18px 24px', color: '#60A5FA', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, width: '32%' }}>Category / Benefit</th>
                    <th style={{ padding: '18px 24px', color: '#60A5FA', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Key Advantage &amp; Practical Application</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr style={{ borderBottom: '1px solid #334155', transition: 'background 0.2s' }}>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                          <i className="fas fa-file-contract" />
                        </div>
                        <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>Income &amp; Credit Proof</strong>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      Primary credential required for home, auto, and personal loan approvals as well as high-limit credit cards.
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid #334155', background: 'rgba(15, 23, 42, 0.4)' }}>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(14, 165, 233, 0.15)', color: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                          <i className="fas fa-plane" />
                        </div>
                        <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>Visa Processing</strong>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      Mandatory requirement by foreign embassies (US, UK, Canada, Schengen) as proof of financial standing in India.
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                          <i className="fas fa-hand-holding-dollar" />
                        </div>
                        <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>TDS Tax Refunds</strong>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      The only legal mechanism to reclaim excess tax deducted at source (TDS) on salary, FD interest, or contracts.
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid #334155', background: 'rgba(15, 23, 42, 0.4)' }}>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                          <i className="fas fa-chart-line-down" />
                        </div>
                        <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>Carry Forward Losses</strong>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      Enables carry-forward of stock market, business, and capital losses to offset future profits for up to 8 years.
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                          <i className="fas fa-shield-heart" />
                        </div>
                        <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>High Term Insurance</strong>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      Required by insurance companies to verify financial capacity for high sum assured policies (₹1 Crore+).
                    </td>
                  </tr>

                  <tr style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
                    <td style={{ padding: '20px 24px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(239, 68, 68, 0.15)', color: '#F87171', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                          <i className="fas fa-scale-balanced" />
                        </div>
                        <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>Legal Compliance</strong>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      Protects against late fees (up to ₹5,000 under Sec 234F), penal interest, and income tax scrutiny notices.
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4: WHY CHOOSE MANTRA TAX BOOKS?
           ════════════════════════════════════════════════════════════ */}
        <section id="why-choose-us" style={{ scrollMarginTop: 150, marginBottom: 72 }}>
          <div style={{ display: 'inline-block', background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#A78BFA', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>
            THE MANTRA TAXBOOKS ADVANTAGE
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
            Why Choose Mantra Tax Books?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: '0 0 32px 0' }}>
            Experience 100% precision, proactive planning, and end-to-end peace of mind with our senior Chartered Accountants.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, position: 'relative' }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 20, boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}>
                <i className="fas fa-user-shield" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>CA-Reviewed Accuracy</h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                Every return is thoroughly vetted by a Chartered Accountant to ensure 100% precision and compliance.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, position: 'relative' }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'linear-gradient(135deg, #059669, #10B981)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 20, boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
                <i className="fas fa-headset" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>Dedicated Expert Support</h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                Get 1-on-1 guidance from a dedicated tax specialist throughout your entire filing journey.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, position: 'relative' }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 20, boxShadow: '0 4px 14px rgba(139,92,246,0.3)' }}>
                <i className="fas fa-notes-medical" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>Tax Health Report</h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                Receive a personalized evaluation of your current investments and discover untapped tax saving opportunities.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, position: 'relative' }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'linear-gradient(135deg, #D97706, #F59E0B)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 20, boxShadow: '0 4px 14px rgba(245,158,11,0.3)' }}>
                <i className="fas fa-lightbulb" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>Proactive Tax Planning</h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                Get a customized tax structure designed to legally minimize your tax liability for the upcoming year.
              </p>
            </div>

            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 28, position: 'relative', gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ width: 54, height: 54, borderRadius: 12, background: 'linear-gradient(135deg, #DC2626, #EF4444)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0, boxShadow: '0 4px 14px rgba(239,68,68,0.3)' }}>
                  <i className="fas fa-gavel" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>Full Notice Handling</h3>
                  <p style={{ fontSize: '0.92rem', color: '#CBD5E1', margin: 0, lineHeight: 1.65 }}>
                    Filing is just the start—if you receive a tax notice, our senior CAs step in to handle all correspondence, draft responses, and resolve proceedings with the tax authorities.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 5: INCOME TAX NOTICE TRIGGERS & AIS SCRUTINY
           ════════════════════════════════════════════════════════════ */}
        <section id="notice-triggers" style={{ scrollMarginTop: 150, marginBottom: 50 }}>
          <div style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>
            AUTOMATED SCRUTINY &amp; COMPLIANCE
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
            Income Tax Notice Triggers When You Don't File ITR
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: '0 0 28px 0' }}>
            The Income Tax Department uses automated computer algorithms to cross-verify transactions reported via AIS/SFT against non-filers.
          </p>

          {/* QUICK TRIGGER SUMMARY STRIP (FROM PDF PAGE 4 SUMMARY) */}
          <div style={{ background: 'linear-gradient(135deg, #1E293B, #0F172A)', border: '1px solid #334155', borderRadius: 14, padding: '20px 24px', marginBottom: 40 }}>
            <h4 style={{ color: '#60A5FA', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 14px 0' }}>
              <i className="fas fa-bolt" /> Direct Triggers for Non-Filers Notice:
            </h4>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                'Salary is more than 4 lakhs (Exceeding Basic Exemption)',
                'Sale of shares, mutual funds & ETFs',
                'Sale of land or building',
                'Trading in crypto / VDAs',
                'Trading in Futures & Options (F&O)'
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#FCA5A5', padding: '8px 14px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="fas fa-triangle-exclamation" style={{ color: '#F87171', fontSize: '0.78rem' }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 24 }}>
            Top Income Tax Notice Triggers for Non-Filers
          </h3>

          {/* 3 DEEP DIVE CATEGORIES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 48 }}>
            
            {/* 1. INCOME & CAPITAL GAINS */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-sack-dollar" />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>1. Income &amp; Capital Gains Triggers</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                
                <div style={{ borderLeft: '3px solid #3B82F6', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Salary Income Exceeding Basic Exemption Limit
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Earning over <strong style={{ color: '#FFF' }}>₹2.50 Lakh</strong> (Old Regime - under 60 yrs), <strong style={{ color: '#FFF' }}>₹3.00 Lakh</strong> (Old Regime - Senior Citizens), or <strong style={{ color: '#FFF' }}>₹3.00 Lakh / ₹4.00 Lakh</strong> (New Regime threshold / basic exemption limit) makes ITR filing mandatory.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #3B82F6', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Sale of Shares, Mutual Funds &amp; ETFs
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Every sell trade generates a capital gains transaction report filed directly with the Income Tax Department by AMCs and Depositories (CDSL/NSDL).
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #3B82F6', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Sale of Immovable Property (Land/Building)
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Property transactions of <strong style={{ color: '#FFF' }}>₹30 Lakh or more</strong> (SFT reporting limit by Registrar) or <strong style={{ color: '#FFF' }}>₹50 Lakh or more</strong> (where 1% TDS applies under Section 194-IA) are reported directly to the tax portal.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #3B82F6', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Crypto &amp; Virtual Digital Assets (VDAs)
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    1% TDS under Section 194S (threshold ₹10,000 / ₹50,000) tracks every buy/sell trade across crypto exchanges, automatically flagging unreported gains.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #3B82F6', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Futures &amp; Options (F&amp;O) &amp; Intraday Trading
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Stock exchanges report total F&amp;O trading turnover and intraday volumes directly to the tax department, regardless of whether you made a profit or loss.
                  </p>
                </div>

              </div>
            </div>

            {/* 2. BANKING & CASH TRANSACTIONS */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #059669, #10B981)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-landmark" />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>2. Banking &amp; Cash Transaction Triggers (SFT)</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                
                <div style={{ borderLeft: '3px solid #10B981', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Current Account Cash Activity
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Aggregating cash deposits or withdrawals of <strong style={{ color: '#FFF' }}>₹50 Lakh or more</strong> in a financial year.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #10B981', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Savings &amp; Fixed Deposits
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Cash deposits of <strong style={{ color: '#FFF' }}>₹10 Lakh or more</strong> in savings accounts, or fresh term deposits (FDs/RDs) of <strong style={{ color: '#FFF' }}>₹10 Lakh or more</strong> across banks or post offices.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #10B981', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    High Credit Card Spends
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Bill payments exceeding <strong style={{ color: '#FFF' }}>₹10 Lakh</strong> via online/bank transfer or <strong style={{ color: '#FFF' }}>₹1 Lakh</strong> in cash in a financial year.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #10B981', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    High-Value Bank Drafts
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Purchasing bank drafts, pay orders, or prepaid instruments using cash exceeding <strong style={{ color: '#FFF' }}>₹10 Lakh</strong> in a financial year.
                  </p>
                </div>

              </div>
            </div>

            {/* 3. INVESTMENT & EXPENSE TRIGGERS */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #334155' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #D97706, #F59E0B)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className="fas fa-credit-card" />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>3. Investment &amp; Expense Triggers (SFT &amp; AIS)</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                
                <div style={{ borderLeft: '3px solid #F59E0B', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    High-Value Investments
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Investing <strong style={{ color: '#FFF' }}>₹10 Lakh or more</strong> in shares, mutual funds, debentures, or bonds in a single financial year.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #F59E0B', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Foreign Travel Expenditure
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Spending more than <strong style={{ color: '#FFF' }}>₹2 Lakh</strong> on overseas travel for yourself or anyone else (under the 7th proviso to Sec 139(1)).
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #F59E0B', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    Electricity Bills
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Paying electricity charges exceeding <strong style={{ color: '#FFF' }}>₹1 Lakh</strong> in a financial year (under the 7th proviso to Sec 139(1)).
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #F59E0B', paddingLeft: 16 }}>
                  <strong style={{ color: '#FFF', fontSize: '0.98rem', display: 'block', marginBottom: 4 }}>
                    TDS/TCS Deducted
                  </strong>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    Having <strong style={{ color: '#FFF' }}>₹25,000 or more</strong> in TDS/TCS deducted (or <strong style={{ color: '#FFF' }}>₹50,000 or more</strong> for senior citizens) reflects active financial transactions that expect a corresponding ITR.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* CRITICAL TAKEAWAY WARNING BOX (FROM PDF PAGE 5 TAKEAWAY) */}
          <div style={{ background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(153, 27, 27, 0.2) 100%)', border: '2px solid #EF4444', borderRadius: 16, padding: '28px 32px', boxShadow: '0 12px 32px rgba(239, 68, 68, 0.2)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: '#DC2626', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 4px 14px rgba(220,38,38,0.5)' }}>
                <i className="fas fa-triangle-exclamation" />
              </div>
              <div>
                <h4 style={{ color: '#FCA5A5', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Key Takeaway: Automated AIS Scrutiny Warning
                </h4>
                <p style={{ color: '#FEE2E2', fontSize: '0.98rem', margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  The Income Tax Department matches data from <strong style={{ color: '#FFF', textDecoration: 'underline' }}>AIS (Annual Information Statement)</strong>, banks, brokers, and registrars using your PAN. If your AIS shows any of the above transactions and no ITR is filed, an automated non-compliance notice under <strong style={{ color: '#FFF', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: 4 }}>Section 142(1)</strong> or <strong style={{ color: '#FFF', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: 4 }}>Section 148</strong> is generated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA CARD ── */}
        <section style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 20, padding: '44px 36px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
          
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
            Protect Yourself Against Tax Notices &amp; Maximize Your Refunds Today
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: 640, margin: '0 auto 28px', lineHeight: 1.6 }}>
            Our Chartered Accountants evaluate your financial profile, draft error-free returns, and provide complete tax planning reports.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCallbackModal('consultation')}
              style={{
                background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                color: '#FFFFFF',
                padding: '14px 32px',
                borderRadius: 10,
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(37,99,235,0.4)',
              }}
            >
              Get Started with Senior CA →
            </button>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20assistance%20with%20my%20Income%20Tax%20Return%20(ITR)%20Filing."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="fab fa-whatsapp" style={{ color: '#10B981', fontSize: '1.1rem' }} /> Contact on WhatsApp
            </a>
          </div>
        </section>

      </div>

      {/* ── CONSULTATION MODAL ── */}
      {callbackModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 20, padding: 32, maxWidth: 480, width: '100%', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <button onClick={() => setCallbackModal(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.3rem', cursor: 'pointer' }}>
              ✕
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
              Request Senior CA Consultation
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: 24 }}>
              Fill in your details below and our tax expert will get in touch with you directly.
            </p>

            {modalSuccess ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', color: '#34D399', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                <i className="fas fa-circle-check" style={{ fontSize: '2rem', marginBottom: 8, display: 'block' }} />
                <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: 4 }}>Consultation Request Submitted!</strong>
                <span style={{ fontSize: '0.85rem', color: '#A7F3D0' }}>A Chartered Accountant will contact you within 15 minutes.</span>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    style={{ width: '100%', padding: '12px 14px', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                    placeholder="Enter your full name"
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    style={{ width: '100%', padding: '12px 14px', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                    placeholder="you@domain.com"
                    value={modalForm.email}
                    onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    style={{ width: '100%', padding: '12px 14px', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                    placeholder="+91 98765 43210"
                    value={modalForm.phone}
                    onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>Primary Income Type</label>
                  <select
                    style={{ width: '100%', padding: '12px 14px', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                    value={modalForm.incomeType}
                    onChange={(e) => setModalForm({ ...modalForm, incomeType: e.target.value })}
                  >
                    <option value="salary">Salaried Individual</option>
                    <option value="house">House Property Owner</option>
                    <option value="capital-gains">Capital Gains (Stocks, MFs, Real Estate)</option>
                    <option value="fno-crypto">F&amp;O / Crypto Trader</option>
                    <option value="business">Business / Professional Income</option>
                    <option value="foreign">NRI / Foreign Income</option>
                  </select>
                </div>

                <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
                  Submit &amp; Speak to CA
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
