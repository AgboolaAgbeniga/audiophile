import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const {
      customerEmail,
      customerName,
      orderNumber,
      items,
      totals,
      shippingAddress
    } = await request.json();

    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br>
          <span style="color: #666; font-size: 14px;">$${item.price.toLocaleString('en-US')} x ${item.quantity}</span>
        </td>
        <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">
          <strong>$${(item.price * item.quantity).toLocaleString('en-US')}</strong>
        </td>
      </tr>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D87D4A; margin: 0;">AUDIOPHILE</h1>
            <h2 style="margin: 10px 0;">Order Confirmation</h2>
          </div>

          <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0;">Order #${orderNumber}</h3>
            <p style="margin: 0;"><strong>Thank you for your order, ${customerName}!</strong></p>
          </div>

          <div style="margin-bottom: 30px;">
            <h4 style="margin: 0 0 15px 0;">Order Details</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f8f8;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #D87D4A;">Item</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #D87D4A;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h4 style="margin: 0 0 15px 0;">Order Summary</h4>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span>Total:</span>
              <strong>$${totals.subtotal.toLocaleString('en-US')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span>Shipping:</span>
              <strong>$${totals.shipping.toLocaleString('en-US')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span>VAT (Included):</span>
              <strong>$${totals.tax.toLocaleString('en-US')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; color: #D87D4A;">
              <strong>Grand Total:</strong>
              <strong>$${totals.grandTotal.toLocaleString('en-US')}</strong>
            </div>
          </div>

          <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h4 style="margin: 0 0 15px 0;">Shipping Address</h4>
            <p style="margin: 0;">
              ${customerName}<br>
              ${shippingAddress.address}<br>
              ${shippingAddress.city}, ${shippingAddress.zip}<br>
              ${shippingAddress.country}
            </p>
          </div>

          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>Thank you for shopping with Audiophile!</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </body>
      </html>
    `;

    await sendEmail(customerEmail, `Order Confirmation #${orderNumber}`, emailHtml);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}