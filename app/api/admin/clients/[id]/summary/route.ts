import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiOk, apiError } from '@/lib/utils'
import { computeHealth } from '@/lib/finance'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return apiError('Forbidden', 403)

  const client = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, financialSummary: true },
  })
  if (!client) return apiError('Client not found', 404)
  if (!client.financialSummary) return apiOk({ noData: true, client: { name: client.name, email: client.email } })

  const row = client.financialSummary
  const data = {
    monthlyIncome: row.monthlyIncome, monthlyExpenses: row.monthlyExpenses,
    monthlySavings: row.monthlySavings, emergencyFund: row.emergencyFund,
    lifeInsuranceCover: row.lifeInsuranceCover, healthInsuranceCover: row.healthInsuranceCover,
    retirementSavings: row.retirementSavings, totalDebt: row.totalDebt,
    monthlyEmi: row.monthlyEmi, equityPercentage: row.equityPercentage,
    totalAssets: row.totalAssets,
  }
  return apiOk({ data, report: computeHealth(data), updatedAt: row.updatedAt, client: { name: client.name, email: client.email } })
}
