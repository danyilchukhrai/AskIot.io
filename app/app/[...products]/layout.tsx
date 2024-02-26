'use client';
import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import PublicLayout from '@/components/PublicLayout';
import { useAuthContext } from '@/providers/AuthProvider';
import { ProductDetailContext } from '@/providers/PublicProductDetailProvider';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const [isOpenAskAnything, setIsOpenAskAnything] = useState(false);
  const { user, isFetching } = useAuthContext();

  const handleAskAnything = () => {
    setIsOpenAskAnything(true);
  };

  if (isFetching) return <LoadingIndicator />;

  if (!user)
    return (
      <PublicLayout
        hideAuthButtons
        headerButtonComponent={
          <Button
            className="flex items-center ml-4 w-fit px-2.5"
            variant="info"
            onClick={handleAskAnything}
          >
            <Image
              src="/assets/icons/ask-anything-icon.svg"
              alt="ask anything"
              width={20}
              height={20}
            />
            <span className="md:ml-2.5 text-s md:text-base">Ask anything</span>
          </Button>
        }
      >
        <ProductDetailContext.Provider value={{ isOpenAskAnything, setIsOpenAskAnything }}>
          <div className="container">{children}</div>
        </ProductDetailContext.Provider>
      </PublicLayout>
    );

  return (
    <ProductDetailContext.Provider value={{ isOpenAskAnything, setIsOpenAskAnything }}>
      {children}
    </ProductDetailContext.Provider>
  );
}
