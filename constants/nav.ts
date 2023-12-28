import { IMenuItem } from '@/interfaces/nav';
import { RESTRICTED_APP_ROUTES } from './routes';

export const USER_NAV_ITEMS: IMenuItem[] = [
  {
    icon: '/assets/icons/products-icon.svg',
    activeIcon: '/assets/icons/products-active-icon.svg',
    label: 'IoTGPT',
    href: RESTRICTED_APP_ROUTES.IOTGPT,
  },
  {
    icon: '/assets/icons/projects-icon.svg',
    activeIcon: '/assets/icons/projects-active-icon.svg',
    label: 'Projects',
    href: RESTRICTED_APP_ROUTES.PROJECTS,
  },
  {
    icon: '/assets/icons/messages-icon.svg',
    activeIcon: '/assets/icons/messages-active-icon.svg',
    label: 'Messages',
    href: RESTRICTED_APP_ROUTES.MESSAGES,
  },
  {
    icon: '/assets/icons/quotes-icon.svg',
    activeIcon: '/assets/icons/quotes-active-icon.svg',
    label: 'Quotes',
    href: RESTRICTED_APP_ROUTES.QUOTES,
  },
  {
    icon: '/assets/icons/quotes-icon.svg',
    activeIcon: '/assets/icons/vendors-active-icon.svg',
    label: 'Vendors',
    href: RESTRICTED_APP_ROUTES.VENDORS,
  },
  {
    icon: '/assets/icons/quotes-icon.svg',
    activeIcon: '/assets/icons/vendors-active-icon.svg',
    label: 'Bots',
    href: RESTRICTED_APP_ROUTES.BOT,
  },
];

export const PROVIDER_NAV_ITEMS = [
  {
    icon: '/assets/icons/projects-icon.svg',
    activeIcon: '/assets/icons/projects-active-icon.svg',
    label: 'My Company',
    href: RESTRICTED_APP_ROUTES.MY_COMPANY,
  },
  {
    icon: '/assets/icons/messages-icon.svg',
    activeIcon: '/assets/icons/messages-active-icon.svg',
    label: 'Messages',
    href: RESTRICTED_APP_ROUTES.MESSAGES,
  },
  {
    icon: '/assets/icons/quotes-icon.svg',
    activeIcon: '/assets/icons/quotes-active-icon.svg',
    label: 'Quotes',
    href: RESTRICTED_APP_ROUTES.QUOTES,
  },
];
