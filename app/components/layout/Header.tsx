'use client';


import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';
import { Button } from '../ui/Button';

const Header = () => {
  const product = useQuery(api.queries.getProductBySlug, { slug: 'xx99-mark-two-headphones' });

  if (!product) {
    return (
      <header className='h-[729px] bg-[#141414] flex items-center'>
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <p>Loading...</p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className='h-[729px] bg-[#141414] flex items-center mb-[80px]'>
      <div className="container mx-auto px-6 flex justify-center  h-full">
        <div className="relative flex flex-col justify-center lg:flex-row lg:justify-between lg:items-center max-w-[1109px] w-full h-[729px]'">
          {/* Product Details */}
          <div className="text-white text-center w-full lg:w-[398px] lg:text-left z-10 relative">
            <span className="inline-block text-white/49 text-sm font-normal uppercase tracking-[10px] px-3 py-1 rounded mb-6">
              New Product
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {product.name}
            </h1>

            <p className="text-white/75  mb-10 leading-relaxed max-w-md mx-auto lg:mx-0">
              {product.description}
            </p>

            <Link href={`/products/${product.slug}`}>
              <Button variant="primary" size="lg">
                See Product
              </Button>
            </Link>
          </div>

          {/* Product Image */}
          <div className="absolute inset-0 h- lg:relative  lg:h-full lg:w-auto ">
            <img
              src="/assets/home/desktop/img-hero.png"
              alt={product.name}
              className=" w-full h-auto lg:h-full lg:w-auto lg:object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;