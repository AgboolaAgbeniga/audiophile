import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body } = await request.json();

    await sendEmail(to, subject, body);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}