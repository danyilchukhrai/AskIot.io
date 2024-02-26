'use client';
import { AUTH_ROUTES } from '@/constants/routes';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import Button from '../Button';
import HamburgerButton from '../HamburgerButton';
import MobileMenu from './MobileMenu';

interface IHeaderProps {
  isNewLanding?: boolean;
  headerButtonComponent?: ReactNode;
  hideAuthButtons?: boolean;
}

const NAV = [
  {
    label: 'Builders',
    href: '/',
  },
  {
    label: 'Providers',
    href: '/providers',
  },
];

const Header: FC<IHeaderProps> = ({
  isNewLanding = false,
  headerButtonComponent,
  hideAuthButtons,
}) => {
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
          ) : !hideAuthButtons ? (
            <div className="flex items-center gap-2">
              <Button variant="inline" link={AUTH_ROUTES.SIGN_UP}>
                Sign up
              </Button>
              <Button link={AUTH_ROUTES.LOGIN}>Sign In</Button>
            </div>
          ) : headerButtonComponent ? (
            headerButtonComponent
          ) : null}
        </div>
      </div>
      {showMobileMenu && (
        <MobileMenu
          menu={NAV}
          hideAuthButtons={hideAuthButtons}
          headerButtonComponent={headerButtonComponent}
        />
      )}
    </header>
  );
};

export default Header;
