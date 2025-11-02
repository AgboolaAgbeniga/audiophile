'use client';

import React from 'react';

const InfoSection = () => {
  return (
    <section className="px-6">
      <div className="max-w-[1110px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 h-[588px]">
        {/* Left: Text */}
        <div className="flex items-center justify-center md:justify-start px-8 md:px-16 order-2 md:order-1">
          <div className="text-black text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Bringing you the <span className='text-primary'>best</span> audio gear
            </h2>
            <p className="text-sm text-black/50 md:text-base leading-relaxed">
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="rounded-lg overflow-hidden order-1 md:order-2">
          <img
            src="/assets/shared/desktop/image-best-gear.jpg"
            alt="Best Audio Gear"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;