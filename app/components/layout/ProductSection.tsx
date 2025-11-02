'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

const ProductSection = () => {
  return (
    <section className=" px-6">
      {/* ===== Product 1: ZX7 Speaker ===== */}
      <div className="max-w-[1110px] mx-auto relative rounded-lg overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/home/desktop/image-speaker-zx7.jpg"
            alt="ZX7 Speaker Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex items-center h-[320px] px-8 md:px-16">
          <div className="text-black">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              ZX7 SPEAKER
            </h2>
            <Link href="/products/zx7-speaker">
              <Button variant="black" size="lg">
                See Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Product 2: YX1 Earphones ===== */}
      <div className="max-w-[1110px] mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src="/assets/home/desktop/image-earphones-yx1.jpg"
            alt="YX1 Earphones"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="bg-[#F1F1F1] rounded-lg flex items-center justify-center md:justify-start px-8 md:px-16 py-10">
          <div className="text-black text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              YX1 EARPHONES
            </h2>
            <Link href="/products/yx1-earphones">
              <Button variant="secondary" size="lg">
                See Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
