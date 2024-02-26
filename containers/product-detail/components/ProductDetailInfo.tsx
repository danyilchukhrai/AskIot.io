'use client';
import Button from '@/components/Button';
import { CustomImg, CustomNextImage } from '@/components/CustomImage';
import Modal, { IModalElement } from '@/components/Modal';
import RequestQuoteModal from '@/components/Molecules/RequestQuoteModal';
import VerifiedQuotesAlternativeModal from '@/components/Molecules/VerifiedQuotesAlternativeModal';
import QuoteRequestedAlert from '@/components/QuoteRequestedAlert';
import QuoteVerification from '@/components/QuoteVerification';
import RequestQuoteButton from '@/components/RequestQuoteButton';
import Tooltip from '@/components/Tooltip';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { AUTH_ROUTES, RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { SUBSCRIPTION_PLANS } from '@/constants/subscription';
import { VERIFIED_VENDOR_MESSAGE } from '@/constants/vendors';
import SaveForm from '@/containers/iotgpt/components/SaveForm';
import { useGetVerifiedAlternateProducts } from '@/modules/product/hooks';
import { IRequestQuoteForm } from '@/modules/quotes/types';
import { useQuoteSnippetContext } from '@/providers/QuotesSnippetsProvider';
import { useSavedProductsContext } from '@/providers/SavedProductsProvider';
import { useUserContext } from '@/providers/UserProvider';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface IProductDetailInfoProps {
  product?: any;
  user?: User;
  alternateDevices?: any;
}

const ProductDetailInfo: FC<IProductDetailInfoProps> = ({
  product,
  user,
  alternateDevices = [],
}) => {
  const router = useRouter();
  const productId = product?.id || product?.product_id;
  const requestQuoteModalRef = useRef<IModalElement>(null);
  const quoteVerificationRef = useRef<IModalElement>(null);
  const verifiedQuotesAlternativeRef = useRef<IModalElement>(null);
  const saveModalRef = useRef<IModalElement>(null);

  const [isShowAlert, setIsShowAlert] = useState(false);
  const [quoteId, setQuoteId] = useState<number>();
  const [requestedQuoteFormData, setRequestedQuoteFormData] = useState<IRequestQuoteForm>();
  const { isSavedProduct } = useSavedProductsContext();
  const saved = isSavedProduct(productId);
  const { askIOTUserDetails } = useUserContext();
  const {
    setGetQuotesSnippetsIsValid,
    quotesSnippets,
    setIsQuoteRequested,
    setIsQuoteRequestedLoading,
  } = useQuoteSnippetContext();
  const { data: verifiedAlternateResponse, isFetching } = useGetVerifiedAlternateProducts(
    Number(productId),
  );
  const { alternate_products_verified = [] } = verifiedAlternateResponse || {};

  const addToQuoteSuccess = (
    quoteId: number,
    formData: IRequestQuoteForm,
    subscriptionPlan: SUBSCRIPTION_PLANS,
  ) => {
    setGetQuotesSnippetsIsValid(true);
    setIsShowAlert(true);
    setQuoteId(quoteId);
    setRequestedQuoteFormData(formData);
    if (
      alternate_products_verified.length &&
      [
        SUBSCRIPTION_PLANS.BUSINESS,
        SUBSCRIPTION_PLANS.ENTERPRISE,
        SUBSCRIPTION_PLANS.PROFESSIONAL,
      ].includes(subscriptionPlan)
    ) {
      verifiedQuotesAlternativeRef.current?.open();
    }
  };

  useEffect(() => {
    if (quotesSnippets) {
      setIsQuoteRequestedLoading(true);
      const quoteRequested = quotesSnippets?.some((item) => item?.product_id === productId);
      if (quoteRequested) {
        setIsQuoteRequested((prevData) => ({ ...prevData, [productId as number]: true }));
      }
      setIsQuoteRequestedLoading(false);
    }
  }, [quotesSnippets]); //eslint-disable-line

  const handleRequestQuote = async () => {
    if (user) {
      if (!askIOTUserDetails?.is_mobile_verified) {
        requestQuoteModalRef.current?.open();
      } else {
        quoteVerificationRef?.current?.open();
      }
    } else {
      router.push(AUTH_ROUTES.LOGIN);
    }
  };

  const onSuccessQuotesVerification = () => {
    quoteVerificationRef?.current?.close();
    requestQuoteModalRef?.current?.open();
  };

  const handleOpenSaveForm = () => {
    if (saved) {
      toast.info('This product is already saved');
      return;
    }
    saveModalRef.current?.open();
  };

  return (
    <>
      <CustomNextImage
        className="w-full h-[221px] rounded-lg block md:hidden"
        src={product?.img || product?.product_image}
        alt={product?.name || ''}
      />
      <div className="md:hidden w-full flex justify-between gap-4 mt-6 bg-white px-5 pt-2.5 pb-3 rounded-t-lg border-b border-gray-1400 flex-wrap">
        <div className="w-full md:w-[45%] break-all">
          <Link
            href={`${RESTRICTED_APP_ROUTES.VENDORS}/${product?.vendorslug}`}
            className="text-gray-1000 text-3xl font-medium flex items-center gap-1.5"
          >
            <span>{product?.name || product?.product_name}</span>
            <Button variant="inline" disabledPadding onClick={handleOpenSaveForm}>
              <CustomImg
                className="w-5 h-5"
                src={saved ? '/assets/icons/red-heart-icon.svg' : '/assets/icons/gray-heart.svg'}
              />
            </Button>
          </Link>
        </div>
        <Link
          href={`${RESTRICTED_APP_ROUTES.VENDORS}/${product?.vendorslug}`}
          className="flex-1 flex items-center  gap-2.5"
        >
          <CustomImg
            className="max-w-[80px] max-h-12.5 object-cover"
            src={product?.vendorLogo || product?.vendorlogo || DEFAULT_VENDOR_LOGO}
          />
          <span className="text-gray-1000 text-base md:text-xl font-medium">
            {product?.vendorName || product?.vendorname}
          </span>
          {product?.verified && (
            <Tooltip text={VERIFIED_VENDOR_MESSAGE}>
              <img className="max-10 max-h-10" src="/assets/images/askiot_verified_small.png" />
            </Tooltip>
          )}
        </Link>
      </div>
      <div className="flex md:hidden items-center flex-wrap bg-white rounded-b-lg">
        {product?.device_type && (
          <div className="flex-1 py-4 px-5 border-r border-b border-gray-100">
            <p className="text-s text-gray-600">Device Type</p>
            <p className="text-primary-500 text-base font-medium mt-2">{product?.device_type}</p>
          </div>
        )}
        <div className="flex-1 py-4 px-5 border-r border-b border-gray-100">
          <p className="text-s text-gray-600">LTE category support</p>
          <p className="text-primary-500 text-base font-medium mt-2">{product?.lte}</p>
        </div>
        <div className="w-full flex items-center justify-center pt-5.5 pb-2 gap-3">
          <RequestQuoteButton product={product} requestQuoteHandler={handleRequestQuote} />
        </div>
      </div>
      <div className="rounded-t-xl shadow md:p-6 p-4 md:flex justify-between items-center hidden">
        <div className="flex items-center">
          <CustomNextImage
            className="md:w-[87px] md:h-[58px] w-18 h-9 rounded-lg"
            src={product?.img || product?.product_image}
            alt={product?.name || ''}
          />
          <div className="md:pl-5 pl-2.5">
            <h3 className="text-gray-1000 md:text-3xl text-2xl flex items-center gap-1.5">
              <span>{product?.name || product?.product_name}</span>
              <Button variant="inline" disabledPadding onClick={handleOpenSaveForm}>
                <CustomImg
                  className="w-5 h-5"
                  src={saved ? '/assets/icons/red-heart-icon.svg' : '/assets/icons/gray-heart.svg'}
                />
              </Button>
            </h3>
          </div>
        </div>
        <Link
          href={`${RESTRICTED_APP_ROUTES.VENDORS}/${product?.vendorslug}`}
          className="flex-1 flex items-center justify-end gap-2.5 ml-4"
        >
          <CustomImg
            className="max-w-[80px] max-h-12.5 object-cover"
            src={product?.vendorLogo || product?.vendorlogo || DEFAULT_VENDOR_LOGO}
          />
          <span className="text-gray-1000 text-xl font-medium">
            {product?.vendorName || product?.vendorname}
          </span>
          {product?.verified && (
            <Tooltip text={VERIFIED_VENDOR_MESSAGE}>
              <img className="max-w-10 max-h-10" src="/assets/images/askiot_verified_small.png" />
            </Tooltip>
          )}
        </Link>
      </div>
      <div className="md:flex items-center shadow rounded-b-xl md:py-4 py-2 hidden">
        {product?.device_type && (
          <div className=" md:px-6 px-3 border-r border-gray-100 md:max-w-[190px] h-full">
            <p className="text-gray-600 md:text-s text-xs">Device Type</p>
            <p className="text-primary-500 md:text-base text-s font-medium mt-2 break-words">
              {product?.device_type}
            </p>
          </div>
        )}
        {product?.lte && (
          <div className="md:px-6 px-3 border-r border-gray-100 md:max-w-[190px]  h-full">
            <p className="text-gray-600 md:text-s text-xs">LTE category support</p>
            <p className="text-primary-500 md:text-base text-s font-medium mt-2 break-words">
              {product?.lte}
            </p>
          </div>
        )}
        <div className="flex justify-end items-center flex-1 md:pl-0 md:pr-6 pr-2 pl-2">
          <RequestQuoteButton product={product} requestQuoteHandler={handleRequestQuote} />
        </div>
      </div>
      {isShowAlert && <QuoteRequestedAlert quote_id={quoteId as number} />}
      <RequestQuoteModal
        ref={requestQuoteModalRef}
        product={product}
        onSuccess={addToQuoteSuccess}
      />
      <QuoteVerification ref={quoteVerificationRef} onSuccess={onSuccessQuotesVerification} />
      <VerifiedQuotesAlternativeModal
        ref={verifiedQuotesAlternativeRef}
        products={alternate_products_verified}
        requestedQuoteFormData={requestedQuoteFormData}
      />
      <Modal ref={saveModalRef} hideButtons>
        <SaveForm
          product={product}
          onClose={() => {
            saveModalRef.current?.close();
          }}
        />
      </Modal>
    </>
  );
};

export default ProductDetailInfo;
