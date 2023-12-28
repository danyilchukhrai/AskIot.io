'use client';

import { useAuthContext } from '@/providers/AuthProvider';
import SavedProductsProvider from '@/providers/SavedProductsProvider';
import { FC, ReactNode } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

interface IAppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  const { user, isFetching } = useAuthContext();

  if (isFetching) return <LoadingIndicator />;
  if (!user) return <>{children}</>;
  return (
    <SavedProductsProvider>
      <div id="page-wrapper" className="page-wrapper">
        <MobileHeader />
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="ml:0 mt-[79px] md:mt-0 md:ml-65">
          <main className="bg-gray md:bg-inherit w-full min-h-screen relative">{children}</main>
        </div>
      </div>
    </SavedProductsProvider>
  );
};

export default AppLayout;
