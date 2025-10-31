'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const Counter = React.forwardRef<HTMLDivElement, CounterProps>(
  ({ initialValue = 1, min = 1, max = 99, onChange, className }, ref) => {
    const [value, setValue] = useState(initialValue);

    const handleIncrement = () => {
      if (value < max) {
        const newValue = value + 1;
        setValue(newValue);
        onChange?.(newValue);
      }
    };

    const handleDecrement = () => {
      if (value > min) {
        const newValue = value - 1;
        setValue(newValue);
        onChange?.(newValue);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between w-[120px] h-[48px] bg-light-lighter border border-border',
          className
        )}
      >
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className="flex items-center justify-center w-10 h-full text-black/25 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="text-[16px] leading-[18px] font-bold">-</span>
        </button>

        <span className="text-black font-bold text-[14px]">{value}</span>

        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className="flex items-center justify-center w-10 h-full text-black/25 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="text-[16px] leading-[18px] font-bold">+</span>
        </button>
      </div>
    );
  }
);

Counter.displayName = 'Counter';

export { Counter };