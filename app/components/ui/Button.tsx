'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold uppercase tracking-[1px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-[#D87D4A] text-white h-12 px-8 hover:bg-[#FBAF85] hover:shadow-lg',
        secondary: 'bg-white text-black h-12 px-8 border border-black hover:bg-black hover:text-white',
        tertiary: 'bg-transparent text-white h-12 px-8 hover:text-primary',
        black: 'bg-black text-white h-12 px-8 hover:bg-[#4C4C4C]',
        shop: 'bg-transparent text-black/50 font-bold uppercase hover:text-[#D87D4A] group-hover:text-[#D87D4A] flex items-center gap-[13px]',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loadingText?: string;
  successText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loadingText, successText, children, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading || isSuccess) return;

      setIsLoading(true);
      try {
        await props.onClick?.(e);
        if (successText) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            setIsLoading(false);
          }, 1500);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    const getButtonText = () => {
      if (isLoading) return loadingText || 'Loading...';
      if (isSuccess) return successText || 'Success!';
      return children;
    };

    const getButtonIcon = () => {
      if (isSuccess) {
        return (
          <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      }
      return null;
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        disabled={isLoading || isSuccess || props.disabled}
        {...props}
      >
        {getButtonText()}
        {getButtonIcon()}
      </button>
    );
  }
);
Button.displayName = 'Button';
// https://www.figma.com/design/oyG5ogay2ctAmllg0AgcUJ/audiophile-ecommerce-website--Copy-?m=auto&t=vBZ1MV5b5sCEX58i-6
export { Button, buttonVariants };