'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
  { href: '/invoices', icon: 'fa-file-invoice-dollar', label: 'My Invoices' },
  { href: '/documents', icon: 'fa-folder-open', label: 'My Documents' },
  { href: '/tickets', icon: 'fa-headset', label: 'Support Tickets' },
  { href: '/change-password', icon: 'fa-key', label: 'Change Password' },
]

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'var(--dark)', borderBottom: '1px solid rgba(196,30,58,.3)', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#ccc', fontSize: '1.1rem', cursor: 'pointer', display: 'none' }} className="mobile-menu-btn">
            <i className="fas fa-bars" />
          </button>
          <div className="logo">
            <span className="logo-m" style={{ fontSize: '.9rem', padding: '5px 10px' }}>MANTRA</span>
            <span className="logo-t" style={{ fontSize: '.9rem', padding: '5px 10px' }}>TAXBOOKS</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: '#A0A0A0', fontSize: '.83rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#C41E3A,#8B0000)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.8rem', fontWeight: 700 }}>
              {session?.user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="hide-mobile">{session?.user?.name}</span>
          </span>
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="btn btn-secondary btn-sm">
            <i className="fas fa-sign-out-alt" /> <span className="hide-mobile">Logout</span>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 149 }} />}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sb-section">Client Portal</div>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`sb-link${pathname === item.href ? ' active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <i className={`fas ${item.icon}`} />
            {item.label}
          </Link>
        ))}
        <div className="sb-section">Quick Links</div>
        <Link href="/" className="sb-link"><i className="fas fa-globe" /> Main Website</Link>
      </aside>

      {/* Main content */}
      <main className="dash-content" style={{ paddingTop: 28, marginTop: 64 }}>
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
