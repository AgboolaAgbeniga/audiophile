"use client";
import React, { useState } from 'react';

interface CounterProps {
  count?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  min?: number;
  max?: number;
  size?: 'default' | 'small';
}

export function Counter({
  count: initialCount = 1,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  size = 'default'
}: CounterProps) {
  const [internalCount, setInternalCount] = useState(initialCount);
  const count = onIncrement ? initialCount : internalCount;

  const handleIncrement = () => {
    if (onIncrement) {
      onIncrement();
    } else {
      setInternalCount(prev => Math.min(prev + 1, max));
    }
  };

  const handleDecrement = () => {
    if (onDecrement) {
      onDecrement();
    } else {
      setInternalCount(prev => Math.max(prev - 1, min));
    }
  };

  const sizeClasses = size === 'small' ? 'px-3 py-2 text-sm' : 'px-4 py-3';

  return (
    <div className={`flex items-center bg-gray-100 ${size === 'small' ? 'w-24 h-8' : ''}`}>
      <button
        onClick={handleDecrement}
        disabled={count <= min}
        className={`${sizeClasses} text-black hover:text-primary font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        -
      </button>
      <span className={`${sizeClasses} font-bold`}>{count}</span>
      <button
        onClick={handleIncrement}
        disabled={count >= max}
        className={`${sizeClasses} text-black hover:text-primary font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        +
      </button>
    </div>
  );
}