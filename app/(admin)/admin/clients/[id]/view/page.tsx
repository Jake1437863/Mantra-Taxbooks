'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { formatCurrency, formatDate, formatFileSize } from '@/lib/utils'

const tabs = ['Overview', 'Invoices', 'Documents', 'Tickets']

export default function AdminClientView() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('Overview')
  const [downloading, setDownloading] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/admin/clients/${id}/overview`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const downloadPDF = async (invId: string, invoiceNo: string) => {
    setDownloading(invId)
    const res = await fetch(`/api/invoices/${invId}/pdf`)
    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `${invoiceNo}.pdf`; a.click()
      URL.revokeObjectURL(url)
    }
    setDownloading(null)
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}><i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--red)' }} /></div>
  if (!data?.client) return <div style={{ padding: 40, color: 'var(--err)' }}>Client not found.</div>

  const { client, invoices, documents, tickets } = data
  const stats = [
    { icon: 'fa-file-invoice-dollar', label: 'Total Invoices', value: invoices.length, color: 'rgba(52,152,219,.12)', iconColor: 'var(--info)' },
    { icon: 'fa-check-circle', label: 'Paid', value: invoices.filter((i: any) => i.status === 'PAID').length, color: 'rgba(39,174,96,.12)', iconColor: 'var(--ok)' },
    { icon: 'fa-clock', label: 'Pending', value: invoices.filter((i: any) => i.status === 'PENDING').length, color: 'rgba(243,156,18,.12)', iconColor: 'var(--warn)' },
    { icon: 'fa-folder-open', label: 'Documents', value: documents.length, color: 'rgba(196,30,58,.12)', iconColor: 'var(--red)' },
    { icon: 'fa-headset', label: 'Tickets', value: tickets.length, color: 'rgba(155,89,182,.12)', iconColor: '#9b59b6' },
  ]

  return (
    <>
      {/* Admin view banner */}
      <div style={{ background: 'linear-gradient(135deg,#1565C0,#0D47A1)', color: '#fff', borderRadius: 10, padding: '14px 20px', marginBottom: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <span style={{ fontWeight: 700, fontSize: '.9rem' }}>
          <i className="fas fa-eye" style={{ marginRight: 8 }} />
          Admin View — {client.name}'s Portal {client.company ? `(${client.company})` : ''}
        </span>
        <button onClick={() => window.close()} style={{ background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '5px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '.83rem' }}>
          <i className="fas fa-times" style={{ marginRight: 6 }} />Close Tab
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '9px 20px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '.85rem', color: tab === t ? 'var(--red)' : '#666', borderBottom: tab === t ? '2px solid var(--red)' : '2px solid transparent', marginBottom: -1, fontFamily: 'inherit' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === 'Overview' && (
        <>
          <div className="stats-row" style={{ marginBottom: 22 }}>
            {stats.map(s => (
              <div key={s.label} className="stat-box">
                <div className="si" style={{ background: s.color, color: s.iconColor }}><i className={`fas ${s.icon}`} /></div>
                <div className="sv">{s.value}</div>
                <div className="sl">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header"><h3>Client Profile</h3></div>
            <div style={{ padding: '16px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 0 }}>
              {[
                ['Name', client.name], ['Email', client.email], ['Phone', client.phone],
                ['Company', client.company], ['GST No.', client.gstNumber], ['CIN No.', client.cinNumber],
                ['Address', client.address], ['City', client.city], ['State', client.state],
                ['PIN Code', client.pincode], ['Status', client.isActive ? 'Active' : 'Inactive'], ['Joined', formatDate(client.createdAt)],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label as string} style={{ padding: '8px 0', borderBottom: '1px solid var(--bg)', fontSize: '.84rem' }}>
                  <div style={{ color: '#888', fontSize: '.75rem', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontWeight: 600, fontFamily: (label === 'GST No.' || label === 'CIN No.') ? 'monospace' : 'inherit' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Invoices Tab */}
      {tab === 'Invoices' && (
        <div className="card">
          <div className="card-header"><h3>All Invoices ({invoices.length})</h3></div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Invoice No</th><th>Type</th><th>Total</th><th>GST</th><th>Status</th><th>Date</th><th>Paid On</th><th>PDF</th></tr></thead>
              <tbody>
                {invoices.length === 0 ? <tr><td colSpan={8} style={{ textAlign: 'center', color: '#999', padding: 32 }}>No invoices.</td></tr>
                  : invoices.map((inv: any) => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: 700, color: 'var(--red)' }}>{inv.invoiceNo}</td>
                      <td><span className={`badge b-${inv.type.toLowerCase()}`}>{inv.type}</span></td>
                      <td style={{ fontWeight: 700 }}>{formatCurrency(Number(inv.total))}</td>
                      <td>{formatCurrency(Number(inv.gstAmount))}</td>
                      <td><span className={`badge b-${inv.status.toLowerCase()}`}>{inv.status}</span></td>
                      <td>{formatDate(inv.createdAt)}</td>
                      <td>{formatDate(inv.paidAt)}</td>
                      <td>
                        <button className="btn btn-secondary btn-sm" onClick={() => downloadPDF(inv.id, inv.invoiceNo)} disabled={downloading === inv.id}>
                          {downloading === inv.id ? <i className="fas fa-spinner fa-spin" /> : <><i className="fas fa-file-pdf" /> PDF</>}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {tab === 'Documents' && (
        <div className="card">
          <div className="card-header"><h3>All Documents ({documents.length})</h3></div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Filename</th><th>Size</th><th>Status</th><th>Review Notes</th><th>Uploaded</th></tr></thead>
              <tbody>
                {documents.length === 0 ? <tr><td colSpan={5} style={{ textAlign: 'center', color: '#999', padding: 32 }}>No documents.</td></tr>
                  : documents.map((doc: any) => (
                    <tr key={doc.id}>
                      <td><i className="fas fa-file" style={{ marginRight: 8, color: 'var(--red)' }} />{doc.filename}</td>
                      <td>{formatFileSize(doc.size)}</td>
                      <td><span className={`badge b-${doc.status.toLowerCase()}`}>{doc.status}</span></td>
                      <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.reviewNotes || '—'}</td>
                      <td>{formatDate(doc.createdAt)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tickets Tab */}
      {tab === 'Tickets' && (
        <div className="card">
          <div className="card-header"><h3>All Tickets ({tickets.length})</h3></div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Ticket No</th><th>Title</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Opened</th></tr></thead>
              <tbody>
                {tickets.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', color: '#999', padding: 32 }}>No tickets.</td></tr>
                  : tickets.map((t: any) => (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 700, color: 'var(--red)' }}>{t.ticketNo}</td>
                      <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</td>
                      <td><span className={`badge b-${t.priority.toLowerCase()}`}>{t.priority}</span></td>
                      <td><span className={`badge b-${t.status.toLowerCase()}`}>{t.status}</span></td>
                      <td>{t.assignee?.name || '—'}</td>
                      <td>{formatDate(t.createdAt)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
