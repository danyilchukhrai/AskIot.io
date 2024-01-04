import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import Spinner from '../Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'inline' | 'info' | 'error';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  disabledPadding?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      variant = 'primary',
      className,
      disabledPadding = false,
      fullWidth = false,
      isLoading = false,
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={clsx(
          'text-s md:text-base font-medium rounded-lg',
          {
            'shadow-s text-white bg-gray-1000 hover:bg-black focus:ring-2 focus:ring-gray-300 focus:bg-black disabled:bg-gray-600 disabled:text-gray-400':
              variant === 'primary',
            'shadow-s text-gray-800 bg-white hover:bg-gray focus:ring-1 focus:ring-black disabled:bg-gray disabled:text-gray-300':
              variant === 'secondary',
            'text-gray-1000 hover:text-black focus:bg-gray focus:text-black disabled:text-gray-200':
              variant === 'inline',
            'text-white bg-primary-500 disabled:bg-primary-400 disabled:text-gray-200':
              variant === 'info',
            'text-white bg-red-500': variant === 'error',
            'flex items-center gap-2': isLoading,
          },
          disabledPadding ? 'p-0' : 'px-3 py-2.5',
          fullWidth ? 'w-full' : 'w-fit',
          className,
        )}
        disabled={disabled || isLoading}
      >
        {isLoading && <Spinner width={22} height={22} />}
        {children}
      </button>
    );
  },
);

export default Button;
