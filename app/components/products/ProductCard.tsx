import React from 'react';
import { Doc } from '../../../convex/_generated/dataModel';
import Link from 'next/link';

type Product = Doc<'products'>;

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isNew = false }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Left Grid - Product Image */}
      <div className="order-2 lg:order-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Right Grid - Product Details */}
      <div className="order-1 lg:order-2 text-center lg:text-left">
        {isNew && (
          <span className="inline-block bg-orange-500 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
            New Product
          </span>
        )}

        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
          {product.name}
        </h2>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
          {product.description}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 uppercase tracking-wider transition-colors duration-200"
        >
          See Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;