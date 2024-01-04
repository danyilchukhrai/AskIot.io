'use client';
import Button from '@/components/Button';
import { FC, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Badge, { ColorType } from '@/components/Badge';
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
import { getQuoteStatus } from '@/containers/quotes/utils';
import { QUOTE_STATUS, colorByStatus } from '@/constants/quotes';
import { submitQuoteSchema } from '@/validations/quotes';
import SubmitQuoteModal from './SubmitQuoteModal';

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
  const [isQuoteRejectLoading, setIsQuoteRejectLoading] = useState(false);
  const [isQuoteAccepted, setIsQuoteAccepted] = useState(false);
  const [isQuoteRejected, setIsQuoteRejected] = useState(false);
  const [submitQuoteModalIsValid, setSubmitQuoteIsValid] = useState(false);

  // const form = useForm<IProviderFormData>({
  //   defaultValues: {
  //     offeredPrice: Number(quoteDetails?.offered_price || 0),
  //     vendorNotes: quoteDetails?.vendor_to_user_message || '',
  //   },
  //   resolver: yupResolver(submitQuoteSchema),
  // });
  const [providerFormData, setProviderFormData] = useState<IProviderFormData>({
    offeredPrice: Number(quoteDetails?.offered_price || 0),
    vendorNotes: quoteDetails?.vendor_to_user_message || '',
  });
  const [vendorNotesIsValid, setVendorNotesIsValid] = useState(true);
  const [offeredPriceIsValid, setOfferedPriceIsValid] = useState(true);
  const IS_PROVIDER = currentUserType === USER_TYPE.PROVIDER;
  const IS_USER = currentUserType === USER_TYPE.USER;

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
  const handleRejectQuote = async () => {
    try {
      setIsQuoteRejectLoading(true);
      const acceptQuoteData = await askIOTApiFetch(
        `${API_ENDPOINT}/private/quotes/${quoteDetails?.quote_id}/reject`,
        {},
        'POST',
      );
      setIsQuoteRejected(true);
      toast?.success('Quote Rejected Success');
      setIsQuoteRejectLoading(false);
    } catch (error: any) {
      const errorData = await error?.json();
      setIsQuoteRejectLoading(false);
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
      setSubmitQuoteIsValid(false);
    } catch (error: any) {
      const errorData = await error?.json();
      setIsLoading(false);
      toast?.error(errorData?.details || 'Failed to accept quote');
    }
  };

  const quoteSubmitHandler = () => {
    if (!providerFormData?.vendorNotes?.trim()?.length) {
      setVendorNotesIsValid(false);
      return;
    }
    if (!providerFormData?.offeredPrice) {
      setOfferedPriceIsValid(false);
      return;
    }
    setSubmitQuoteIsValid(true);
  };

  const quoteStatus = getQuoteStatus(quoteDetails?.status);

  return (
    <>
      {submitQuoteModalIsValid && (
        <SubmitQuoteModal
          onSuccess={handleSubmitQuote}
          onClose={() => setSubmitQuoteIsValid(false)}
          buttonLoading={isLoading}
        />
      )}
      <div className="request-quote-container md:p-8 p-4">
        <Button className="flex" variant="secondary" onClick={handleBack}>
          <Image src="/assets/icons/arrow-left-icon.svg" alt="arrow left" width={20} height={20} />
          <span className="ml-2.5">Back</span>
        </Button>
        <div className="quote-request md:p-6 p-4 shadow rounded-xl flex items-center justify-between mt-5 md:flex-row flex-col">
          <div>
            <div className="flex items-center">
              <p className="text-black text-l md:text-xl font-medium mr-4">
                {quoteDetails?.productDetails?.Product?.[0]?.product_name}
              </p>
              <Badge
                label={quoteStatus}
                color={colorByStatus[quoteDetails?.status as QUOTE_STATUS] as ColorType}
                size={isMobileMatches ? 'small' : 'default'}
              />
            </div>
            <p className="text-primary-500 font-medium text-s mt-1.5">
              <span>{quoteDetails?.productDetails?.Product?.[0]?.device_type}</span>
            </p>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            {IS_USER ? (
              <Button
                onClick={handleAcceptQuote}
                disabled={
                  isLoading ||
                  quoteDetails?.status !== QUOTE_STATUS.VendorResponded ||
                  isQuoteAccepted
                }
              >
                {quoteDetails?.status === QUOTE_STATUS.Accepted || isQuoteAccepted
                  ? 'Accepted'
                  : `${isLoading ? 'Accept Quote...' : 'Accept Quote'}`}
              </Button>
            ) : (
              <>
                {quoteDetails?.status === QUOTE_STATUS.Accepted || (
                  <Button
                    onClick={handleRejectQuote}
                    variant="secondary"
                    className="mr-2"
                    disabled={isQuoteRejectLoading || isQuoteAccepted || isQuoteRejected}
                  >
                    {isQuoteRejectLoading ? 'Reject Quote...' : 'Reject Quote'}
                  </Button>
                )}

                <Button
                  onClick={quoteSubmitHandler}
                  disabled={
                    isLoading ||
                    quoteDetails?.status === QUOTE_STATUS.Accepted ||
                    quoteDetails?.status === QUOTE_STATUS.Rejected
                  }
                >
                  Submit Quote
                </Button>
              </>
            )}
          </div>
        </div>

        <QuoteDetailOverview
          onOpenChatDrawer={handleOpenChatDrawer}
          quoteDetails={quoteDetails}
          providerFormData={providerFormData}
          setProviderFormData={setProviderFormData}
          vendorNotesIsValid={vendorNotesIsValid}
          offeredPriceIsValid={offeredPriceIsValid}
          setVendorNotesIsValid={setVendorNotesIsValid}
          setOfferedPriceIsValid={setOfferedPriceIsValid}
        />
      </div>
      <Drawer className="max-w-[458px]" ref={chatDrawerRef} disabledPaddingX disabledPaddingY>
        <ChatWithVendor />
      </Drawer>
    </>
  );
};

export default QuoteDetail;
