'use client';
import Button from '@/components/Button';
import { FC, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Badge from '@/components/Badge';
import QuoteDetailOverview from './QuoteDetailOverview';
import Drawer, { IDrawerElement } from '@/components/Drawer';
import ChatWithVendor from './ChatWithVendor';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAuthContext } from '@/providers/AuthProvider';
import { AUTH_ROUTES } from '@/constants/routes';
import { IQuoteDetails, IProviderFormData } from '@/interfaces/quotes';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { API_ENDPOINT } from '@/configs/appConfig';
import { toast } from 'react-toastify';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { USER_TYPE } from '@/configs/routeConfig';

interface IQuoteDetailProps {
  quoteDetails: IQuoteDetails;
}

const QuoteDetail: FC<IQuoteDetailProps> = ({ quoteDetails }) => {
  const router = useRouter();
  const { currentUserType } = useUserTypeContext();
  const chatDrawerRef = useRef<IDrawerElement>(null);
  const isMobileMatches = useMediaQuery('(max-width: 767px)');
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isQuoteAccepted, setIsQuoteAccepted] = useState(false);
  const [providerFormData, setProviderFormData] = useState<IProviderFormData>({
    offeredPrice: Number(quoteDetails?.offered_price || 0),
    vendorNotes: '',
  });

  const handleBack = () => {
    router.back();
  };

  const handleOpenChatDrawer = () => {
    if (user) {
      chatDrawerRef.current?.open();
    } else {
      router.push(AUTH_ROUTES.LOGIN);
    }
  };

  const handleAcceptQuote = async () => {
    try {
      setIsLoading(true);
      const acceptQuoteData = await askIOTApiFetch(
        `${API_ENDPOINT}/private/quotes/${quoteDetails?.quote_id}/accept`,
        {},
        'POST',
      );
      toast?.success('Quote Accepted Success');
      setIsQuoteAccepted(true);
      setIsLoading(false);
    } catch (error: any) {
      const errorData = await error?.json();
      setIsLoading(false);
      toast?.error(errorData?.details || 'Failed to accept quote');
    }
  };

  const handleSubmitQuote = async () => {
    try {
      setIsLoading(true);
      const submitQuoteData = await askIOTApiFetch(
        `${API_ENDPOINT}/private/quotes/${quoteDetails?.quote_id}/response`,
        providerFormData,
        'POST',
      );
      toast?.success('Quote Submitted Success');
      setIsLoading(false);
    } catch (error: any) {
      const errorData = await error?.json();
      setIsLoading(false);
      toast?.error(errorData?.details || 'Failed to accept quote');
    }
  };

  return (
    <>
      <div className="request-quote-container md:p-8 p-4">
        <Button className="flex" variant="secondary" onClick={handleBack}>
          <Image src="/assets/icons/arrow-left-icon.svg" alt="arrow left" width={20} height={20} />
          <span className="ml-2.5">Back</span>
        </Button>
        <div className="quote-request md:p-6 p-4 shadow rounded-xl flex items-center justify-between mt-5 md:flex-row flex-col">
          <div>
            <div className="flex items-center">
              <p className="text-black text-l md:text-xl font-medium mr-4">Quote</p>
              <Badge
                label={quoteDetails?.status}
                color="orange"
                size={isMobileMatches ? 'small' : 'default'}
              />
            </div>
            <p className="text-gray-600 text-s mt-1.5">
              <span>Quote Id</span>
              <span className=" w-[1px] h-3 bg-gray-200 mx-3 hidden md:inline-block"></span>
              <span className="ml-3">{quoteDetails?.quote_id}</span>
            </p>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            {currentUserType === USER_TYPE.USER ? (
              <Button
                onClick={handleAcceptQuote}
                disabled={
                  isLoading || quoteDetails?.status !== 'vendor_responded' || isQuoteAccepted
                }
              >
                {quoteDetails?.status === 'accepted' || isQuoteAccepted
                  ? 'Accepted'
                  : `Accept Quote${isLoading && '...'}`}
              </Button>
            ) : (
              <Button onClick={handleSubmitQuote} disabled={isLoading}>
                Submit Quote{isLoading && '...'}
              </Button>
            )}
          </div>
        </div>
        <QuoteDetailOverview
          onOpenChatDrawer={handleOpenChatDrawer}
          quoteDetails={quoteDetails}
          providerFormData={providerFormData}
          setProviderFormData={setProviderFormData}
        />
      </div>
      <Drawer className="max-w-[458px]" ref={chatDrawerRef} disabledPaddingX disabledPaddingY>
        <ChatWithVendor />
      </Drawer>
    </>
  );
};

export default QuoteDetail;
