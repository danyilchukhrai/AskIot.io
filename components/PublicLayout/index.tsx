import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface IPublicLayoutProps {
  children: ReactNode;
  hideAuthButtons?: boolean;
  headerButtonComponent?: ReactNode;
}

const PublicLayout: FC<IPublicLayoutProps> = ({
  children,
  hideAuthButtons,
  headerButtonComponent,
}) => {
  return (
    <div className="page-wrapper flex flex-col min-h-screen">
      <Header hideAuthButtons={hideAuthButtons} headerButtonComponent={headerButtonComponent} />
      <main className="flex-1 md:mt-0 mt-16">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default PublicLayout;
