import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', ...props }, ref) => {
    const baseStyles = 'bg-white rounded-lg p-4';
    const variantStyles = {
      default: 'shadow-md',
      bordered: 'border border-gray-200',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  },
);

Card.displayName = 'Card';
