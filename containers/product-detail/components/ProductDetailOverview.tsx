import Button from '@/components/Button';
import Modal, { IModalElement } from '@/components/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ISpecification } from '@/modules/iot-gpt/type';
import { FC, useEffect, useRef, useState } from 'react';
import CommonListSection from './CommonListSection';
import DeviceOffers from './DeviceOffers';
import DeviceOffersMobile from './DeviceOffersMobile';
import IndustriesFeaturesModal from './IndustriesFeaturesModal';
import Specifications from './Specifications';

interface IProductDetailOverviewProps {
  product?: any;
  specifications?: ISpecification[];
  onAskAnything: () => void;
}

enum SEE_ALL_MODAL {
  SPECIFICATIONS,
  FEATURES,
  INDUSTRIES,
}

const ProductDetailOverview: FC<IProductDetailOverviewProps> = ({
  product,
  onAskAnything,
  specifications,
}) => {
  const seeAllModalRef = useRef<IModalElement>(null);
  const [openDeviceOffersMobile, setOpenDeviceOffersMobile] = useState(false);
  const [seeAllModalType, setSeeAllModalType] = useState<SEE_ALL_MODAL>(
    SEE_ALL_MODAL.SPECIFICATIONS,
  );
  const isMobileMatches = useMediaQuery('(max-width: 767px)');
  const industries = (product?.industries || '')?.split(',').filter((it: string) => it);

  useEffect(() => {
    if (isMobileMatches) {
      seeAllModalRef.current?.close();
    } else {
      openDeviceOffersMobile && setOpenDeviceOffersMobile(false);
    }
  }, [isMobileMatches]);

  const handleOpenSeeAllModal = (isOpen?: boolean) => {
    const open = typeof isOpen === 'boolean' ? isOpen : true;
    if (isMobileMatches && seeAllModalType === SEE_ALL_MODAL.SPECIFICATIONS) {
      setOpenDeviceOffersMobile(open);
    } else {
      open ? seeAllModalRef.current?.open() : seeAllModalRef.current?.close();
    }
  };

  const getModal = () => {
    switch (seeAllModalType) {
      case SEE_ALL_MODAL.FEATURES:
      case SEE_ALL_MODAL.INDUSTRIES: {
        const props = {
          list:
            seeAllModalType === SEE_ALL_MODAL.FEATURES
              ? product?.device_serp_ai?.features
              : industries,
        };
        return <IndustriesFeaturesModal {...props} />;
      }

      default:
        return <DeviceOffers specifications={specifications} />;
    }
  };

  const getModalTitle = () => {
    switch (seeAllModalType) {
      case SEE_ALL_MODAL.FEATURES:
        return 'Features';
      case SEE_ALL_MODAL.INDUSTRIES:
        return 'Industries';
      default:
        return 'What this device offers';
    }
  };

  return (
    <>
      <div className="mt-5">
        {product?.device_serp_ai?.introduction ||
          (product?.introduction && (
            <div className="p-6 rounded-xl shadow bg-white md:bg-transparent">
              <p className="text-primary-500 text-s">Introduction</p>
              <p className="text-gray-1000 text-base mt-2">
                {product?.device_serp_ai?.introduction || product?.introduction}
              </p>
            </div>
          ))}
        {product?.product_description && (
          <div className="p-6 rounded-xl shadow bg-white md:bg-transparent mt-6 md:mt-5">
            <p className="text-primary-500 text-s">Product description</p>
            <p className="text-gray-1000 text-base mt-2">{product?.product_description}</p>
          </div>
        )}
        {!!specifications?.length && (
          <Specifications
            specifications={specifications}
            onSeeAll={() => {
              setSeeAllModalType(SEE_ALL_MODAL.SPECIFICATIONS);
              handleOpenSeeAllModal();
            }}
          />
        )}
        {!!product?.device_serp_ai?.features?.length && (
          <CommonListSection
            title="Features"
            desc="Further instructions in one line"
            list={product?.device_serp_ai?.features}
            onSeeAll={() => {
              setSeeAllModalType(SEE_ALL_MODAL.FEATURES);
              handleOpenSeeAllModal();
            }}
          />
        )}
        {!!industries?.length && (
          <CommonListSection
            title="Industries"
            desc="Find industries here"
            list={industries}
            onSeeAll={() => {
              setSeeAllModalType(SEE_ALL_MODAL.INDUSTRIES);
              handleOpenSeeAllModal();
            }}
          />
        )}
        <Button
          className="md:hidden flex items-center justify-center w-full mt-6"
          variant="info"
          onClick={onAskAnything}
        >
          <img
            className="md:hidden"
            src="/assets/icons/ask-anything-icon.svg"
            alt="ask anything"
            width={20}
            height={20}
          />
          <span className="ml-2.5 text-base">Ask anything</span>
        </Button>
      </div>
      <Modal paperClassName="py-4" ref={seeAllModalRef} title={getModalTitle()} hideButtons>
        {getModal()}
      </Modal>
      {openDeviceOffersMobile && (
        <DeviceOffersMobile onClose={() => handleOpenSeeAllModal(false)} />
      )}
    </>
  );
};

export default ProductDetailOverview;
