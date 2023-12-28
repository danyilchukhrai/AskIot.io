import { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface IPublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: FC<IPublicLayoutProps> = ({ children }) => {
  return (
    <div className="page-wrapper flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 md:mt-0 mt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
