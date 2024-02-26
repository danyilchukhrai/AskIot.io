'use client';
import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import PublicLayout from '@/components/PublicLayout';
import { useAuthContext } from '@/providers/AuthProvider';
import { VendorDetailContext } from '@/providers/PublicVendorDetailProvider';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const { user, isFetching } = useAuthContext();

  const handleAskAnything = () => {
    setIsOpenChat(true);
  };

  if (isFetching) return <LoadingIndicator />;

  if (!user)
    return (
      <PublicLayout
        hideAuthButtons
        headerButtonComponent={
          <Button className="flex items-center" variant="info" onClick={handleAskAnything}>
            <Image src="/assets/logo/logo-white.svg" width={20} height={20} alt="AskIoT" />
            <span className="ml-2.5">Ask about this provider</span>
          </Button>
        }
      >
        <VendorDetailContext.Provider value={{ isOpenChat, setIsOpenChat }}>
          <div className="container">{children}</div>
        </VendorDetailContext.Provider>
      </PublicLayout>
    );

  return (
    <VendorDetailContext.Provider value={{ isOpenChat, setIsOpenChat }}>
      {children}
    </VendorDetailContext.Provider>
  );
}
