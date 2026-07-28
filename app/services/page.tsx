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
    }, 4000)
  }

  const handleServiceItemClick = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
      servicesTimeoutRef.current = null
    }
    setServicesOpen(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070B14', color: '#F1F5F9', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}>
      
      {/* ── TOP NOTIFICATION TICKER ── */}
      <div style={{ background: 'linear-gradient(90deg, #1E3A8A, #1D4ED8, #0F172A)', borderBottom: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 16px', fontSize: '0.78rem', color: '#DBEAFE', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <span style={{ background: '#10B981', color: '#064E3B', padding: '2px 8px', borderRadius: 12, fontWeight: 900, fontSize: '0.68rem', textTransform: 'uppercase' }}>LIVE</span>
        <span>Official Chartered Accountant Financial &amp; Compliance Services Portal</span>
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
                  <Link href="/services/file-itr" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 10, textDecoration: 'none', color: '#FFFFFF', background: 'rgba(59,130,246,0.16)', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <i className="fas fa-file-invoice-dollar" style={{ color: '#60A5FA', fontSize: '1.2rem' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>File ITR Guide &amp; Mandates</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Rules, Docs &amp; Notice Triggers</div>
                    </div>
                  </Link>
                  <Link href="/services/company-registration" onClick={handleServiceItemClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 10, textDecoration: 'none', color: '#CBD5E1' }}>
                    <i className="fas fa-building" style={{ color: '#60A5FA', fontSize: '1.2rem' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Company Registration</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Pvt Ltd, LLP &amp; OPC Compliance</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/login" style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', padding: '9px 20px', borderRadius: 10, textDecoration: 'none', fontSize: '0.88rem', fontWeight: 800, boxShadow: '0 4px 16px rgba(37,99,235,0.4)' }}>
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ── SERVICES HERO CONTENT ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '70px 28px 90px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(37, 99, 235, 0.14)', border: '1px solid rgba(59, 130, 246, 0.35)', color: '#60A5FA', padding: '6px 18px', borderRadius: 30, fontSize: '0.82rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 18 }}>
          OUR FINANCIAL &amp; COMPLIANCE SERVICES
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.3rem, 4vw, 3.4rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 16px 0', letterSpacing: '-0.8px' }}>
          Comprehensive CA Services for <span style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Individuals &amp; Businesses</span>
        </h1>
        
        <p style={{ fontSize: '1.1rem', color: '#94A3B8', maxWidth: 720, margin: '0 auto 48px auto', lineHeight: 1.65 }}>
          Select a service below to view detailed requirements, statutory mandates, pricing plans, and expert Chartered Accountant assistance.
        </p>

        {/* 2 MAIN SERVICE CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 30 }}>
          
          {/* FILE ITR SERVICE CARD */}
          <Link
            href="/services/file-itr"
            style={{
              background: '#0F172A',
              border: '1px solid #1E293B',
              borderRadius: 24,
              padding: 38,
              textDecoration: 'none',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 24, boxShadow: '0 6px 18px rgba(37,99,235,0.4)' }}>
                <i className="fas fa-file-invoice-dollar" />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 12, letterSpacing: '-0.4px' }}>
                Income Tax Return (ITR) Filing &amp; Planning
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: 24 }}>
                CA-reviewed tax filing plans starting from ₹999/year. Includes Form 16 validation, capital gains computation, loss carry-forward, and notice protection.
              </p>
            </div>
            <div style={{ color: '#60A5FA', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              Explore ITR Plans &amp; Mandates <i className="fas fa-arrow-right" />
            </div>
          </Link>

          {/* COMPANY REGISTRATION SERVICE CARD */}
          <Link
            href="/services/company-registration"
            style={{
              background: '#0F172A',
              border: '1px solid #1E293B',
              borderRadius: 24,
              padding: 38,
              textDecoration: 'none',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #059669, #10B981)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 24, boxShadow: '0 6px 18px rgba(16,185,129,0.4)' }}>
                <i className="fas fa-building" />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 12, letterSpacing: '-0.4px' }}>
                Company Registration &amp; MCA Compliance
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: 24 }}>
                Official incorporation for Private Limited, LLP, OPC, and Section 8 entities in 10 days with Certificate of Incorporation, PAN, TAN, and CA assistance.
              </p>
            </div>
            <div style={{ color: '#34D399', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              View Company Incorporation Packages <i className="fas fa-arrow-right" />
            </div>
          </Link>

        </div>
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
              <li><Link href="/services/file-itr">Pricing</Link></li>
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
    </div>
  )
}
