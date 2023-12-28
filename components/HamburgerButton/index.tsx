import { FC } from 'react';
import Button, { IButtonProps } from '../Button';
import Image from 'next/image';

interface IHamburgerButtonProps extends IButtonProps {}

const HamburgerButton: FC<IHamburgerButtonProps> = (props) => {
  return (
    <button {...props} className="p-3 bg-primary-1000 rounded-[10px]">
      <Image src="/assets/icons/hamburger-icon.svg" width={24} height={24} alt="icon" />
    </button>
  );
};

export default HamburgerButton;
