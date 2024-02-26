import Link from 'next/link';
import { FC } from 'react';

interface IFooterProps {}

const SOCIAL_ICONS_SRC = [
  '/assets/icons/linkedin-icon.svg',
  // '/assets/icons/youtube-icon.svg',
  // '/assets/icons/twitter-icon.svg',
];

const FOOTER_NAV_ITEMS = [
  {
    title: 'Product',
    navItems: [
      {
        label: 'Features',
        link: '/',
      },
      {
        label: 'Integrations',
        link: '/',
      },
      {
        label: 'Pricing',
        link: '/',
      },
      {
        label: 'Changelog',
        link: '/',
      },
    ],
  },
  {
    title: 'Company',
    navItems: [
      {
        label: 'About us',
        link: '/',
      },
      {
        label: 'Blog',
        link: '/',
      },
      {
        label: 'Careers',
        link: '/',
      },
      {
        label: 'Customers',
        link: '/',
      },
    ],
  },
  {
    title: 'Resources',
    navItems: [
      {
        label: 'Community',
        link: '/',
      },
      {
        label: 'contact',
        link: '/',
      },
      {
        label: 'Privacy Policy',
        link: '/',
      },
      {
        label: 'Terms of service',
        link: '/',
      },
    ],
  },
  {
    title: 'Developers',
    navItems: [
      {
        label: 'API',
        link: '/',
      },
      {
        label: 'Status',
        link: '/',
      },
      {
        label: 'GitHub',
        link: '/',
      },
    ],
  },
];

const Footer: FC<IFooterProps> = (props) => {
  return (
    <footer className="bg-black pt-12 pb-8">
      <div className="container">
        <div className="footer-top pb-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-gray-300 text-xl font-medium leading-[18px]">US Office</p>
            <Link
              className="text-gray-500 text-base pt-4 pb-2 inline-block leading-[18px]"
              href="/"
            >
              © Askiot.AI
            </Link>
            <p className="text-gray-500 text-base leading-[18px]">
              5830 Granite Parkway Suite 81, Plano, TX 75024
            </p>
          </div>
          <Link
            className="text-gray-300 text-3xl font-semibold leading-[18px]"
            href="https://www.linkedin.com/company/askiot/"
          >
            LinkedIn
          </Link>
        </div>
        <div className="footer-bottom flex justify-center items-center pt-6">
          <ul className="flex items-center">
            <li className="mr-5">
              <Link className="text-gray-1100 text-base" href="/">
                © Askiot.AI
              </Link>
            </li>
            <li className="mr-5">
              <Link className="text-gray-1100 text-base" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-gray-1100 text-base" href="/terms">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
