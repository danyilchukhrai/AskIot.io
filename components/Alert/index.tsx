import clsx from 'clsx';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

type AlertVariant = 'success' | 'info' | 'error';

interface IAlertProps {
  variant?: AlertVariant;
  label: ReactNode;
}

const Alert: FC<IAlertProps> = ({ variant = 'success', label }) => {
  return (
    <div
      className={clsx('px-4 py-2 rounded-[100px] text-white text-base flex items-center w-fit', {
        'bg-green-500': variant === 'success',
      })}
    >
      {variant === 'success' && (
        <Image src="/assets/icons/check-circle-icon.svg" alt="" width={20} height={20} />
      )}
      <div className="ml-2">{label}</div>
    </div>
  );
};

export default Alert;
