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
    icon: '/assets/icons/quotes-icon.svg',
    activeIcon: '/assets/icons/quotes-active-icon.svg',
    label: 'Quotes',
    href: RESTRICTED_APP_ROUTES.QUOTES,
  },
];

export const PROVIDER_NAV_ITEMS: IMenuItem[] = [
  {
    icon: '/assets/icons/projects-icon.svg',
    activeIcon: '/assets/icons/projects-active-icon.svg',
    label: 'My Company',
    href: RESTRICTED_APP_ROUTES.MY_COMPANY,
  },
  {
    icon: '/assets/icons/quotes-icon.svg',
    activeIcon: '/assets/icons/quotes-active-icon.svg',
    label: 'Quote Requests',
    href: RESTRICTED_APP_ROUTES.VENDOR_QUOTES,
  },
  {
    icon: '/assets/icons/leads.svg',
    activeIcon: '/assets/icons/leads-active.svg',
    label: 'Leads',
    href: RESTRICTED_APP_ROUTES.VENDOR_LEADS,
  },
];

export const BOT_LIVE_NAV_ITEMS: IMenuItem[] = [
  {
    icon: '/assets/icons/bot-ai-icon.svg',
    activeIcon: '/assets/icons/bot-ai-active-icon.svg',
    label: 'Bots',
    href: RESTRICTED_APP_ROUTES.BOT,
  },
  {
    icon: '/assets/icons/bot-ai-icon.svg',
    activeIcon: '/assets/icons/bot-ai-active-icon.svg',
    label: 'Bots',
    href: RESTRICTED_APP_ROUTES.BOT,
    children: [
      {
        icon: '/assets/icons/bot-files-icon.png',
        activeIcon: '/assets/icons/bot-files-active-icon.png',
        label: 'Add files',
        href: RESTRICTED_APP_ROUTES.BOT_LIVE_TRAIN,
      },
      {
        icon: '/assets/icons/bot-link-icon.svg',
        activeIcon: '/assets/icons/bot-link-active-icon.svg',
        label: 'Add Links',
        href: RESTRICTED_APP_ROUTES.BOT_LIVE_LINK,
      },
      {
        icon: '/assets/icons/messages-icon.svg',
        activeIcon: '/assets/icons/messages-active-icon.svg',
        label: 'Chat Messages',
        href: RESTRICTED_APP_ROUTES.BOT_LIVE_CHAT,
      }
    ]
  },
];