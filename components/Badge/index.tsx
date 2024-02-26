import clsx from 'clsx';
import { FC, ReactNode } from 'react';

export type ColorType = 'green' | 'orange' | 'red' | 'gray' | 'blue';
type SizeType = 'default' | 'small';

interface IBadgeProps {
  label: ReactNode;
  color?: ColorType;
  size?: SizeType;
  className?: string;
}

const Badge: FC<IBadgeProps> = ({ label, color = 'green', size = 'default', className = '' }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'green':
        return 'text-green-600 border-green-200 bg-green-100';
      case 'orange':
        return 'text-orange-600 border-orange-200 bg-orange-100';
      case 'red':
        return 'text-red-600 border-red-200 bg-red-100';
      case 'gray':
        return 'text-gray-700 border-gray-200 bg-gray';
      case 'blue':
        return 'text-primary-500 border-primary-200 bg-primary-100';
      default:
        return '';
    }
  };

  const getSizeStyles = () => {
    if (size === 'small') {
      return 'px-1.5 py-0.5 text-xs rounded-[9px]';
    }

    return 'px-2.5 py-[3px] border text-s rounded-[18px]';
  };

  return <p className={clsx(className, getColorStyles(), getSizeStyles(), 'w-fit')}>{label}</p>;
};

export default Badge;
