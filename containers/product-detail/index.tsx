'use client';

import Button from '@/components/Button';
import Chat from '@/components/Molecules/Chat';
import Tabs from '@/components/Tabs';
import { RECOMMENDATION_TYPE } from '@/constants/iot-gpt';
import { PRODUCT_TAB_KEY } from '@/constants/products';
import { AUTH_ROUTES } from '@/constants/routes';
import { handleShowError } from '@/helpers/common';
import { IRecommendationProductDetail, IThreadInteraction } from '@/modules/iot-gpt/type';
import { useQueryDevice } from '@/modules/product/hooks';
import { useChatVendorQuery, usePublicChatVendorQuery } from '@/modules/vendors/hooks';
import { useAuthContext } from '@/providers/AuthProvider';
import { ProductDetailContext } from '@/providers/PublicProductDetailProvider';
import QuoteSnippetProvider from '@/providers/QuotesSnippetsProvider';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import ProductList from '../iotgpt/components/ProductList';
import ProductDetailInfo from './components/ProductDetailInfo';
import ProductDetailOverview from './components/ProductDetailOverview';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface IProductDetailProps {
  productDetails?: IRecommendationProductDetail;
}

const SUGGESTIONS = ['Key features', 'Key usecases supported', 'What verticals are supported'];

const threadId = uuidv4();

