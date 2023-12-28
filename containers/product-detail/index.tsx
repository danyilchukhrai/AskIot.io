import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import Chat from '@/components/Molecules/Chat';
import Tabs from '@/components/Tabs';
import { RECOMMENDATION_TYPE } from '@/constants/iot-gpt';
import { PRODUCT_TAB_KEY } from '@/constants/products';
import { AUTH_ROUTES } from '@/constants/routes';
import { handleShowError } from '@/helpers/common';
import { useGetRecommendationProductDetail } from '@/modules/iot-gpt/hooks';
import { IThreadInteraction } from '@/modules/iot-gpt/type';
import { useQueryDevice } from '@/modules/product/hooks';
import { useChatVendorQuery } from '@/modules/vendors/hooks';
import { useAuthContext } from '@/providers/AuthProvider';
import QuoteSnippetProvider from '@/providers/QuotesSnippetsProvider';
import UserProvider from '@/providers/UserProvider';
import clsx from 'clsx';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import ProductList from '../iotgpt/components/ProductList';
import ProductDetailInfo from './components/ProductDetailInfo';
import ProductDetailOverview from './components/ProductDetailOverview';

interface IProductDetailProps {}

const SUGGESTIONS = [
  'Other alternatives',
  'Something',
  'Recommended contact',
  'Recommended platform',
];

const ProductDetail: FC<IProductDetailProps> = ({}) => {
  const params = useParams();
  const pathName = usePathname();
  const { slug = [] } = params || {};
  const [type, productSlug] = slug as string[];
  const [messageData, setMessageData] = useState<IThreadInteraction[]>([]);
  const [isOpenAskAnything, setIsOpenAskAnything] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();
  const { data: recommendationProductDetail, isLoading: fetchingProductDetails } =
    useGetRecommendationProductDetail(productSlug, type as RECOMMENDATION_TYPE);
  const {
    Product = [],
    alternate_products: alternateDevices,
    specifications,
  } = recommendationProductDetail || {};
  const { mutate: queryDevice, isPending: querying } = useQueryDevice();
  const { mutate: chatVendorQuery, isPending: vendorQuerying } = useChatVendorQuery();

  const productData = Product[0];

  const handleSendMessage = (value: string) => {
    const interactionId = messageData.length + 1;
    const newInteractionItem = {
      id: interactionId,
      user: value,
      ai: '',
      keywords: value,
    };
    let newMessageData = [...messageData, newInteractionItem];
    setMessageData(newMessageData);

    if (productData?.type === RECOMMENDATION_TYPE.DEVICES) {
      queryDevice(
        {
          deviceId: productData?.id,
          query: value,
          conversationHistory: getConversationHistory(true),
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
          conversationHistory: getConversationHistory(false),
        },
        {
          onSuccess: (data) => updateMessageDataAfterQuery(data.response, newMessageData),
          onError: handleShowError,
        },
      );
    }
  };

  const updateMessageDataAfterQuery = (aiMessage: string, messageData: IThreadInteraction[]) => {
    // Update message data with aiResponse after query successfully
    const newMessageData = [...messageData];
    const latestMessage = newMessageData[newMessageData.length - 1];
    latestMessage.ai = aiMessage;
    setMessageData(newMessageData);
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
              disabledOnClickProductEvent
            />
          ) : (
            <p className="text-center text-gray-600">Empty</p>
          )}
        </div>
      ),
    },
  ];

  if (fetchingProductDetails) return <LoadingIndicator />;

  return (
    <QuoteSnippetProvider>
      <UserProvider>
        <div className="flex">
          <div
            className={clsx(
              'product-detail md:p-8 p-4 h-screen relative overflow-auto',
              isOpenAskAnything ? 'w-3/5' : 'w-full',
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
              {!isOpenAskAnything && (
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
              <ProductDetailInfo product={productData} user={user} />
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
                ? 'md:w-2/5 md:static fixed top-[79px] right-0 left-0 bottom-0 md:h-screen h-[calc(100vh-79px)]'
                : 'hidden',
            )}
          >
            <div className="md:p-8 p-4 flex items-center md:justify-between border-b border-gray-200 ">
              <Button
                className="inline-block md:hidden"
                variant="secondary"
                onClick={() => setIsOpenAskAnything(false)}
              >
                <Image
                  src="/assets/icons/x-mark-icon.svg"
                  alt="X mark icon"
                  width={24}
                  height={24}
                />
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
                  Ask anything about this device
                </p>
              </div>
              <Button
                className="absolute hidden md:inline-block md:top-8 md:right-8 top-4 right-4"
                variant="inline"
                disabledPadding
                onClick={() => setIsOpenAskAnything(false)}
              >
                <Image
                  src="/assets/icons/x-mark-icon.svg"
                  alt="X mark icon"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
            <div className="flex-1 flex flex-col overflow-auto">
              <Chat
                messageData={messageData}
                onSend={handleSendMessage}
                isLoading={querying || vendorQuerying}
                placeholder="Ask anything about this product..."
                suggestionList={SUGGESTIONS}
              />
            </div>
          </div>
        </div>
      </UserProvider>
    </QuoteSnippetProvider>
  );
};

export default ProductDetail;
