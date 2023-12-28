import { USER_TYPE } from '@/configs/routeConfig';
import { PROVIDER_NAV_ITEMS, USER_NAV_ITEMS } from '@/constants/nav';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { FC } from 'react';
import MenuItem from './MenuItem';

interface IMenuProps {
  onCloseSidebar?: () => void;
}

const Menu: FC<IMenuProps> = (props) => {
  const { currentUserType } = useUserTypeContext();
  const navItems = currentUserType === USER_TYPE.USER ? USER_NAV_ITEMS : PROVIDER_NAV_ITEMS;

  return (
    <nav>
      <ul>
        {navItems.map((item, index) => (
          <li className="mb-6 last:mb-0" key={index}>
            <MenuItem {...props} menuItem={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
