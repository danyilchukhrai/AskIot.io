import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { ProductsContext } from '@/containers/iotgpt/context';
import { generateProductsFromRecommendations, handleShowError } from '@/helpers/common';
import { useGreetingsFeedback } from '@/modules/iot-gpt/hooks';
import { IChatQueryRecommendation } from '@/modules/iot-gpt/type';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { FC, useContext, useState } from 'react';
import ProductList from '../../../containers/iotgpt/components/ProductList';

interface IMessageItemProps {
  isCurrentUser?: boolean;
  aiLogo?: string;
  content: string;
  recommendations?: IChatQueryRecommendation;
  isLoading?: boolean;
  senderFirstName?: string;
  senderLastName?: string;
  isUser?: boolean;
  id?: number;
  isInternal?: boolean;
}

const MessageItem: FC<IMessageItemProps> = ({
  content = '',
  isCurrentUser = false,
  recommendations,
  isLoading,
  aiLogo: aiLogoProp = '',
  senderFirstName,
  senderLastName,
  isUser,
  id,
  isInternal = false,
}) => {
  const { activeThread: iotGptThread } = useContext(ProductsContext);
  const [iotGptFeedback, setIotGptFeedback] = useState<boolean | undefined>();

  const products = generateProductsFromRecommendations(recommendations);
  const { mutate: greetingsFeedback } = useGreetingsFeedback();

  let imgSrc = '/assets/logo/logo.svg';
  const aiLogo = aiLogoProp || '/assets/logo/logo.svg';

  // Apply this flow for user type or iot gpt chat
  if (isUser || !!iotGptThread) {
    if (isCurrentUser) {
      imgSrc = '/assets/images/avatar-default.png';
    } else {
      imgSrc = aiLogo;
    }
  } else {
    if (!isCurrentUser) {
      imgSrc = '/assets/images/avatar-default.png';
    } else {
      imgSrc = aiLogo;
    }
  }

  const handleGreetingsFeedback = (feedback: boolean) => {
    setIotGptFeedback(feedback);
    greetingsFeedback(
      {
        threadId: iotGptThread?.thread_id,
        interaction: id,
        source: 'iotgpt',
        feedback,
      },
      {
        onError: (error) => {
          handleShowError(error);
          setIotGptFeedback(undefined);
        },
      },
    );
  };

  return (
    <div className={clsx('flex items-start', isCurrentUser ? 'flex-row' : '')}>
      {!isInternal && (
        <Avatar
          src={imgSrc}
          className={clsx(
            'w-8 h-8 md:w-10 md:h-10',
            isCurrentUser ? 'md:mr-6 mr-3' : 'md:mr-6 mr-3',
          )}
          firstName={senderFirstName}
          lastName={senderLastName}
        />
      )}
      <div
        className={clsx('flex-1', {
          'flex justify-start': isCurrentUser,
        })}
      >
        {isLoading ? (
          <div className="w-8 h-8 flex justify-center items-center">
            <span className="dot-flashing inline-block" />
          </div>
        ) : (
          <>
            <div
              className={clsx(
                'py-2.5 px-3 rounded-lg w-fit shadow-s',
                isCurrentUser
                  ? 'text-white bg-primary-500'
                  : isInternal
                  ? 'bg-primary-100 text-primary-500 border border-primary-500 font-medium'
                  : 'text-black bg-white ',
              )}
            >
              <div
                className={clsx('md:text-base text-s w-fit break-word chat-inner-html')}
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {!isCurrentUser && !!iotGptThread && (
                <div className="flex gap-3 pt-4 pr-4 w-full justify-end">
                  <Button
                    variant="inline"
                    disabledPadding
                    onClick={() => handleGreetingsFeedback(true)}
                  >
                    <img
                      className="w-5 h-5"
                      src={
                        iotGptFeedback
                          ? '/assets/icons/hand-thumb-up-solid.svg'
                          : '/assets/icons/hand-thumb-up-outlined.svg'
                      }
                      alt="icon"
                    />
                  </Button>
                  <Button
                    variant="inline"
                    disabledPadding
                    onClick={() => handleGreetingsFeedback(false)}
                  >
                    <img
                      className="w-5 h-5"
                      src={
                        iotGptFeedback === false
                          ? '/assets/icons/hand-thumb-down-solid.svg'
                          : '/assets/icons/hand-thumb-down-outlined.svg'
                      }
                      alt="icon"
                    />
                  </Button>
                </div>
              )}
            </div>

            {!isEmpty(products) && (
              <div className="mt-3">
                <ProductList products={products} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
