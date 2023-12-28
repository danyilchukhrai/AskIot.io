import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import { USER_TYPE } from '@/configs/routeConfig';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { useGetVendorDetails } from '@/modules/vendors/hooks';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import clsx from 'clsx';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import AskAboutProvider from './components/AskAboutProvider';
import VendorInfo from './components/VendorInfor';
import VendorTabs from './components/VendorTabs';

interface IVendorDetailProps {}

const VendorDetail: FC<IVendorDetailProps> = (props) => {
  const params = useParams();
  const { id: vendorId } = params || {};
  const [isOpenChat, setIsOpenChat] = useState(false);
  const { currentUserType, vendorId: companyVendorId = '' } = useUserTypeContext();
  const { user } = useAuthContext();
  const { data: vendor, isLoading } = useGetVendorDetails((vendorId as string) || companyVendorId);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="flex">
      <div className="flex-1 p-8 max-h-screen overflow-auto">
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
        <VendorTabs vendor={vendor} />
      </div>
      {isOpenChat && (
        <div
          className={clsx('md:w-[32%] md:static fixed top-[79px] left-0 right-0 bottom-0 bg-gray')}
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
