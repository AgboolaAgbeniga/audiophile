'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const radioVariants = cva(
  'flex items-center gap-3 w-[309px] h-[56px] px-4 font-bold text-[14px] rounded-lg cursor-pointer transition-colors',
  {
    variants: {
      state: {
        default: 'border border-border text-black/40',
        active: 'border border-primary text-black',
        hover: 'border border-primary-hover text-black/60',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof radioVariants> {
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, state, label, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      props.onChange?.(e);
    };

    return (
      <label className={cn(radioVariants({ state, className }))}>
        <span className="relative flex items-center justify-center">
          <input
            type="radio"
            ref={ref}
            checked={checked}
            onChange={handleChange}
            className={cn(
              'appearance-none w-5 h-5 border-2 border-border rounded-full cursor-pointer transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white'
            )}
            {...props}
          />
          {/* Inner dot */}
          <span
            className={cn(
              'pointer-events-none absolute w-2.5 h-2.5 rounded-full bg-primary scale-0 transition-transform duration-150',
              checked && 'scale-100'
            )}
          />
        </span>
        {label}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export { Radio, radioVariants };
