import CloseButtonMobile from '@/components/CloseButtonMobile';
import { FC } from 'react';
import DeviceOffers from './DeviceOffers';

interface IDeviceOffersMobileProps {
  onClose: () => void;
}

const DeviceOffersMobile: FC<IDeviceOffersMobileProps> = ({ onClose }) => {
  return (
    <div className="h-screen fixed top-0 left-0 right-0 bottom-0 bg-gray z-20 flex flex-col">
      <div className="bg-white p-4 flex justify-between items-center md:hidden">
        <p className="text-gray-1000 text-l font-medium">What this device offers</p>
        <CloseButtonMobile onClick={onClose}>
          <img className="w-6 h-6" src="/assets/icons/x-mark-icon.svg" />
        </CloseButtonMobile>
      </div>
      <div className="flex-1 overflow-auto">
        <DeviceOffers className="p-4" />
      </div>
    </div>
  );
};

export default DeviceOffersMobile;
