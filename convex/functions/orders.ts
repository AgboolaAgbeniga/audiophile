import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getOrders = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('orders')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect();
  },
});

export const createOrder = mutation({
  args: {
    userId: v.string(),
    items: v.array(v.object({
      productId: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
    })),
    total: v.number(),
    shippingAddress: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      address: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    paymentMethod: v.object({
      type: v.union(v.literal('e-money'), v.literal('cash')),
      details: v.any(),
    }),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert('orders', {
      ...args,
      status: 'pending',
    });
    return orderId;
  },
});