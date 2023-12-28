import HamburgerButton from '@/components/HamburgerButton';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import Sidebar from '../Sidebar';

interface IMobileHeaderProps {}

const MobileHeader: FC<IMobileHeaderProps> = (props) => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <header className="flex justify-between items-center fixed top-0 left-0 right-0 md:hidden h-[79px] p-4 z-20 bg-white">
      <div className="flex items-center">
        <Link href="/app">
          <Image
            className="md:w-10 md:h-10 w-8 h-8"
            src="/assets/logo/logo.svg"
            width={40}
            height={40}
            alt="AskIoT"
          />
        </Link>
        <h1 className="md:text-4xl text-3xl font-medium leading-normal font-['Maven_Pro'] md:ml-3.5 ml-2.5 text-black">
          askIoT
        </h1>
      </div>
      <HamburgerButton disabledPadding onClick={() => setIsShowMenu(true)} />
      {isShowMenu && <Sidebar onCloseSidebar={() => setIsShowMenu(false)} />}
    </header>
  );
};

export default MobileHeader;