const ProductDetail: FC<IProductDetailProps> = ({ productDetails }) => {
  const { isOpenAskAnything, setIsOpenAskAnything } = useContext(ProductDetailContext);
  const pathName = usePathname();
  const [messageData, setMessageData] = useState<IThreadInteraction[]>([]);
  const [requiredCaptcha, setRequiredCaptcha] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);

  const { user } = useAuthContext();
  const router = useRouter();
  const {
    Product = [],
    alternate_products: alternateDevices,
    specifications,
  } = productDetails || {};
  const { mutate: queryDevice, isPending: querying } = useQueryDevice();
  const { mutate: chatVendorQuery, isPending: vendorQuerying } = useChatVendorQuery();
  const { mutate: publicChatVendorQuery, isPending: publicVendorQuerying } =
    usePublicChatVendorQuery();
  const isMobileMatches = useMediaQuery('(max-width: 767px)');

  const productData = Product[0];

  useEffect(() => {
    if (!user) {
      setRequiredCaptcha(true);
      if (!isMobileMatches) {
        setIsOpenAskAnything(true);
      }
    }
  }, [user]);

  const handleSendMessage = (value: string, captchaToken: string) => {
    const interactionId = messageData.length + 1;
    const newInteractionItem = {
      id: interactionId,
      user: value,
      ai: '',
      keywords: value,
    };
    let newMessageData = [...messageData, newInteractionItem];
    setMessageData(newMessageData);
    setRequiredCaptcha(false);

    if (!user) {
      publicChatVendorQuery(
        {
          vendorId: productData?.vendorid,
          query: value,
          threadId,
          is_email: false,
          'cf-turnstile-response': captchaToken,
        },
        {
          onSuccess: (data) => updateMessageDataAfterQuery(data, newMessageData),
          onError: handleShowError,
        },
      );
    } else if (productData?.type === RECOMMENDATION_TYPE.DEVICES) {
      queryDevice(
        {
          deviceId: productData?.id,
          query: value,
          threadId,
        },
        {
          onSuccess: (data) => updateMessageDataAfterQuery(data.aiResponse, newMessageData),
          onError: handleShowError,
        },
      );
    } else {
      chatVendorQuery(
        {
          vendorId: productData?.vendorid,
          query: value,
          threadId,
        },
        {
          onSuccess: (data) =>
            updateMessageDataAfterQuery(data?.response || data?.greeting || '', newMessageData),
          onError: handleShowError,
        },
      );
    }
  };

  const updateMessageDataAfterQuery = (data: any, messageData: IThreadInteraction[]) => {
    // Update message data with aiResponse after query successfully
    const newMessageData = [...messageData];
    const latestMessage = newMessageData[newMessageData.length - 1];
    latestMessage.ai = data?.response || data?.greeting || '';
    latestMessage.is_email = data?.is_email;
    setMessageData(newMessageData);
  };

  const handleSubmitEmail = (email: string, captchaToken: string) => {
    setSubmittingEmail(true);
    publicChatVendorQuery(
      {
        vendorId: productData?.vendorid,
        query: email,
        threadId,
        is_email: true,
        'cf-turnstile-response': captchaToken,
      },
      {
        onSuccess: () => toast.success('Successfully!'),
        onError: handleShowError,
        onSettled: () => setSubmittingEmail(false),
      },
    );
  };

  const getConversationHistory = (isDevicesType: boolean): string[] => {
    return messageData?.reduce((prev: string[], currentItem) => {
      const result = [...prev];
      currentItem.user && result.push(`User: ${currentItem.user}`);
      currentItem.ai && result.push(isDevicesType ? `AI: ${currentItem.ai}` : currentItem.ai);

      return result;
    }, []);
  };

  const handleBack = () => {
    history.back();
  };

  const handleAskAnything = () => {
    if (user) {
      setIsOpenAskAnything(true);
    } else {
      router.push(`${AUTH_ROUTES.LOGIN}?redirectTo=${pathName}`);
    }
  };

  const handleClickProduct = (product: any) => {
    router.push(`/app/${product?.type}/${product?.slug}`);
  };

  const tabs = [
    {
      key: PRODUCT_TAB_KEY.Overview,
      label: 'Overview',
      component: (
        <ProductDetailOverview
          product={productData}
          specifications={specifications}
          onAskAnything={handleAskAnything}
        />
      ),
    },
    {
      key: PRODUCT_TAB_KEY.Alternatives,
      label: 'Alternatives',
      component: (
        <div className="mt-5">
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
  ];

  return (
    <QuoteSnippetProvider>
      <div className="flex">
        <div
          className={clsx(
            'product-detail relative',
            isOpenAskAnything ? 'w-3/5' : 'w-full',
            user ? 'md:p-8 p-4 h-screen overflow-auto' : 'md:p-1 md:py-8 p-1 py-4',
          )}
        >
          <div
            className={clsx(
              'detail-header flex items-center',
              user ? 'justify-between' : 'justify-end',
            )}
          >
            {user && (
              <div className="flex items-center w-full md:w-auto">
                <Button className="hidden md:flex" variant="secondary" onClick={handleBack}>
                  <Image
                    src="/assets/icons/arrow-left-icon.svg"
                    alt="arrow left"
                    width={20}
                    height={20}
                  />
                  <span className="md:ml-2.5 md:inline hidden">Back</span>
                </Button>
              </div>
            )}
            {!isOpenAskAnything && user && (
              <Button
                className="md:flex hidden items-center ml-4 w-28 md:w-fit md:!px-2.5 !px-1"
                variant="info"
                onClick={handleAskAnything}
              >
                <Image
                  className="hidden md:block"
                  src="/assets/icons/ask-anything-icon.svg"
                  alt="ask anything"
                  width={20}
                  height={20}
                />
                <span className="md:ml-2.5 text-s md:text-base">Ask anything</span>
              </Button>
            )}
          </div>
          <div className="detail-body mt-4 md:mt-5 rounded-xl">
            <ProductDetailInfo
              alternateDevices={alternateDevices}
              product={productData}
              user={user}
            />
            <div className="pt-5">
              <Tabs
                tabItemStyles={clsx(isOpenAskAnything ? 'flex-1' : '')}
                tabs={tabs}
                disabledSpaceBetween
              />
            </div>
          </div>
        </div>
        <div
          className={clsx(
            'ask-anything border-l border-gray-200 bg-gray flex flex-col',
            isOpenAskAnything
              ? user
                ? 'md:w-2/5 md:static fixed top-[79px] right-0 left-0 bottom-0 md:h-screen h-[calc(100vh-79px)]'
                : 'md:fixed md:top-0 md:right-0 md:left-unset md:bottom-unset md:z-50 md:h-screen md:w-2/5 fixed top-[79px] right-0 left-0 bottom-0 h-[calc(100vh-79px)]'
              : 'hidden',
          )}
        >
          <div className="md:p-8 p-4 flex items-center md:justify-between border-b border-gray-200 ">
            <Button
              className="inline-block md:hidden"
              variant="secondary"
              onClick={() => setIsOpenAskAnything(false)}
            >
              <Image src="/assets/icons/x-mark-icon.svg" alt="X mark icon" width={24} height={24} />
            </Button>
            <div className="flex items-center pl-5 md:pl-0">
              <Image
                className="block md:hidden"
                src="/assets/logo/logo.svg"
                alt="AskIoT"
                width={20}
                height={20}
              />
              <p className="text-gray-1000 text-base md:text-l font-medium pl-3 md:pl-0">
                Ask anything about this product
              </p>
            </div>
            <Button
              className="absolute hidden md:inline-block md:top-8 md:right-8 top-4 right-4"
              variant="inline"
              disabledPadding
              onClick={() => setIsOpenAskAnything(false)}
            >
              <Image src="/assets/icons/x-mark-icon.svg" alt="X mark icon" width={24} height={24} />
            </Button>
          </div>
          <div className="flex-1 flex flex-col overflow-auto">
            <Chat
              messageData={messageData}
              onSend={handleSendMessage}
              isLoading={querying || vendorQuerying || publicVendorQuerying}
              submittingEmail={submittingEmail}
              placeholder="Ask anything about this product..."
              suggestionList={SUGGESTIONS}
              onSubmitEmail={handleSubmitEmail}
              requiredCaptcha={requiredCaptcha}
            />
          </div>
        </div>
      </div>
    </QuoteSnippetProvider>
  );
};

export default ProductDetail;
