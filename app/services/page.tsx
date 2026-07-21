'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'

export default function ServicesPage() {
  const [servicesOpen, setServicesOpen] = useState(false)
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

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', color: '#E2E8F0', paddingBottom: 80, fontFamily: 'inherit' }}>
      {/* ── TOP NAV BAR ── */}
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
              <button style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
                Services <i className={`fas fa-chevron-down`} style={{ fontSize: '0.65rem', transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              {servicesOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: '#1C1C1C', border: '1px solid rgba(37,99,235,.4)', borderRadius: 10, padding: 6, minWidth: 240, boxShadow: '0 8px 32px rgba(0,0,0,.5)', zIndex: 2000 }} onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                  <Link href="/services/file-itr" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 7, textDecoration: 'none', color: '#E0E0E0' }}>
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

            <Link href="/login" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Login</Link>
          </div>
        </div>
      </div>

      {/* ── SERVICES LANDING CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 20px 0', textAlign: 'center' }}>
        <span style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid #3B82F6', color: '#60A5FA', padding: '4px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, letterSpacing: 1 }}>
          OUR FINANCIAL &amp; COMPLIANCE SERVICES
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FFFFFF', margin: '14px 0 10px 0' }}>
          Select a Service to Continue
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: 600, margin: '0 auto 40px auto', lineHeight: 1.6 }}>
          Mantra Taxbooks provides CA-backed Income Tax Return filings and official MCA Company Incorporation services.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, textWrap: 'pretty' }}>
          {/* FILE ITR SERVICE CARD */}
          <Link
            href="/services/file-itr"
            style={{
              background: '#1E293B',
              border: '1px solid #334155',
              borderRadius: 16,
              padding: 32,
              textDecoration: 'none',
              textAlign: 'left',
              transition: 'transform 0.2s, border-color 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(37,99,235,0.2)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 20 }}>
                📄
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                Income Tax Return (ITR) Filing
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: 20 }}>
                CA-reviewed tax filing plans starting from ₹999/year. Includes Form 16 validation, capital gains computation, and tax planning reports.
              </p>
            </div>
            <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              Explore ITR Filing Plans →
            </div>
          </Link>

          {/* COMPANY REGISTRATION SERVICE CARD */}
          <Link
            href="/services/company-registration"
            style={{
              background: '#1E293B',
              border: '1px solid #334155',
              borderRadius: 16,
              padding: 32,
              textDecoration: 'none',
              textAlign: 'left',
              transition: 'transform 0.2s, border-color 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(37,99,235,0.2)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 20 }}>
                🏢
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                Company Registration (MCA)
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: 20 }}>
                Complete incorporation for Private Limited (₹10,000+), LLP, OPC, and Section 8 entities in 10 days with COI, PAN, TAN, and CA assistance.
              </p>
            </div>
            <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              View Company Registration Packages →
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
