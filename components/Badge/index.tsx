import { FC, ReactNode } from 'react';
import clsx from 'clsx';

export type ColorType = 'green' | 'orange' | 'red' | 'gray';
type SizeType = 'default' | 'small';

interface IBadgeProps {
  label: ReactNode;
  color?: ColorType;
  size?: SizeType;
}

const Badge: FC<IBadgeProps> = ({ label, color = 'green', size = 'default' }) => {
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

  return <p className={clsx(getColorStyles(), getSizeStyles(), 'w-fit')}>{label}</p>;
};

export default Badge;
