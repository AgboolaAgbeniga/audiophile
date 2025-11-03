'use client';

import { ConvexProvider } from "convex/react";
import convex from "../lib/convexClient";
import { CartProvider } from "../contexts/CartContext";
import Navbar from "./layout/Navbar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ConvexProvider client={convex}>
      <CartProvider>
        <Navbar />
        {children}
      </CartProvider>
    </ConvexProvider>
  );
}