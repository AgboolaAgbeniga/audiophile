"use client";
import React, { useState } from 'react';

interface CounterProps {
  count?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  min?: number;
  max?: number;
}

export function Counter({
  count: initialCount = 1,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99
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

  return (
    <div className="flex items-center bg-gray-100">
      <button
        onClick={handleDecrement}
        disabled={count <= min}
        className="px-4 py-3 text-black hover:text-primary font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className="px-4 py-3 font-bold">{count}</span>
      <button
        onClick={handleIncrement}
        disabled={count >= max}
        className="px-4 py-3 text-black hover:text-primary font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}