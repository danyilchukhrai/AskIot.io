'use client';
import Button from '@/components/Button';
import CloseButtonMobile from '@/components/CloseButtonMobile';
import { CustomImg } from '@/components/CustomImage';
import { IModalElement } from '@/components/Modal';
import RequestQuoteModal from '@/components/Molecules/RequestQuoteModal';
import QuoteRequestedAlert from '@/components/QuoteRequestedAlert';
import QuoteVerification from '@/components/QuoteVerification';
import RequestQuoteButton from '@/components/RequestQuoteButton';
import Spinner from '@/components/Spinner';
import Tabs from '@/components/Tabs';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { PRODUCT_TAB_KEY } from '@/constants/products';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { useGetRecommendationProductDetail } from '@/modules/iot-gpt/hooks';
import { IRecommendationInfo } from '@/modules/iot-gpt/type';
import { useQuoteSnippetContext } from '@/providers/QuotesSnippetsProvider';
import { useSavedProductsContext } from '@/providers/SavedProductsProvider';
import { useUserContext } from '@/providers/UserProvider';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import ProductList from './ProductList';
import ProductOverview from './ProductOverview';

interface IProductInfoProps {
  product?: IRecommendationInfo;
  onCloseDrawer: () => void;
  products?: IRecommendationInfo[];
  setIsRequestQuoteModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductInfo: FC<IProductInfoProps> = ({
  product: selectedProduct,
  onCloseDrawer,
  products = [],
  setIsRequestQuoteModalOpen,
}) => {
  const router = useRouter();
  const requestQuoteModalRef = useRef<IModalElement>(null);
  const quoteVerificationRef = useRef<IModalElement>(null);
  const [product, setProduct] = useState<IRecommendationInfo>();
  const [isShowAlert, setIsShowAlert] = useState(false);
  const { data, isLoading } = useGetRecommendationProductDetail(
    product?.slug,
    product?.recommendationType,
  );
  const { Product = [], specifications, alternate_products: alternateDevices } = data || {};
  const allProductIds = (products || []).map((it) => it.slug);
  const productData = Product[0];
  const { isSavedProduct } = useSavedProductsContext();
  const saved = isSavedProduct(selectedProduct?.id || selectedProduct?.product_id);
  const { askIOTUserDetails } = useUserContext();
  const {
    setGetQuotesSnippetsIsValid,
    quotesSnippets,
    setIsQuoteRequested,
    setIsQuoteRequestedLoading,
  } = useQuoteSnippetContext();

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (quotesSnippets) {
      setIsQuoteRequestedLoading(true);
      const quoteRequested = quotesSnippets?.some((item) => item?.product_id === product?.id);
      if (quoteRequested) {
        setIsQuoteRequested((prevData) => ({ ...prevData, [product?.id as number]: true }));
      }
      setIsQuoteRequestedLoading(false);
    }
  }, [quotesSnippets, product]); //eslint-disable-line

  const handleLearnMore = () => {
    router.push(
      `${RESTRICTED_APP_ROUTES.PRODUCTS}/${selectedProduct?.recommendationType}/${productData?.slug}`,
    );
    onCloseDrawer();
  };

  const handleGetNextProduct = () => {
    const currentProductIdIndex = products.findIndex((it) => it?.id === product?.id);
    if (currentProductIdIndex === allProductIds.length - 1) return;

    setProduct(products[currentProductIdIndex + 1]);
  };

  const handleGetPreviousProduct = () => {
    const currentProductIdIndex = products.findIndex((it) => it?.id === product?.id);
    if (!currentProductIdIndex) return;

    setProduct(products[currentProductIdIndex - 1]);
  };

  const handleRequestQuote = async () => {
    if (askIOTUserDetails?.is_mobile_verified) {
      requestQuoteModalRef.current?.open();
      setIsRequestQuoteModalOpen(true);
    } else {
      quoteVerificationRef?.current?.open();
      setIsRequestQuoteModalOpen(true);
    }
  };

  const requestQuoteHandler = () => {
    setIsShowAlert(true);
    setGetQuotesSnippetsIsValid(true);
  };

  const onSuccessQuotesVerification = () => {
    quoteVerificationRef?.current?.close();
    requestQuoteModalRef?.current?.open();
  };

  const tabs = [
    {
      key: PRODUCT_TAB_KEY.Overview,
      label: 'Overview',
      component: <ProductOverview product={productData} specifications={specifications} />,
    },
    {
      key: PRODUCT_TAB_KEY.Features,
      label: 'Features',
      component: <div>Features</div>,
      isHidden: true,
    },
    {
      key: PRODUCT_TAB_KEY.Alternatives,
      label: 'Alternatives',
      component: (
        <div className="pt-10.5">
          {alternateDevices?.length ? (
            <ProductList
              products={alternateDevices}
              hideActionButtons
              disabledOnClickProductEvent
            />
          ) : (
            <p className="text-center text-gray-600">Empty</p>
          )}
        </div>
      ),
    },
    {
      key: PRODUCT_TAB_KEY.Pricing,
      label: 'Pricing',
      component: <div>Pricing</div>,
      isHidden: true,
    },
  ];

  console.log('productData', productData);

  return (
    <>
      <div className="product-info-container md:w-[506px] lg:w-[652px] w-full flex flex-col h-full relative pb-7 md:pb-0 bg-gray md:bg-white">
        <div className="bg-white mb-4 p-4 flex justify-end items-center md:hidden">
          <CloseButtonMobile
            onClick={() => {
              onCloseDrawer();
              setProduct(undefined);
            }}
          >
            <img className="w-6 h-6" src="/assets/icons/x-mark-icon.svg" />
          </CloseButtonMobile>
        </div>
        <div className="buttons flex justify-between items-center px-4 md:px-8 md:mb-5 mb-4">
          <Button
            variant="secondary"
            onClick={handleGetPreviousProduct}
            disabled={!products.findIndex((it) => it?.slug === product?.slug)}
          >
            Previous
          </Button>
          <Button
            onClick={handleGetNextProduct}
            disabled={
              products.findIndex((it) => it?.slug === product?.slug) === allProductIds.length - 1
            }
          >
            Next
          </Button>
        </div>
        {!isEmpty(productData) && (
          <>
            <div className="flex-1 flex flex-col overflow-auto">
              <div className="flex items-center gap-12 md:px-8 px-4 mb-9.5 flex-wrap">
                <CustomImg
                  className="w-full h-[279px] md:w-[331px] md:h-[189px] object-cover rounded-[6px]"
                  src={productData?.product_image || productData?.img}
                  alt={productData?.name || ''}
                />
                <div className="flex flex-col gap-5 flex-1">
                  <h4 className="text-3xl text-gray-1000 font-medium flex items-center">
                    {productData?.name}
                    <CustomImg
                      className="w-5 h-5 ml-1.5"
                      src={
                        saved ? '/assets/icons/red-heart-icon.svg' : '/assets/icons/gray-heart.svg'
                      }
                    />
                  </h4>
                  <div className="flex items-center">
                    <CustomImg
                      src={productData?.vendorlogo || DEFAULT_VENDOR_LOGO}
                      width={20}
                      height={20}
                      alt="vendor logo"
                    />
                    <p className="text-base text-gray-1000 pl-2.5">
                      {productData?.vendorname || ''}
                    </p>
                  </div>
                  <RequestQuoteButton product={product} requestQuoteHandler={handleRequestQuote} />
                </div>
              </div>

              <div className="product-info-body flex-1 px-4 md:px-8">
                <Tabs tabs={tabs} tabItemStyles="w-1/2" disabledSpaceBetween />
              </div>
            </div>
            <div className="product-info-footer px-8 pt-8 z-10 flex justify-center">
              <Button
                className="md:!w-[519px] w-full"
                variant="secondary"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>
          </>
        )}
        {isEmpty(productData) && !isLoading && (
          <p className="w-full h-full flex-1 flex justify-center items-center">Not found!</p>
        )}
        {isLoading && (
          <div className="w-full h-full flex-1 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>

      {isShowAlert && <QuoteRequestedAlert drawerIsValid />}
      <RequestQuoteModal
        ref={requestQuoteModalRef}
        product={productData}
        onSuccess={requestQuoteHandler}
        onClose={() => setIsRequestQuoteModalOpen(false)}
      />
      <QuoteVerification ref={quoteVerificationRef} onSuccess={onSuccessQuotesVerification} />
    </>
  );
};

export default ProductInfo;
