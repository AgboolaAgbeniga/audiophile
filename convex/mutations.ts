import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Users mutations
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const deleteUser = mutation({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Products mutations
export const createProduct = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    image: v.string(),
    price: v.number(),
    category: v.string(),
    stock: v.number(),
    features: v.array(v.string()),
    includes: v.array(
      v.object({
        item: v.string(),
        quantity: v.number(),
      })
    ),
    gallery: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    price: v.optional(v.number()),
    category: v.optional(v.string()),
    stock: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const deleteProduct = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Cart Items mutations
export const addToCart = mutation({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cartItems", {
      ...args,
      addedAt: Date.now(),
    });
  },
});

export const updateCartItem = mutation({
  args: {
    id: v.id("cartItems"),
    quantity: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const removeFromCart = mutation({
  args: {
    id: v.id("cartItems"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Orders mutations
export const createOrder = mutation({
  args: {
    userId: v.optional(v.id("users")), // Make userId optional for guest orders
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.optional(v.string()),
      })
    ),
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      city: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      tax: v.number(),
      grandTotal: v.number(),
    }),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateOrderStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});

export const deleteOrder = mutation({
  args: {
    id: v.id("orders"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const clearUserCart = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }
  },
});

export const sendOrderConfirmationEmail = mutation({
  args: {
    orderId: v.id("orders"),
    customerEmail: v.string(),
    customerName: v.string(),
    orderNumber: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      tax: v.number(),
      grandTotal: v.number(),
    }),
    shippingAddress: v.object({
      address: v.string(),
      city: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    // Import Resend - Convex supports dynamic imports
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY || 're_test_key_placeholder');

    const { orderNumber, customerName, items, totals, shippingAddress } = args;

    const itemsHtml = items.map(item => `
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

    try {
      const { data, error } = await resend.emails.send({
        from: 'Audiophile <orders@audiophile.com>',
        to: [args.customerEmail],
        subject: `Order Confirmation #${orderNumber}`,
        html: emailHtml,
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
  },
});