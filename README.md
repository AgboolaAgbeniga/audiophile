# Audiophile

A premium audio equipment e-commerce platform built with Next.js, TypeScript, and Convex.

## Project Structure

```
audiophile/
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── STYLE_GUIDE.md
├── tailwind.config.ts
├── tsconfig.json
│
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── api/
│   │   ├── send-email/route.ts
│   │   └── webhook/route.ts
│   │
│   ├── cart/
│   │   └── page.tsx
│   │
│   ├── checkout/
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ClientLayout.tsx
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartModal.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── checkout/
│   │   │   └── CheckoutForm.tsx
│   │   ├── layout/
│   │   │   ├── Category.tsx
│   │   │   ├── CategorySection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── InfoSection.tsx
│   │   │   ├── Menu.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── ProductSection.tsx
│   │   ├── products/
│   │   │   ├── MenuCard.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductGallery.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Counter.tsx
│   │       ├── index.ts
│   │       ├── Input.tsx
│   │       └── Radio.tsx
│   │
│   ├── contexts/
│   │   └── CartContext.tsx
│   │
│   ├── data/
│   │   └── products.ts
│   │
│   ├── earphones/
│   │   └── page.tsx
│   │
│   ├── headphones/
│   │   └── page.tsx
│   │
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useFormValidation.ts
│   │   └── useModal.ts
│   │
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── convexClient.ts
│   │   ├── email.ts
│   │   ├── formatCurrency.ts
│   │   ├── utils.ts
│   │   └── validation.ts
│   │
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── speakers/
│   │   └── page.tsx
│   │
│   ├── style-guide/
│   │   └── page.tsx
│   │
│   └── types/
│       ├── order.ts
│       ├── product.ts
│       └── user.ts
│
├── convex/
│   ├── _generated/
│   │   ├── api.d.ts
│   │   ├── api.js
│   │   ├── dataModel.d.ts
│   │   ├── server.d.ts
│   │   └── server.js
│   ├── queries.ts
│   ├── schema.ts
│   ├── seed.ts
│   └── mutations.ts
│
├── public/
│   ├── assets/
│   ├── email-logo.png
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
└── .env.local
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Convex
- **State Management**: React Hooks and Context
- **Form Validation**: Custom hooks
- **Email**: Nodemailer with custom service
- **Animations**: Framer Motion
- **Icons**: SVG icons

## Features

- Product catalog with category pages (headphones, speakers, earphones)
- Detailed product pages with image galleries
- Shopping cart with modal and dedicated cart page
- Checkout process with comprehensive form validation
- Order confirmation with email notifications
- Responsive design across desktop, tablet, and mobile
- Type-safe development with TypeScript
- Real-time database with Convex
- Custom email service for order confirmations
- Smooth animations with Framer Motion
- Context-based state management for cart

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
