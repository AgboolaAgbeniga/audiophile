import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    features: v.array(v.string()),
    includes: v.array(v.object({
      item: v.string(),
      quantity: v.number(),
    })),
    gallery: v.array(v.string()),
    others: v.array(v.string()), // Product IDs
  }),

  orders: defineTable({
    userId: v.string(),
    items: v.array(v.object({
      productId: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
    })),
    total: v.number(),
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('shipped'),
      v.literal('delivered')
    ),
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
  }).index('by_user', ['userId']),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.object({
      street: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    })),
  }).index('by_email', ['email']),
});