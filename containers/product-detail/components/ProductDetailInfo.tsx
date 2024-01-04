'use client';
import { CustomImg, CustomNextImage } from '@/components/CustomImage';
import { IModalElement } from '@/components/Modal';
import RequestQuoteModal from '@/components/Molecules/RequestQuoteModal';
import QuoteRequestedAlert from '@/components/QuoteRequestedAlert';
import QuoteVerification from '@/components/QuoteVerification';
import RequestQuoteButton from '@/components/RequestQuoteButton';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { AUTH_ROUTES, RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { useQuoteSnippetContext } from '@/providers/QuotesSnippetsProvider';
import { useSavedProductsContext } from '@/providers/SavedProductsProvider';
import { useUserContext } from '@/providers/UserProvider';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';

interface IProductDetailInfoProps {
  product?: any;
  user?: User;
}

const ProductDetailInfo: FC<IProductDetailInfoProps> = ({ product, user }) => {
  const router = useRouter();
  const requestQuoteModalRef = useRef<IModalElement>(null);
  const quoteVerificationRef = useRef<IModalElement>(null);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [quoteId, setQuoteId] = useState<number>();
  const { isSavedProduct } = useSavedProductsContext();
  const saved = isSavedProduct(product?.id || product?.product_id);
  const { askIOTUserDetails } = useUserContext();
  const {
    setGetQuotesSnippetsIsValid,
    quotesSnippets,
    setIsQuoteRequested,
    setIsQuoteRequestedLoading,
  } = useQuoteSnippetContext();

  const addToQuoteSuccess = (quoteId?: number) => {
    setGetQuotesSnippetsIsValid(true);
    setIsShowAlert(true);
    setQuoteId(quoteId);
  };

  useEffect(() => {
    if (quotesSnippets) {
      setIsQuoteRequestedLoading(true);
      const quoteRequested = quotesSnippets?.some(
        (item) => item?.product_id === product?.product_id,
      );
      if (quoteRequested) {
        setIsQuoteRequested((prevData) => ({ ...prevData, [product?.id as number]: true }));
      }
      setIsQuoteRequestedLoading(false);
    }
  }, [quotesSnippets]); //eslint-disable-line

  const handleRequestQuote = async () => {
    if (user) {
      if (askIOTUserDetails?.is_mobile_verified) {
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
            href={
              user ? `${RESTRICTED_APP_ROUTES.VENDORS}/${product?.vendorid}` : AUTH_ROUTES.LOGIN
            }
            className="text-gray-1000 text-3xl font-medium flex items-center gap-1.5"
          >
            <span>{product?.name || product?.product_name}</span>
            <CustomImg
              className="w-5 h-5"
              src={saved ? '/assets/icons/red-heart-icon.svg' : '/assets/icons/gray-heart.svg'}
            />
          </Link>
        </div>
        <Link
          href={user ? `${RESTRICTED_APP_ROUTES.VENDORS}/${product?.vendorid}` : AUTH_ROUTES.LOGIN}
          className="flex-1 flex items-center  gap-2.5"
        >
          <CustomImg
            className="max-w-[80px] max-h-12.5 object-cover"
            src={product?.vendorLogo || product?.vendorlogo || DEFAULT_VENDOR_LOGO}
          />
          <span className="text-gray-1000 text-base md:text-xl font-medium">
            {product?.vendorName || product?.vendorname}
          </span>
        </Link>
      </div>
      <div className="flex md:hidden items-center flex-wrap bg-white rounded-b-lg">
        <div className="flex-1 py-4 px-5 border-r border-b border-gray-100">
          <p className="text-s text-gray-600">Device Type</p>
          <p className="text-primary-500 text-base font-medium mt-2">
            {product?.device_type || product?.category || product?.type}
          </p>
        </div>
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
              <CustomImg
                className="w-5 h-5"
                src={saved ? '/assets/icons/red-heart-icon.svg' : '/assets/icons/gray-heart.svg'}
              />
            </h3>
          </div>
        </div>
        <Link
          href={user ? `${RESTRICTED_APP_ROUTES.VENDORS}/${product?.vendorid}` : AUTH_ROUTES.LOGIN}
          className="flex-1 flex items-center justify-end gap-2.5 ml-4"
        >
          <CustomImg
            className="max-w-[80px] max-h-12.5 object-cover"
            src={product?.vendorLogo || product?.vendorlogo || DEFAULT_VENDOR_LOGO}
          />
          <span className="text-gray-1000 text-xl font-medium">
            {product?.vendorName || product?.vendorname}
          </span>
        </Link>
      </div>
      <div className="md:flex items-center shadow rounded-b-xl hidden">
        <div className="md:py-4 md:px-6 py-2 px-3 border-r border-gray-100 md:max-w-[190px] h-full">
          <p className="text-gray-600 md:text-s text-xs">Device Type</p>
          <p className="text-primary-500 md:text-base text-s font-medium mt-2 break-words">
            {product?.device_type || product?.category || product?.type}
          </p>
        </div>
        {product?.lte && (
          <div className="md:py-4 md:px-6 py-2 px-3 border-r border-gray-100 md:max-w-[190px]  h-full">
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
    </>
  );
};

export default ProductDetailInfo;
