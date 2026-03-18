import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('That email doesn\'t look right — double-check the format.').optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  product: z.string().optional(),
  interests: z.array(z.string()).optional(),
  industry: z.string().optional(),
  enquiryType: z.string().optional(),
  budgetRange: z.string().optional(),
  hearAboutUs: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    // Log the submission (replace with HubSpot webhook in production)
    console.log('[CONTACT FORM SUBMISSION]', result.data)

    // TODO: HubSpot webhook
    // const hubspotRes = await fetch('https://api.hubapi.com/...', { ... })

    // TODO: Send confirmation email via Resend
    // await resend.emails.send({ ... })

    return NextResponse.json(
      { success: true, message: 'Enquiry received' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}
