import React from 'react';
import { products } from '../data/products';
import { Button } from '../components/ui/Button';
import Category from '../components/layout/Category';
import InfoSection from '../components/layout/InfoSection';
import Footer from '../components/layout/Footer';
import Link from 'next/link';

const HeadphonesPage = () => {
  const headphones = products.filter(product => product.category === 'headphones');

  return (
    <div>
      {/* Title Section */}
      <section className="w-full h-[239px] bg-[#141414] flex items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">HEADPHONES</h2>
      </section>

      {/* Products */}
      <div className="container mx-auto px-6 py-16 space-y-32 max-w-[1110px]">
        {headphones.map((product, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={product.id}
              className={`max-w-[1110px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                isEven ? '' : 'md:grid-flow-col-dense'
              }`}
            >
              {/* Product Image */}
              <div className={`rounded-lg overflow-hidden ${isEven ? '' : 'md:col-start-2'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className={`flex flex-col justify-center px-8 md:px-16 ${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
                <div className="text-black text-center md:text-left">
                  {index === 0 && (
                    <span className="inline-block text-white/49 text-sm font-normal uppercase tracking-[10px] px-3 py-1 rounded mb-6 bg-[#979797]">
                      New Product
                    </span>
                  )}
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed mb-8">
                    {product.description}
                  </p>
                  <Link href={`/products/${product.slug}`}>
                    <Button variant="primary" size="lg">
                      See Product
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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

export default HeadphonesPage;