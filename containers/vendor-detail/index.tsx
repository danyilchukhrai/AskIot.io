'use client';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import { USER_TYPE } from '@/configs/routeConfig';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { useGetVendorDetailsBySlug } from '@/modules/vendors/hooks';
import { IVendorDetails } from '@/modules/vendors/type';
import { useAuthContext } from '@/providers/AuthProvider';
import { VendorDetailContext } from '@/providers/PublicVendorDetailProvider';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import clsx from 'clsx';
import Image from 'next/image';
import { FC, useContext, useEffect } from 'react';
import AskAboutProvider from './components/AskAboutProvider';
import VendorInfo from './components/VendorInfor';
import VendorTabs from './components/VendorTabs';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface IVendorDetailProps {
  isVendor?: boolean;
  vendorDetails?: IVendorDetails;
}

const VendorDetail: FC<IVendorDetailProps> = (props) => {
  const { isOpenChat, setIsOpenChat } = useContext(VendorDetailContext);
  const { currentUserType, vendorId: companyVendorId = '' } = useUserTypeContext();
  const { user } = useAuthContext();
  // Only use client-side fetching with vendor mode
  const { data, isLoading } = useGetVendorDetailsBySlug(String(companyVendorId), !!props?.isVendor);
  const vendor = props.isVendor ? data : props.vendorDetails;
  const isMobileMatches = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (!user) {
      if (!isMobileMatches) {
        setIsOpenChat(true);
      }
    }
  }, [user]);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="flex">
      <div className={clsx('flex-1', user ? 'p-8 max-h-screen overflow-auto' : 'p-1 py-8')}>
        {currentUserType === USER_TYPE.USER && user && (
          <div className="header flex items-center justify-between mb-5">
            <BackButton />
            <Button
              className="flex items-center"
              variant="info"
              onClick={() => setIsOpenChat(true)}
            >
              <Image src="/assets/logo/logo-white.svg" width={20} height={20} alt="AskIoT" />
              <span className="ml-2.5">Ask about this provider</span>
            </Button>
          </div>
        )}
        <VendorInfo vendor={vendor} />
        <VendorTabs {...props} vendor={vendor} />
      </div>
      {isOpenChat && (
        <div
          className={clsx('md:w-[32%] md:static fixed top-[79px] left-0 right-0 bottom-0 bg-gray', {
            'md:fixed md:top-0 md:right-0 md:left-unset md:bottom-unset z-50': !user,
          })}
        >
          <AskAboutProvider
            setIsOpenChat={setIsOpenChat}
            vendorId={vendor?.vendorid}
            vendorLogo={vendor?.vendorlogo || DEFAULT_VENDOR_LOGO}
          />
        </div>
      )}
    </div>
  );
};

export default VendorDetail;
