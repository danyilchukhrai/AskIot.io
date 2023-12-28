import { ButtonHTMLAttributes, FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface ICloseButtonMobileProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButtonMobile: FC<ICloseButtonMobileProps> = (props) => {
  return (
    <button
      {...props}
      className={clsx('md:hidden p-3 rounded-[10px] bg-primary-1000', props.className)}
    >
      <Image
        className="md:w-6 md:h-6 w-5 h-5"
        src="/assets/icons/x-mark-icon.svg"
        alt="X mark icon"
        width={24}
        height={24}
      />
    </button>
  );
};

export default CloseButtonMobile;
