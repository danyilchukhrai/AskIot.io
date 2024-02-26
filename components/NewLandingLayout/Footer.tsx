import Link from 'next/link';
import { FC } from 'react';

interface IFooterProps {}

const Footer: FC<IFooterProps> = (props) => {
  return (
    <footer className="bg-gray pt-12 pb-8">
      <div className="container">
        <div className="footer-top pb-6 border-b border-gray-400 flex justify-between items-center">
          <div>
            <p className="text-gray-1100 text-xl font-medium leading-[18px]">US Office</p>
            <Link className="text-gray-1100 text-base pt-[11px] pb-1.5 inline-block" href="/">
              © Askiot.AI
            </Link>
            <p className="text-gray-1100 text-base">
              5830 Granite Parkway Suite 81, Plano, TX 75024
            </p>
          </div>
          <Link
            className="text-gray-1100 text-3xl font-semibold"
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
