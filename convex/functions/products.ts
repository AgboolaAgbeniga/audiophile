import { query } from './_generated/server';
import { v } from 'convex/values';

export const getProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query('products').collect();
  },
});

export const getProduct = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('products')
      .filter((q) => q.eq(q.field('category'), args.category))
      .collect();
  },
});