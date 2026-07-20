'use client'
import { useState, useEffect } from 'react'

export default function CompanyRegistrationPage() {
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

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'documents', label: 'Documents' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'process', label: 'Process' },
    { id: 'compliance', label: 'Compliances' },
    { id: 'comparison', label: 'Company vs LLP' },
  ]

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setInquiryModal(false)
    }, 2500)
  }

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 60 }}>
      {/* ── HERO BANNER ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0A2A73 0%, #1A56DB 100%)',
          color: '#fff',
          borderRadius: 20,
          padding: '40px 30px',
          marginBottom: 30,
          boxShadow: '0 10px 30px rgba(10, 42, 115, 0.3)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '4px 14px',
            borderRadius: 20,
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          Companies Act, 2013 · MCA Registered Process
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px 0', lineHeight: 1.2 }}>
          Private Limited Company Registration
        </h1>
        <p style={{ fontSize: '1.05rem', opacity: 0.9, maxWidth: 750, margin: '0 0 24px 0', lineHeight: 1.6 }}>
          Register your company in just 10 days with complete expert assistance — from name approval to incorporation certificate, PAN, TAN and beyond.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => setInquiryModal(true)}
            className="btn btn-primary"
            style={{ background: '#fff', color: '#0A2A73', borderRadius: 8, padding: '12px 26px', fontWeight: 700, fontSize: '0.95rem' }}
          >
            Get Started Now
          </button>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20register%20a%20Private%20Limited%20Company."
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}
          >
            <i className="fab fa-whatsapp" style={{ fontSize: '1.3rem', color: '#25D366' }} /> Chat on WhatsApp
          </a>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 28, fontSize: '0.9rem', opacity: 0.95 }}>
          <div>✓ Registration in 10 days</div>
          <div>✓ Expert assistance</div>
          <div>✓ End-to-end filings</div>
        </div>
      </div>

      {/* ── INQUIRY / REGISTRATION MODAL ── */}
      {inquiryModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--surface, #1C1C1C)', border: '1px solid var(--border, #333)', borderRadius: 16, padding: 30, maxWidth: 500, width: '100%', position: 'relative' }}>
            <button onClick={() => setInquiryModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#aaa', fontSize: '1.2rem', cursor: 'pointer' }}>
              <i className="fas fa-times" />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text, #fff)', marginBottom: 6 }}>
              Apply for Company Registration
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--textl, #999)', marginBottom: 20 }}>
              Submit your proposed company details and our MCA incorporation expert will initiate your application.
            </p>

            {submitted ? (
              <div style={{ background: '#E8F8F0', border: '1px solid #27AE60', color: '#1E7E34', padding: 20, borderRadius: 10, textAlign: 'center' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '2rem', marginBottom: 8, display: 'block' }} />
                <strong>Application Submitted!</strong> Our team will contact you within 2 hours.
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit}>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 4 }}>Proposed Company Name *</label>
                  <input type="text" required className="form-control" placeholder="e.g. Acme Tech Solutions Pvt Ltd" value={inquiryForm.companyName} onChange={(e) => setInquiryForm({ ...inquiryForm, companyName: e.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 4 }}>No. of Directors</label>
                    <select className="form-control" value={inquiryForm.directorsCount} onChange={(e) => setInquiryForm({ ...inquiryForm, directorsCount: e.target.value })}>
                      <option value="2">2 Directors</option>
                      <option value="3">3 Directors</option>
                      <option value="4+">4+ Directors</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 4 }}>State of Registration *</label>
                    <input type="text" required className="form-control" placeholder="e.g. Maharashtra" value={inquiryForm.state} onChange={(e) => setInquiryForm({ ...inquiryForm, state: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 4 }}>Phone Number *</label>
                    <input type="tel" required className="form-control" placeholder="+91 9876543210" value={inquiryForm.phone} onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 4 }}>Email Address *</label>
                    <input type="email" required className="form-control" placeholder="founder@acme.com" value={inquiryForm.email} onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })} />
                  </div>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text, #fff)', marginBottom: 4 }}>Additional Notes</label>
                  <textarea className="form-control" rows={2} placeholder="Any specific requirements or questions..." value={inquiryForm.comments} onChange={(e) => setInquiryForm({ ...inquiryForm, comments: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ padding: 12, borderRadius: 8 }}>
                  Submit Registration Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── STARTER PACKAGE CARD ── */}
      <div
        style={{
          background: 'var(--surface, #1C1C1C)',
          border: '2px solid #1A56DB',
          borderRadius: 16,
          padding: 30,
          marginBottom: 35,
          boxShadow: '0 8px 25px rgba(26,86,219,0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span style={{ background: '#1A56DB', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '3px 12px', borderRadius: 20, textTransform: 'uppercase' }}>
              All-Inclusive Starter Package
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #fff)', margin: '10px 0 4px' }}>
              Starter Registration Plan
            </h2>
            <p style={{ color: 'var(--textl, #999)', fontSize: '0.88rem', margin: 0 }}>
              Company registration completed in 10 working days.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text, #fff)', lineHeight: 1 }}>
              ₹10,000+
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>+ Govt fees applicable additionally</div>
            <button onClick={() => setInquiryModal(true)} className="btn btn-primary btn-sm" style={{ marginTop: 10, background: '#1A56DB', padding: '8px 20px' }}>
              Apply Now
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 24, borderTop: '1px solid var(--border, #333)', paddingTop: 20 }}>
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
            <div key={idx} style={{ fontSize: '0.86rem', color: 'var(--text, #ddd)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-check-circle" style={{ color: '#0E9F6E', fontSize: '0.9rem' }} />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── STICKY TAB NAVIGATION BAR ── */}
      <div
        style={{
          position: 'sticky',
          top: 64,
          background: 'var(--surface, #1C1C1C)',
          border: '1px solid var(--border, #333)',
          borderRadius: 12,
          padding: '6px 12px',
          marginBottom: 35,
          zIndex: 100,
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            style={{
              background: activeTab === tab.id ? '#1A56DB' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'var(--textl, #aaa)',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SECTION 1: OVERVIEW ── */}
      <section id="overview" style={{ marginBottom: 40, scrollMarginTop: 130 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', marginBottom: 14 }}>
          What is a Private Limited Company (Pvt Ltd)?
        </h2>
        <div style={{ background: 'rgba(26,86,219,0.1)', borderLeft: '4px solid #1A56DB', borderRadius: '0 12px 12px 0', padding: 22, fontSize: '0.95rem', color: 'var(--text, #ddd)', lineHeight: 1.6 }}>
          A private limited company (Pvt Ltd) is a separate legal entity registered under the <strong>Companies Act, 2013</strong>, offering limited liability protection to its members. It restricts share transfers, keeping ownership within a trusted group while providing the credibility and structure of a registered corporate entity.
        </div>
      </section>

      {/* ── SECTION 2: BENEFITS ── */}
      <section id="benefits" style={{ marginBottom: 40, scrollMarginTop: 130 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', marginBottom: 6 }}>
          Benefits of Company Registration
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--textl, #999)', marginBottom: 20 }}>
          Why thousands of founders choose the Private Limited structure.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          {[
            { num: 1, title: 'Limited Liability Protection', desc: 'If the company takes a loan and suffers genuine business losses, shareholders need not repay from personal assets.' },
            { num: 2, title: 'Perpetual Succession', desc: 'A company has continuous existence independent of its founders. If a shareholder or director leaves, the company does not dissolve.' },
            { num: 3, title: 'Easier Access to Capital & Funding', desc: 'Institutional investors require a corporate structure. Issue new shares to bring on angel investors or VCs easily.' },
            { num: 4, title: 'Strategic Tax Planning', desc: 'Companies enjoy better tax efficiencies — 15% tax rate for manufacturing and 22% for other companies.' },
            { num: 5, title: 'Seamless Transfer of Ownership', desc: 'Ownership is broken into shares. Transferring control is simply a share transfer deed and registry update.' },
            { num: 6, title: 'Eligibility for Government Schemes', desc: 'Startup India tax exemptions, funding support, and Make in India subsidies for manufacturing.' },
            { num: 7, title: 'Ease of Ownership Transfer', desc: 'Ownership can be transferred easily by selling shares, making it simple to attract new investors.' },
            { num: 8, title: 'Global Opportunities', desc: 'Incorporation enables entry into international markets, attracts FDI, and establishes a credible global presence.' },
            { num: 9, title: 'Compliance & Legal Safeguards', desc: 'Structured compliance — annual filings, financial disclosures, and legal obligations — reduces disputes.' },
          ].map((b) => (
            <div key={b.num} style={{ background: 'var(--surface, #1C1C1C)', border: '1px solid var(--border, #2A2A2A)', borderRadius: 12, padding: 20 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(26,86,219,0.15)', color: '#1A56DB', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                {b.num}
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text, #fff)', marginBottom: 6 }}>{b.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--textl, #aaa)', lineHeight: 1.5, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: DOCUMENTS REQUIRED ── */}
      <section id="documents" style={{ marginBottom: 40, scrollMarginTop: 130 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', marginBottom: 6 }}>
          Documents Required for Company Registration
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--textl, #999)', marginBottom: 20 }}>
          Keep these ready for a smooth, delay-free incorporation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          <div style={{ background: 'var(--surface, #1C1C1C)', border: '1px solid var(--border, #2A2A2A)', borderRadius: 14, padding: 22 }}>
            <h4 style={{ color: '#1A56DB', fontWeight: 700, fontSize: '1rem', marginBottom: 12, borderBottom: '1px solid var(--border, #333)', paddingBottom: 8 }}>
              For Directors &amp; Shareholders
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text, #ccc)' }}>
              {['Passport-sized photograph (recent, colour, clear)', 'PAN Card (mandatory for all Indian citizens)', 'Identity Proof: Aadhaar Card, Passport, Voter ID or Driver license', 'Residential Address Proof (utility bill or bank statement < 60 days)', 'Digital Signature Certificate (DSC)', 'Director Identification Number (DIN)'].map((item, i) => (
                <li key={i} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#1A56DB' }}>▸</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--surface, #1C1C1C)', border: '1px solid var(--border, #2A2A2A)', borderRadius: 14, padding: 22 }}>
            <h4 style={{ color: '#1A56DB', fontWeight: 700, fontSize: '1rem', marginBottom: 12, borderBottom: '1px solid var(--border, #333)', paddingBottom: 8 }}>
              For Registered Office Address
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text, #ccc)' }}>
              {['Proof of Address (utility bill, water bill or tax receipt < 60 days)', 'No Objection Certificate (NOC) from property owner', 'Tenancy / Ownership Proof: registered rental agreement or deed'].map((item, i) => (
                <li key={i} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#1A56DB' }}>▸</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--surface, #1C1C1C)', border: '1px solid var(--border, #2A2A2A)', borderRadius: 14, padding: 22 }}>
            <h4 style={{ color: '#1A56DB', fontWeight: 700, fontSize: '1rem', marginBottom: 12, borderBottom: '1px solid var(--border, #333)', paddingBottom: 8 }}>
              Company Formation Documents
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text, #ccc)' }}>
              {['Memorandum of Association (MoA): legal name, office, & business activities', 'Articles of Association (AoA): internal rules & director roles', 'Director & Shareholder details: DOB, nationality, & shareholding %'].map((item, i) => (
                <li key={i} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#1A56DB' }}>▸</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: REQUIREMENTS ── */}
      <section id="requirements" style={{ marginBottom: 40, scrollMarginTop: 130 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', marginBottom: 16 }}>
          Requirements for Pvt Ltd Registration
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            { title: 'Minimum Two Directors', desc: 'At least two directors, with at least one resident of India (182+ days in FY).' },
            { title: 'Minimum Two Shareholders', desc: 'Directors and shareholders can be the same individuals or corporate entities.' },
            { title: 'Registered Office Address', desc: 'Valid Indian address with proof of address and NOC from property owner.' },
            { title: 'Digital Signature (DSC)', desc: 'All proposed directors need a valid DSC to digitally sign incorporation forms.' },
            { title: 'Director ID Number (DIN)', desc: 'Each director must obtain a DIN issued by Ministry of Corporate Affairs.' },
            { title: 'Unique Company Name', desc: 'Name must not be identical or similar to existing companies or trademarks.' },
          ].map((req, i) => (
            <div key={i} style={{ background: 'var(--surface2, #252525)', border: '1px solid var(--border, #333)', borderRadius: 12, padding: 18 }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text, #fff)', marginBottom: 6 }}>{req.title}</h4>
              <p style={{ fontSize: '0.83rem', color: 'var(--textl, #aaa)', margin: 0, lineHeight: 1.4 }}>{req.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: PROCESS STEP BY STEP ── */}
      <section id="process" style={{ marginBottom: 40, scrollMarginTop: 130 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', marginBottom: 6 }}>
          Company Registration Process — Step by Step
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--textl, #999)', marginBottom: 20 }}>
          Systematic process governed by the Ministry of Corporate Affairs (MCA).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { step: 1, title: 'Choose Business Structure', desc: 'Private Limited (Pvt Ltd) for startups, LLP for partnerships, or OPC for solo founders.', time: null },
            { step: 2, title: 'Get Digital Signature Certificate (DSC)', desc: 'Enables directors to sign electronic documents filed with MCA via eMudhra or Sify.', time: '⏱ 1–2 working days' },
            { step: 3, title: 'Obtain Director Identification Number (DIN)', desc: 'Mandatory under Section 153 of Companies Act, 2013 — applied via SPICe+ form.', time: '⏱ 1 working day' },
            { step: 4, title: 'Reserve Unique Company Name', desc: 'Check availability via MCA RUN service complying with Incorporation Rules. Reserved for 20 days.', time: '⏱ 1–2 working days' },
            { step: 5, title: 'Draft Incorporation Documents (MoA & AoA)', desc: 'MoA states business objectives; AoA governs internal procedures and director roles.', time: null },
            { step: 6, title: 'File SPICe+ Form on MCA Portal', desc: 'Integrates name reservation, incorporation, PAN/TAN, GST, EPFO & ESIC enrolment.', time: null },
            { step: 7, title: 'Pay Statutory Fees', desc: 'Pay applicable government fees on MCA portal based on authorized share capital.', time: null },
            { step: 8, title: 'Receive Company Registration Certificate', desc: 'Once RoC approves SPICe+ application, Certificate of Incorporation (COI) is issued.', time: null },
          ].map((st) => (
            <div key={st.step} style={{ display: 'flex', gap: 16, background: 'var(--surface, #1C1C1C)', border: '1px solid var(--border, #2A2A2A)', borderRadius: 12, padding: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1A56DB', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {st.step}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text, #fff)', marginBottom: 4 }}>{st.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--textl, #aaa)', margin: 0, lineHeight: 1.5 }}>{st.desc}</p>
                {st.time && (
                  <span style={{ display: 'inline-block', marginTop: 8, background: 'rgba(26,86,219,0.15)', color: '#1A56DB', fontSize: '0.75rem', fontWeight: 700, padding: '2px 10px', borderRadius: 10 }}>
                    {st.time}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6: COMPLIANCES ── */}
      <section id="compliance" style={{ marginBottom: 40, scrollMarginTop: 130 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', marginBottom: 16 }}>
          Post-Incorporation Compliances
        </h2>

        <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid var(--border, #333)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0A2A73', color: '#fff' }}>
                <th style={{ padding: '12px 16px' }}>Timeline</th>
                <th style={{ padding: '12px 16px' }}>Key Compliances</th>
                <th style={{ padding: '12px 16px' }}>Detailed Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: 'Within 30 Days', key: 'Initial Setup & Governance', actions: 'Opening bank account, first board meeting, first auditor appointment, disclosure of interest' },
                { time: 'Within 60 Days', key: 'Capital & Share Compliance', actions: 'Deposit of subscription money, allotment of shares, issuance of share certificates, stamp duty' },
                { time: 'Within 180 Days', key: 'Commencement of Business', actions: 'Filing of INC-20A (Declaration for Commencement of Business) with ROC' },
                { time: 'Quarterly', key: 'Ongoing Board Compliance', actions: 'Holding board meetings as per Companies Act requirements' },
                { time: 'Ongoing', key: 'Statutory Records & Accounts', actions: 'Maintenance of statutory registers, minutes book, & books of accounts' },
                { time: 'Annually', key: 'Financial & Regulatory Filings', actions: 'Conducting AGM, adoption of financial statements, filing ITR, AOC-4, MGT-7, & Director KYC' },
                { time: 'Within 30 Days of AGM', key: 'Annual ROC Filings', actions: 'Filing annual return, list of shareholders, board report, & Forms MGT-7, AOC-4, ADT-1' },
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #333)', background: idx % 2 === 0 ? 'var(--surface2, #252525)' : 'transparent' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#1A56DB', whiteSpace: 'nowrap' }}>{row.time}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text, #fff)' }}>{row.key}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--textl, #ccc)' }}>{row.actions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SECTION 7: COMPANY VS LLP COMPARISON ── */}
      <section id="comparison" style={{ marginBottom: 40, scrollMarginTop: 130 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text, #fff)', marginBottom: 16 }}>
          Private Limited Company vs LLP
        </h2>

        <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid var(--border, #333)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', textAlign: 'left', minWidth: 750 }}>
            <thead>
              <tr style={{ background: '#0A2A73', color: '#fff' }}>
                <th style={{ padding: '12px 14px' }}>Aspect</th>
                <th style={{ padding: '12px 14px' }}>Private Limited Company (Pvt Ltd)</th>
                <th style={{ padding: '12px 14px' }}>Limited Liability Partnership (LLP)</th>
                <th style={{ padding: '12px 14px' }}>In Simple Terms</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Governing Law', 'Companies Act, 2013', 'LLP Act, 2008', 'Company follows stricter rules; LLP is more partnership-like.'],
                ['Best Suited For', 'Startups, tech, manufacturing, businesses seeking funding', 'Professional services (CA, lawyers), small firms', 'Company for big growth; LLP for simple collaborative work.'],
                ['Min Members', '2 members', '2 partners', 'Both need at least 2 people to start.'],
                ['Max Members', '200 shareholders', 'No upper limit', 'LLP is flexible if adding many partners.'],
                ['Ownership', 'Shareholders own via shares', 'Partners own via capital & agreement', 'In Company, owners can differ from managers.'],
                ['Management', 'Board of Directors manages formally', 'Partners manage directly as per agreement', 'Company has formal hierarchy; LLP is flexible team.'],
                ['Liability', 'Limited to unpaid share capital', 'Limited to agreed contribution', 'Both protect personal assets.'],
                ['Perpetual Succession', 'Yes', 'Yes', 'Business continues even if members leave or die.'],
                ['Compliance', 'High: annual audits, ROC filings (AOC-4, MGT-7)', 'Lower: fewer filings (Form 8, Form 11)', 'LLP is simpler & cheaper for small firms.'],
                ['Statutory Audit', 'Mandatory every year', 'Mandatory only if turnover > ₹40L or capital > ₹25L', 'Company always needs CA audit.'],
                ['Taxation', 'Corporate tax (22% or 25-30%)', 'Taxed as partnership (~30%)', 'LLP avoids double tax on dividends.'],
                ['Raising Funds', 'Easy: issue shares to VCs & angels', 'Difficult: relies on loans & partners', 'Company preferred for external investment.'],
                ['Ownership Transfer', 'Easy: transfer shares', 'More complex: requires agreement changes', 'Selling part of Company is simpler.'],
                ['Incorporation Cost', 'Slightly higher (~₹7k-15k+)', 'Lower (~₹5k-10k)', 'LLP is cheaper & quicker to start.'],
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #333)', background: idx % 2 === 0 ? 'var(--surface2, #252525)' : 'transparent' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text, #fff)' }}>{row[0]}</td>
                  <td style={{ padding: '10px 14px', color: '#1A56DB', fontWeight: 600 }}>{row[1]}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--textl, #ccc)' }}>{row[2]}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: '0.8rem', fontStyle: 'italic' }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1A56DB 0%, #0A2A73 100%)',
          borderRadius: 16,
          padding: '36px 30px',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px 0' }}>
          Ready to Register Your Company?
        </h3>
        <p style={{ opacity: 0.9, fontSize: '0.95rem', margin: '0 0 20px 0' }}>
          Get your Private Limited Company incorporated in 10 days with complete CA expert assistance.
        </p>
        <button
          onClick={() => setInquiryModal(true)}
          className="btn btn-primary"
          style={{ background: '#fff', color: '#0A2A73', borderRadius: 8, padding: '12px 28px', fontWeight: 700 }}
        >
          Apply for Registration Today
        </button>
      </div>
    </div>
  )
}
