'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Category from '../../components/layout/Category';
import InfoSection from '../../components/layout/InfoSection';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Counter } from '../../components/ui/Counter';
import { useCart } from '../../contexts/CartContext';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { slug } = use(params);
  const product = useQuery(api.queries.getProductBySlug, { slug });
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-red-500 text-lg mb-4">Product not found.</p>
        <Link href="/" className="text-primary underline">
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Go Back Link */}
      <div className="container mx-auto px- py-8 max-w-[1110px]">
        <Link
          href={`/${product.category}`}
          className="text-black/50 hover:text-primary transition-colors duration-200"
        >
          Go Back
        </Link>
      </div>

      {/* Product Details Section */}
      <section className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 max-w-[1110px] mx-auto">
          {/* Product Image */}
          <div className="w-full max-w-[540px] rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center w-full lg:max-w-[445px] text-center lg:text-left">
            <h4 className="text-2xl md:text-4xl font-bold mb-4">{product.name}</h4>
            <p className="text-base text-black/50 mb-6">{product.description}</p>
            <h6 className="text-xl md:text-2xl font-bold mb-8">
              ${product.price.toLocaleString()}
            </h6>

            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <Counter
                count={quantity}
                onIncrement={() => setQuantity((prev) => Math.min(prev + 1, 99))}
                onDecrement={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              />
              <Button
                variant="primary"
                size="lg"
                successText="Added"
                onClick={() => {
                  if (product) {
                    for (let i = 0; i < quantity; i++) {
                      addItem({
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        slug: product.slug,
                      });
                    }
                  }
                }}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features and In The Box Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-[1110px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
          {/* Features */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Features</h3>
            <div className="space-y-4">
              {product.features.map((feature, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">
                  {feature}
                </p>
              ))}
            </div>
          </div>

          {/* In The Box */}
          <div>
            <h3 className="text-2xl font-bold mb-6">In the Box</h3>
            <ul className="space-y-2">
              {product.includes.map((item, i) => (
                <li key={i} className="text-gray-700 flex items-center">
                  <span className="font-bold text-primary mr-4">
                    {item.quantity}x
                  </span>
                  <span className="capitalize">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      {product.gallery?.length > 0 && (
        <section className="container mx-auto px-6 py-16 mb-32">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[445px_635px] gap-[30px] h-[502px] justify-center">
            {/* Left column (stacked images) */}
            <div className="flex flex-col gap-[30px]">
              {product.gallery.slice(0, 2).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.name} gallery ${i + 1}`}
                  loading="lazy"
                  className="w-[445px] h-[280px] object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Right column (large image) */}
            <div>
              <img
                src={product.gallery[2]}
                alt={`${product.name} gallery 3`}
                loading="lazy"
                className="w-[635px] h-[592px] object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:grid lg:hidden md:grid-cols-[277px_395px] gap-[30px] h-[368px]">
            {/* Left column (stacked images) */}
            <div className="flex flex-col gap-[30px]">
              {product.gallery.slice(0, 2).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.name} gallery ${i + 1}`}
                  loading="lazy"
                  className="w-[277px] h-[174px] object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Right column (large image) */}
            <div className="flex">
              <img
                src={product.gallery[2]}
                alt={`${product.name} gallery 3`}
                loading="lazy"
                className="w-[395px] h-[368px] object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {product.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.name} gallery ${i + 1}`}
                loading="lazy"
                className={`w-full object-cover rounded-lg ${
                  i === product.gallery.length - 1 ? 'h-[368px]' : 'h-[174px]'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* You May Also Like Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-[1110px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 uppercase">You may also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* XX99 MARK I Headphones */}
            <div className="flex flex-col items-center">
              <img
                src="/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg"
                alt="XX99 MARK I Headphones"
                className="w-full h-[318px] object-cover rounded-lg mb-8"
              />
              <h3 className="text-xl font-bold mb-4">XX99 MARK I</h3>
              <Link href="/products/xx99-mark-one-headphones">
                <Button variant="primary" size="lg">
                  See Product
                </Button>
              </Link>
            </div>

            {/* XX59 Headphones */}
            <div className="flex flex-col items-center">
              <img
                src="/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg"
                alt="XX59 Headphones"
                className="w-full h-[318px] object-cover rounded-lg mb-8"
              />
              <h3 className="text-xl font-bold mb-4">XX59</h3>
              <Link href="/products/xx59-headphones">
                <Button variant="primary" size="lg">
                  See Product
                </Button>
              </Link>
            </div>

            {/* ZX9 Speaker */}
            <div className="flex flex-col items-center">
              <img
                src="/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg"
                alt="ZX9 Speaker"
                className="w-full h-[318px] object-cover rounded-lg mb-8"
              />
              <h3 className="text-xl font-bold mb-4">ZX9 SPEAKER</h3>
              <Link href="/products/zx9-speaker">
                <Button variant="primary" size="lg">
                  See Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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