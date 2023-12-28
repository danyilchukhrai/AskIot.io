import Button from '@/components/Button';
import Drawer, { IDrawerElement } from '@/components/Drawer';
import clsx from 'clsx';
import Image from 'next/image';
import { FC, useRef, useState } from 'react';
import Channels from './components/Channels';
import ChannelDetails from './components/Channels/ChannelDetails';
import ProductInfo from './components/ProductInfor';
import MessageContextProvider from './context';

interface IMessagesProps {}

const Messages: FC<IMessagesProps> = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowProductInfo, setIsShowProductInfo] = useState(false);
  const productDrawerRef = useRef<IDrawerElement>(null);

  return (
    <MessageContextProvider>
      <section
        className={clsx('messages-section', {
          'fixed md:top-0 top-12 left-0 right-0 bottom-0 z-20': isFullScreen,
        })}
      >
        <div className="flex">
          <div
            className={clsx(
              'w-[290px] h-[calc(100vh-79px)] md:h-screen border-r border-gray-200 bg-white',
              isFullScreen
                ? 'fixed top-12 left-0 right-0 bottom-0 md:static z-20'
                : 'hidden md:block',
            )}
          >
            <Channels setIsFullScreen={setIsFullScreen} isFullScreen={isFullScreen} />
          </div>
          <div className="flex-1 md:h-screen h-[calc(100vh-79px)] relative">
            <ChannelDetails
              isShowProductInfo={isShowProductInfo}
              handleOpenProductInfo={() => setIsShowProductInfo(true)}
              onOpenProductDrawer={() => productDrawerRef.current?.open()}
            />
            <Button
              className="md:hidden block absolute top-1/2 -left-2 -translate-y-1/2 !p-1 rounded-full"
              variant="secondary"
              onClick={() => setIsFullScreen((prev) => !prev)}
            >
              <Image
                className="w-5 h-5"
                src="/assets/icons/chevron-right-icon.svg"
                width={20}
                height={20}
                alt="Icon"
              />
            </Button>
          </div>
          <div
            className={clsx(
              'hidden w-[34%] max-w-[400px] h-screen border-l border-gray-200 bg-gray',
              {
                'xl:block': isShowProductInfo,
              },
            )}
          >
            <ProductInfo onClose={() => setIsShowProductInfo(false)} />
          </div>
          <Drawer
            ref={productDrawerRef}
            closeIconClassName="right-8"
            disabledPaddingX
            disabledPaddingY
          >
            <ProductInfo />
          </Drawer>
        </div>
      </section>
    </MessageContextProvider>
  );
};

export default Messages;
