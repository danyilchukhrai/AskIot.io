'use client';
import { USER_TYPE } from '@/configs/routeConfig';
import { IMenuItem } from '@/interfaces/nav';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface IMenuItemProps {
  menuItem: IMenuItem;
  onCloseSidebar?: () => void;
}

const MenuItem: FC<IMenuItemProps> = ({ menuItem, onCloseSidebar }) => {
  const pathName = usePathname();
  const { currentUserType } = useUserTypeContext();
  const isProviderOnboarding = currentUserType === USER_TYPE.PROVIDER_ONBOARDING;
  const childrenHref = menuItem?.children?.map((it) => it.href);
  const isActive = pathName.includes(menuItem.href) || childrenHref?.includes(pathName);

  const handleClickNavItem = () => {
    onCloseSidebar && onCloseSidebar();
  };

  return (
    <>
      <Link
        className="flex items-center cursor-pointer"
        href={isProviderOnboarding ? '#' : menuItem.href}
        onClick={handleClickNavItem}
      >
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
      </Link>
      {menuItem?.children !== undefined && isActive && (
        <div className="ml-6 flex flex-col gap-4 pt-6">
          {menuItem?.children?.map((item: IMenuItem, index: number) => {
            return (
              <Link
                key={index}
                className="flex items-center cursor-pointer"
                href={item.href}
                onClick={handleClickNavItem}
              >
                <Image
                  src={pathName.includes(item.href) ? item.activeIcon : item.icon}
                  width={24}
                  height={24}
                  alt="Menu icon"
                />
                <p
                  className={clsx(
                    'text-base  ml-3',
                    pathName.includes(item.href)
                      ? 'text-gray-1000 font-semibold'
                      : 'font-medium text-gray-700',
                  )}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MenuItem;
