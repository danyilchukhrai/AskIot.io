import { ReactNode } from 'react';

export interface IMenuItem {
  icon: string;
  activeIcon: string;
  label: ReactNode;
  href: string;
}
