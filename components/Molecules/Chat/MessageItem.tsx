import Avatar from '@/components/Avatar';
import { generateProductsFromRecommendations } from '@/helpers/common';
import { IChatQueryRecommendation } from '@/modules/iot-gpt/type';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { FC } from 'react';
import ProductList from '../../../containers/iotgpt/components/ProductList';

interface IMessageItemProps {
  isCurrentUser?: boolean;
  aiLogo?: string;
  content: string;
  recommendations?: IChatQueryRecommendation;
  isLoading?: boolean;
  senderFirstName?: string;
  senderLastName?: string;
}

const MessageItem: FC<IMessageItemProps> = ({
  content = '',
  isCurrentUser = false,
  recommendations,
  isLoading,
  aiLogo = '',
  senderFirstName,
  senderLastName,
}) => {
  const products = generateProductsFromRecommendations(recommendations);

  return (
    <div className={clsx('flex items-start', isCurrentUser ? 'flex-row' : '')}>
      <Avatar
        src={
          isCurrentUser
            ? '/assets/images/avatar-default.png'
            : aiLogo
            ? aiLogo
            : '/assets/logo/logo.svg'
        }
        className={clsx('w-8 h-8 md:w-10 md:h-10', isCurrentUser ? 'md:mr-6 mr-3' : 'md:mr-6 mr-3')}
        firstName={senderFirstName}
        lastName={senderLastName}
      />
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
            <p
              className={clsx(
                'md:text-base text-s py-2.5 px-3 rounded-lg w-fit break-word',
                isCurrentUser
                  ? 'text-white bg-primary-500 shadow-s'
                  : 'text-black bg-white shadow-s',
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />
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
