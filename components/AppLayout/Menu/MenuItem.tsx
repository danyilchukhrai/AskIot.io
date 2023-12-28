'use client';
import { USER_TYPE } from '@/configs/routeConfig';
import { IMenuItem } from '@/interfaces/nav';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

interface IMenuItemProps {
  menuItem: IMenuItem;
  onCloseSidebar?: () => void;
}

const MenuItem: FC<IMenuItemProps> = ({ menuItem, onCloseSidebar }) => {
  const router = useRouter();
  const pathName = usePathname();
  const isActive = pathName.includes(menuItem.href);
  const { currentUserType } = useUserTypeContext();

  const handleClickNavItem = () => {
    if (currentUserType === USER_TYPE.PROVIDER_ONBOARDING) return;
    router.push(menuItem.href);
    onCloseSidebar && onCloseSidebar();
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClickNavItem}>
      <Image
        src={isActive ? menuItem.activeIcon : menuItem.icon}
        width={24}
        height={24}
        alt="Menu icon"
      />
      <p
        className={clsx(
          'text-base  ml-3',
          isActive ? 'text-gray-1000 font-semibold' : 'font-medium text-gray-700',
        )}
      >
        {menuItem.label}
      </p>
    </div>
  );
};

export default MenuItem;
