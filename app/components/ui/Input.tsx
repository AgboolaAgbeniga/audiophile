'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  'w-full h-[56px] px-4 py-3 font-medium text-[14px] rounded-md focus:outline-none transition-colors duration-200',
  {
    variants: {
      state: {
        default: 'border border-border bg-white text-black placeholder:text-black/40 hover:border-primary-hover',
        active: 'border border-primary bg-white text-black focus:ring-1 focus:ring-primary caret-primary',
        error: 'border border-[#CD2C2C] bg-white text-black placeholder:text-black/40',
      },
      size: {
        default: 'md:w-[309px]',
        address: 'md:w-[634px]',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, size, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const currentState = error ? 'error' : isFocused ? 'active' : 'default';

    return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          {label && (
            <label className={cn('text-[12px] font-bold', error ? 'text-[#CD2C2C] ' : 'text-black')}>
              {label}
            </label>
          )}
          {error && <span className="text-[#CD2C2C] text-[12px] font-medium leading-tight">{error}</span>}
        </div>
        <input
          className={cn(inputVariants({ state: currentState, size, className }))}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };