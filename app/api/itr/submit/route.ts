import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { incomeSources, packageName, fee, fileCount } = body

    const referenceId = `ITR-${Math.floor(100000 + Math.random() * 900000)}`

    console.log('ITR Filing Request Received:', {
      referenceId,
      incomeSources,
      packageName,
      fee,
      fileCount,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Filing request submitted successfully',
    })
  } catch (error) {
    console.error('Error submitting ITR filing request:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
