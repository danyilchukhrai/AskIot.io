import { AUTH_ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import Button from '../Button';

interface IMobileMenuProps {
  menu: {
    label: string;
    href: string;
  }[];
  hideAuthButtons?: boolean;
  headerButtonComponent?: ReactNode;
}

const MobileMenu: FC<IMobileMenuProps> = ({ menu, hideAuthButtons, headerButtonComponent }) => {
  return (
    <div className="menu absolute z-10 bg-white py-6 w-full shadow">
      <nav className="header-nav">
        <ul className="-mx-3 flex flex-col items-center">
          {menu.map((item, index) => (
            <li className="px-3 mb-4" key={index}>
              <Link className="text-l md:text-xl font-medium text-gray-700" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
          {!hideAuthButtons ? (
            <>
              <li className="mb-4">
                <Button variant="inline" link={AUTH_ROUTES.SIGN_UP}>
                  Sign up
                </Button>
              </li>
              <li>
                <Button link={AUTH_ROUTES.LOGIN}>Sign In</Button>
              </li>
            </>
          ) : headerButtonComponent ? (
            <li>{headerButtonComponent}</li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
