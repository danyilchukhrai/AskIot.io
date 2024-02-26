import { USER_TYPE } from '@/configs/routeConfig';
import { BOT_LIVE_NAV_ITEMS, PROVIDER_NAV_ITEMS, USER_NAV_ITEMS } from '@/constants/nav';
import { IMenuItem } from '@/interfaces/nav';
import { checkBotStatus } from '@/modules/bots/services';
import { useBotContext } from '@/providers/BotProvider';
import { useUserContext } from '@/providers/UserProvider';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { FC, useEffect, useState } from 'react';
import MenuItem from './MenuItem';

interface IMenuProps {
  onCloseSidebar?: () => void;
}

const Menu: FC<IMenuProps> = (props) => {
  const { currentUserType } = useUserTypeContext();
  const { isNoPaymentStatus } = useUserContext();
  const { goLive } = useBotContext();
  const [navItems, setNavItems] = useState<IMenuItem[]>(USER_NAV_ITEMS);

  const init = async () => {
    const res = await checkBotStatus();
    let items = currentUserType === USER_TYPE.USER ? USER_NAV_ITEMS : PROVIDER_NAV_ITEMS;
    items = items.filter((item) => item.label !== 'Bots');

    if (currentUserType !== USER_TYPE.USER) {
      if (((res.data !== true && res.data !== null) || goLive) && isNoPaymentStatus === false) {
        items.push(BOT_LIVE_NAV_ITEMS[1] as IMenuItem);
      } else {
        items.push(BOT_LIVE_NAV_ITEMS[0] as IMenuItem);
      }
    }
    setNavItems(items);
  };

  useEffect(() => {
    console.log('Menu bar init');
    init();
  }, [currentUserType, goLive, isNoPaymentStatus]);

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
