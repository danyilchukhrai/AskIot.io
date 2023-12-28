import { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface INewLandingLayoutProps {
  children: ReactNode;
}

const NewLandingLayout: FC<INewLandingLayoutProps> = ({ children }) => {
  return (
    <div className="page-wrapper flex flex-col min-h-screen bg-[linear-gradient(180deg,_#FFF_0%,_#F8F9FA_100%)]">
      <Header />
      <main className="flex-1 md:mt-0 mt-[81px]">{children}</main>
      <Footer />
    </div>
  );
};

export default NewLandingLayout;
