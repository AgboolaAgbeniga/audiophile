import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const inputVariants = cva(
  'w-[309px] h-[56px] px-4 py-3 font-medium text-[14px] rounded-md focus:outline-none transition-colors duration-200',
  {
    variants: {
      state: {
        default: 'border border-border bg-light-lighter text-black/40 placeholder:text-black/40 hover:border-primary-hover',
        active: 'border border-primary bg-white text-black focus:ring-1 focus:ring-primary caret-primary',
        error: 'border border-error text-error placeholder:text-error',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className={cn('block mb-1', error ? 'text-error' : 'text-black')}>
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ state, className }))}
          ref={ref}
          {...props}
        />
        {error && <p className="text-error text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };