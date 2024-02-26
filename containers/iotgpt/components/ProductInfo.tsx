'use client';
import Button from '@/components/Button';
import CloseButtonMobile from '@/components/CloseButtonMobile';
import { CustomImg } from '@/components/CustomImage';
import Modal, { IModalElement } from '@/components/Modal';
import RequestQuoteModal from '@/components/Molecules/RequestQuoteModal';
import VerifiedQuotesAlternativeModal from '@/components/Molecules/VerifiedQuotesAlternativeModal';
import QuoteRequestedAlert from '@/components/QuoteRequestedAlert';
import QuoteVerification from '@/components/QuoteVerification';
import RequestQuoteButton from '@/components/RequestQuoteButton';
import Spinner from '@/components/Spinner';
import Tabs from '@/components/Tabs';
import Tooltip from '@/components/Tooltip';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { PRODUCT_TAB_KEY } from '@/constants/products';
import { SUBSCRIPTION_PLANS } from '@/constants/subscription';
import { VERIFIED_VENDOR_MESSAGE } from '@/constants/vendors';
import { useGetRecommendationProductDetail } from '@/modules/iot-gpt/hooks';
import { IRecommendationInfo } from '@/modules/iot-gpt/type';
import { useGetVerifiedAlternateProducts } from '@/modules/product/hooks';
import { IRequestQuoteForm } from '@/modules/quotes/types';
import { useQuoteSnippetContext } from '@/providers/QuotesSnippetsProvider';
import { useSavedProductsContext } from '@/providers/SavedProductsProvider';
import { useUserContext } from '@/providers/UserProvider';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ProductList from './ProductList';
import ProductOverview from './ProductOverview';
import SaveForm from './SaveForm';

interface IProductInfoProps {
  product?: IRecommendationInfo;
  onCloseDrawer: () => void;
  products?: IRecommendationInfo[];
  setDisabledCloseDrawer: Dispatch<SetStateAction<boolean>>;
}

const ProductInfo: FC<IProductInfoProps> = ({
  product: selectedProduct,
  onCloseDrawer,
  products = [],
  setDisabledCloseDrawer,
}) => {
  const router = useRouter();
  const requestQuoteModalRef = useRef<IModalElement>(null);
  const quoteVerificationRef = useRef<IModalElement>(null);
  const verifiedQuotesAlternativeRef = useRef<IModalElement>(null);
  const saveModalRef = useRef<IModalElement>(null);

  const [product, setProduct] = useState<IRecommendationInfo>();
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [quoteId, setQuoteId] = useState<number | undefined>();
  const [requestedQuoteFormData, setRequestedQuoteFormData] = useState<IRequestQuoteForm>();
  const { data, isLoading } = useGetRecommendationProductDetail(
    product?.slug,
    product?.recommendationType,
  );
  const { Product = [], specifications, alternate_products: alternateDevices } = data || {};
  const allProductIds = (products || []).map((it) => it.slug);
  const productData = Product[0];
  const productId = product?.product_id || product?.id;
  const { isSavedProduct } = useSavedProductsContext();
  const saved = isSavedProduct(selectedProduct?.id || selectedProduct?.product_id);
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

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (quotesSnippets) {
      setIsQuoteRequestedLoading(true);
      const quoteRequested = quotesSnippets?.some((item) => item?.product_id === productId);
      if (quoteRequested) {
        setIsQuoteRequested((prevData) => ({ ...prevData, [productId as number]: true }));
      }
      setIsQuoteRequestedLoading(false);
    }
  }, [quotesSnippets, product]); //eslint-disable-line

  const handleGetNextProduct = () => {
    const currentProductIdIndex = products.findIndex((it) => it?.product_id === productId);
    if (currentProductIdIndex === allProductIds.length - 1) return;

    setProduct(products[currentProductIdIndex + 1]);
  };

  const handleGetPreviousProduct = () => {
    const currentProductIdIndex = products.findIndex((it) => it?.product_id === productId);
    if (!currentProductIdIndex) return;

    setProduct(products[currentProductIdIndex - 1]);
  };

  const handleRequestQuote = async () => {
    if (askIOTUserDetails?.is_mobile_verified) {
      requestQuoteModalRef.current?.open();
      setDisabledCloseDrawer(true);
    } else {
      quoteVerificationRef?.current?.open();
      setDisabledCloseDrawer(true);
    }
  };

  const requestQuoteHandler = (
    quote_id: number | undefined,
    formData: IRequestQuoteForm,
    subscriptionPlan: SUBSCRIPTION_PLANS,
  ) => {
    setQuoteId(quote_id);
    setIsShowAlert(true);
    setRequestedQuoteFormData(formData);
    setGetQuotesSnippetsIsValid(true);
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

  const onSuccessQuotesVerification = () => {
    quoteVerificationRef?.current?.close();
    requestQuoteModalRef?.current?.open();
  };

  const handleClickProduct = (product: any) => {
    router.push(`/app/${product?.type}/${product?.slug}`);
  };

  const handleOpenSaveForm = () => {
    if (saved) {
      toast.info('This product is already saved');
      return;
    }
    saveModalRef.current?.open();
    setDisabledCloseDrawer(true);
  };

  const tabs = [
    {
      key: PRODUCT_TAB_KEY.Overview,
      label: 'Overview',
      component: (
        <ProductOverview
          product={{ ...(productData || {}), verified: product?.verified }}
          specifications={specifications}
        />
      ),
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
              onClickProduct={handleClickProduct}
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
                    <Button variant="inline" disabledPadding onClick={handleOpenSaveForm}>
                      <CustomImg
                        className="w-5 h-5 ml-1.5"
                        src={
                          saved
                            ? '/assets/icons/red-heart-icon.svg'
                            : '/assets/icons/gray-heart.svg'
                        }
                      />
                    </Button>
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
                    {product?.verified && (
                      <Tooltip textClassName="!-left-15" text={VERIFIED_VENDOR_MESSAGE}>
                        <img
                          className="max-w-10 max-h-10"
                          src="/assets/images/askiot_verified_small.png"
                        />
                      </Tooltip>
                    )}
                  </div>
                  <RequestQuoteButton product={product} requestQuoteHandler={handleRequestQuote} />
                </div>
              </div>

              <div className="product-info-body flex-1 px-4 md:px-8">
                <Tabs tabs={tabs} tabItemStyles="w-1/2" disabledSpaceBetween />
              </div>
            </div>
            <div className="product-info-footer px-8 pt-8 z-10 flex justify-center">
              <Link
                className="text-s md:text-base font-medium rounded-lg shadow-s text-gray-800 bg-white hover:bg-gray focus:ring-1 focus:ring-black disabled:bg-gray disabled:text-gray-300 w-full md:w-[519px] px-3 py-2.5 text-center"
                href={`/app/${productData?.type}/${product?.slug}`}
              >
                Learn More
              </Link>
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

      {isShowAlert && <QuoteRequestedAlert drawerIsValid quote_id={quoteId} />}
      <RequestQuoteModal
        ref={requestQuoteModalRef}
        product={productData}
        onSuccess={requestQuoteHandler}
      />
      <QuoteVerification ref={quoteVerificationRef} onSuccess={onSuccessQuotesVerification} />
      <VerifiedQuotesAlternativeModal
        ref={verifiedQuotesAlternativeRef}
        products={alternate_products_verified}
        requestedQuoteFormData={requestedQuoteFormData}
        onClose={() => setDisabledCloseDrawer(false)}
      />
      <Modal ref={saveModalRef} hideButtons onClose={() => setDisabledCloseDrawer(false)}>
        <SaveForm
          product={selectedProduct}
          onClose={() => {
            saveModalRef.current?.close();
            setDisabledCloseDrawer(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ProductInfo;
