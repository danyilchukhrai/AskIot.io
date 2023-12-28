import { FC } from 'react';
import Link from 'next/link';
import TypeFormPopupButton from '../TypeFormPopupButton';
import { JOIN_WAITLIST_TYPEFORM_ID } from '@/constants/typeform';

interface IMobileMenuProps {
  menu: {
    label: string;
    href: string;
  }[];
}

const MobileMenu: FC<IMobileMenuProps> = ({ menu }) => {
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
          <li>
            <TypeFormPopupButton typeformId={JOIN_WAITLIST_TYPEFORM_ID} className="text-l px-6">
              Join Waitlist
            </TypeFormPopupButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
