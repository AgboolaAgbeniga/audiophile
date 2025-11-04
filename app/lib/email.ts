import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Add debug logging for troubleshooting
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development',
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Audiophile <orders@audiophile.com>',
      to,
      subject,
      html,
    });

    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    // For MailerSend trial accounts, log the specific error but don't throw
    // This allows the order to complete even if email fails
    console.warn('MailerSend trial limitation: Can only send to administrator email. Domain verification required for production.');
    console.warn('To test emails, use the administrator email address from your MailerSend account.');
    return { messageId: 'trial-limited', error: error instanceof Error ? error.message : 'Unknown error' };
  }
};