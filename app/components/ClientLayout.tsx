'use client';

import { ConvexProvider } from "convex/react";
import convex from "../lib/convexClient";
import Navbar from "./layout/Navbar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ConvexProvider client={convex}>
      <Navbar />
      {children}
    </ConvexProvider>
  );
}