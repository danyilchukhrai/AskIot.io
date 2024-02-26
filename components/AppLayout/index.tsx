'use client';

import { useAuthContext } from '@/providers/AuthProvider';
import SavedProductsProvider from '@/providers/SavedProductsProvider';
import { FC, ReactNode } from 'react';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

interface IAppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) return <>{children}</>;
  return (
    <SavedProductsProvider>
      <div id="page-wrapper" className="page-wrapper">
        <MobileHeader />
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="ml:0 mt-[79px] md:mt-0 md:ml-65">
          <main className="bg-gray md:bg-inherit">{children}</main>
        </div>
      </div>
    </SavedProductsProvider>
  );
};

export default AppLayout;
