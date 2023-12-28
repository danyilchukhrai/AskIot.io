'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import TypeFormPopupButton from '../TypeFormPopupButton';
import { JOIN_WAITLIST_TYPEFORM_ID } from '@/constants/typeform';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import clsx from 'clsx';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import HamburgerButton from '../HamburgerButton';

interface IHeaderProps {
  isNewLanding?: boolean;
}

const NAV = [
  {
    label: 'Solution Builders',
    href: '/',
  },
  {
    label: 'Providers',
    href: '/providers',
  },
];

const Header: FC<IHeaderProps> = ({ isNewLanding = false }) => {
  const isShowHamburger = useMediaQuery('(max-width: 767px)');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header
      className={clsx(
        'md:pt-8 pt-4 fixed top-0 right-0 left-0 md:static bg-white z-10 min-h-16 md:min-h-auto',
        {
          'md:pb-6 pb-4 border-b border-gray-200': isNewLanding,
        },
      )}
    >
      <div className="container flex items-center justify-between flex-wrap">
        <div className="header-left flex items-center">
          <Link className="flex items-center" href="/">
            <Image src="/assets/logo/logo.svg" width={40} height={40} alt="AskIoT" />
            <h1 className="text-3xl md:text-4xl font-medium font-['Maven_Pro'] text-black ml-3.5">
              askIoT
            </h1>
          </Link>
          {!isShowHamburger && (
            <nav className="header-nav ml-20">
              <ul className="-mx-3 flex items-center">
                {NAV.map((item, index) => (
                  <li className="px-3" key={index}>
                    <Link className="text-l md:text-m font-medium text-gray-700" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        <div className="header-right">
          {isShowHamburger ? (
            <HamburgerButton onClick={() => setShowMobileMenu((prev) => !prev)} />
          ) : (
            <TypeFormPopupButton typeformId={JOIN_WAITLIST_TYPEFORM_ID} className="text-l px-6">
              Join Waitlist
            </TypeFormPopupButton>
          )}
        </div>
      </div>
      {showMobileMenu && <MobileMenu menu={NAV} />}
    </header>
  );
};

export default Header;
