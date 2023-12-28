import Button from '@/components/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IFirstPanelMessage } from '@/modules/message/types';
import clsx from 'clsx';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { MessageContext } from '../../context';
import ChannelItem from './ChannelItem';

interface IChannelsProps {
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  isFullScreen: boolean;
}

const Channels: FC<IChannelsProps> = ({ setIsFullScreen, isFullScreen }) => {
  const isMobileMatches = useMediaQuery('(max-width: 767px)');
  const { channels, selectedChannel, setSelectedChannel } = useContext(MessageContext);

  const handleSelectChannel = (channel: IFirstPanelMessage) => {
    setSelectedChannel(channel);
    isMobileMatches && setIsFullScreen((prev) => !prev);
  };

  return (
    <div className="channels md:h-screen h-[calc(100vh-79px)] flex flex-col">
      <div className="channels-header p-6 border-b border-gray-100 flex justify-between items-center">
        <p className="text-gray-1000 text-l font-medium">Messages</p>
      </div>
      <div className="channels-body flex-1 overflow-auto relative">
        {channels.length ? (
          <ul className="h-full channel-list">
            {channels.map((channel, index) => (
              <li
                key={channel.quote_id}
                className={clsx('cursor-pointer', {
                  'bg-gray': channel.quote_id === selectedChannel?.quote_id,
                })}
                onClick={() => handleSelectChannel(channel)}
              >
                <ChannelItem channel={channel} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-gray-600">
            No message
          </p>
        )}
      </div>
      <div className="channels-footer p-6">
        <Button variant="secondary" onClick={() => setIsFullScreen((prev) => !prev)}>
          <Image
            className="w-5 h-5"
            src={
              isMobileMatches
                ? '/assets/icons/chevron-left-icon.svg'
                : isFullScreen
                ? '/assets/icons/chevron-right-icon.svg'
                : '/assets/icons/chevron-left-icon.svg'
            }
            width={20}
            height={20}
            alt="Icon"
          />
        </Button>
      </div>
    </div>
  );
};

export default Channels;
