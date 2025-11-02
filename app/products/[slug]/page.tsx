'use client';

import React, { use, useState } from 'react';
import { products } from '../../data/products';
import { notFound } from 'next/navigation';
import Category from '../../components/layout/Category';
import InfoSection from '../../components/layout/InfoSection';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Counter } from '../../components/ui/Counter';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { slug } = use(params);
  const product = products.find(p => p.slug === slug);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  return (
    <div>
      {/* Go Back Link */}
      <div className="container mx-auto px-6 py-8">
        <Link href={`/${product.category}`} className="text-black/50 hover:text-primary transition-colors duration-200">
          Go Back
        </Link>
      </div>

      {/* Product Image and Details */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8 max-w-[1110px] mx-auto border">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-[327px] h-[327px] md:w-[281px] md:h-[480px] lg:w-[540px] lg:h-[560px] object-cover mx-auto md:mx-0"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center border w-full md:w-[445px] mx-auto md:mx-0 text-center md:text-left">
            <h4 className="text-2xl md:text-4xl font-bold mb-4">{product.name}</h4>
            <p className="text-lg text-black/50 mb-6">{product.description}</p>
            <h6 className="text-2xl font-bold mb-8">
              ${product.price.toLocaleString()}
            </h6>

            {/* Quantity Counter and Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <Counter
                count={quantity}
                onIncrement={() => setQuantity(prev => Math.min(prev + 1, 99))}
                onDecrement={() => setQuantity(prev => Math.max(prev - 1, 1))}
              />
              <Button variant="primary" size="lg">
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* Features and In the Box */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-[1110px] mx-auto">
          {/* Desktop and Tablet Layout */}
          <div className="hidden md:flex md:flex-row md:justify-between md:gap-[125px]">
            {/* Features */}
            <div className="w-[635px] h-[318px]">
              <h3 className="text-2xl font-bold mb-6">Features</h3>
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {feature}
                  </p>
                ))}
              </div>
            </div>

            {/* What's in the box */}
            <div className="w-[350px] h-[225px]">
              <h3 className="text-2xl font-bold mb-6">In the box</h3>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="font-bold text-primary mr-4">{item.quantity}x</span>
                    <span className="capitalize">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Features</h3>
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">{feature}</p>
                ))}
              </div>
            </div>

            {/* What's in the box */}
            <div>
              <h3 className="text-2xl font-bold mb-6">In the box</h3>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="font-bold text-primary mr-4">{item.quantity}x</span>
                    <span className="capitalize">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {product.gallery.length > 0 && (
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-[1110px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left column - stacked images */}
              <div className="flex flex-col gap-6 md:gap-8">
                <img
                  src={product.gallery[0]}
                  alt={`${product.name} gallery 1`}
                  className="w-full h-[280px] md:h-[280px] object-cover rounded-lg"
                />
                <img
                  src={product.gallery[1]}
                  alt={`${product.name} gallery 2`}
                  className="w-full h-[280px] md:h-[280px] object-cover rounded-lg"
                />
              </div>

              {/* Right column - single large image */}
              <div className="flex">
                <img
                  src={product.gallery[2]}
                  alt={`${product.name} gallery 3`}
                  className="w-full h-[592px] md:h-[592px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Section */}
      <Category />

      {/* Info Section */}
      <InfoSection />

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;