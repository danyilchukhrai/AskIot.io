import clsx from 'clsx';
import { FC, ReactNode } from 'react';

type AlertVariant = 'success' | 'info' | 'error';

interface IAlertProps {
  variant?: AlertVariant;
  label: ReactNode;
}

const Alert: FC<IAlertProps> = ({ variant = 'success', label }) => {
  return (
    <div
      className={clsx(
        'px-4 py-2 rounded-[100px] text-gray-700 text-base flex items-center w-fit shadow-l',
        {
          'bg-white': variant === 'success',
        },
      )}
    >
      {variant === 'success' && (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--toastify-icon-color-success)">
          <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
        </svg>
      )}
      <div className="ml-2">{label}</div>
    </div>
  );
};

export default Alert;
