'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

const CategorySection = () => {
  return (
    <section className="flex items-center justify-center w-full px-6">
      <div className="container mx-auto flex justify-center">
        <div
          className="
            relative flex flex-col lg:flex-row lg:justify-evenly lg:items-center
            bg-primary text-white rounded-lg overflow-hidden
            w-full max-w-[1109px]
            h-auto lg:h-[560px] py-[64px] md:py-[64px] lg:py-0
            px-6 md:px-10 
          "
        >
          {/* ===== Image Section ===== */}
          <div
            className="
             lg:h-full lg:w-auto flex justify-center items-end object-none 
            "
          >
            {/* Wave Background (Visible across all viewports) */}
            <img
              src="/assets/home/desktop/wave.svg"
              alt="Wave background"
              className=" h-auto lg:w-[944px] absolute  lg:right-[330] lg:top-[-40] md:top-[-200] top-[-50] scale-140 md:scale-none "/>

            {/* Speaker Image */}
            <img
              src="/assets/home/desktop/image-speaker-zx9.png"
              alt="ZX9 Speaker"
              className="
                relative z-10
                w-[180px] md:w-[220px] lg:w-auto
                lg:h-[446px]
                object-contain lg:bottom-[-10] 
              "
            />
          </div>

          {/* ===== Details Section ===== */}
          <div
            className="
              relative z-10 flex flex-col justify-center
              text-center lg:text-left
              items-center lg:items-start
              w-full lg:w-[398px] mt-8
            "
          >
            <h1
              className="
                text-4xl md:text-5xl lg:text-[56px]
                font-bold leading-tight mb-6
              "
            >
              ZX9 <br /> SPEAKER
            </h1>

            <p
              className="
                text-white/75 mb-10 leading-relaxed
                max-w-[349px] mx-auto lg:mx-0
                text-[15px] md:text-[17px]
              "
            >
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>

            <Link href="/headphones">
              <Button
                variant="black"
                size="lg"
                className="uppercase tracking-wider"
              >
                See Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
