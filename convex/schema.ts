// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }),

  products: defineTable({
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
  }),

  cartItems: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
    addedAt: v.number(),
  }),

  orders: defineTable({
    userId: v.id("users"),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
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
    createdAt: v.number(),
  }),
});
