import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiError } from '@/lib/utils'
import { computeHealth } from '@/lib/finance'
import { generateSummaryPDF } from '@/lib/finance-pdf'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return apiError('Forbidden', 403)

  const user = await prisma.user.findUnique({
    where: { id },
    select: { name: true, email: true, financialSummary: true },
  })
  if (!user) return apiError('Client not found.', 404)
  if (!user.financialSummary) return apiError('No financial summary for this client.', 404)

  const row = user.financialSummary
  const data = {
    monthlyIncome: row.monthlyIncome, monthlyExpenses: row.monthlyExpenses,
    monthlySavings: row.monthlySavings, emergencyFund: row.emergencyFund,
    lifeInsuranceCover: row.lifeInsuranceCover, healthInsuranceCover: row.healthInsuranceCover,
    retirementSavings: row.retirementSavings, totalDebt: row.totalDebt,
    monthlyEmi: row.monthlyEmi, equityPercentage: row.equityPercentage,
    totalAssets: row.totalAssets,
  }

  const pdfBuffer = await generateSummaryPDF(user.name, user.email, data, computeHealth(data))
  const filename = `financial-summary-${user.name.replace(/\s+/g, '-').toLowerCase()}.pdf`

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(pdfBuffer.length),
    },
  })
}
