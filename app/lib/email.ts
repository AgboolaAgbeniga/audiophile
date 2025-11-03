import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_test_key_placeholder');

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Audiophile <orders@audiophile.com>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};