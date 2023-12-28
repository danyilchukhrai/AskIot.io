import Button from '@/components/Button';
import { FC, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Badge from '@/components/Badge';
import Textarea from '@/components/Textarea';
import Modal, { IModalElement } from '@/components/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import InfoItem from '@/containers/vendor-detail/components/InfoItem';

interface IVendorQuoteHeaderProps {}

const VendorQuoteHeader: FC<IVendorQuoteHeaderProps> = (props) => {
  const router = useRouter();
  const modalRef = useRef<IModalElement>(null);
  const isMobileMatches = useMediaQuery('(max-width: 767px)');

  const handleBack = () => {
    router.back();
  };

  const handleSubmitQuote = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <div className="vendor-quote-header">
        <Button className="flex" variant="secondary" onClick={handleBack}>
          <Image src="/assets/icons/arrow-left-icon.svg" alt="arrow left" width={20} height={20} />
          <span className="ml-2.5">Back</span>
        </Button>
        <div className="quote md:p-6 p-4 shadow rounded-xl flex items-center justify-between mt-5 flex-wrap">
          <div className="w-full md:w-auto">
            <div className="flex items-center">
              <p className="text-black text-xl font-medium mr-4">Quote</p>
              <Badge
                label="To Review"
                color="orange"
                size={isMobileMatches ? 'small' : 'default'}
              />
            </div>
            <p className="text-gray-600 text-s mt-1.5">
              <span>Tank monitoring</span>
              <span className="inline-block w-[1px] h-3 bg-gray-200 mx-3"></span>
              <span>quoteID sd8lanr98s2bh4gv</span>
            </p>
          </div>
          <div className="flex items-center w-full md:w-auto mt-4 md:mt-0">
            <Button className="mr-4" variant="secondary">
              Reject Quote
            </Button>
            <Button onClick={() => modalRef.current?.open()}>Submit Quote</Button>
          </div>
        </div>
        <div className="customer md:p-6 p-4 mt-5 rounded-xl shadow">
          <p className="text-gray-1000 text-l font-medium mb-5">Customer</p>
          <div className="flex items-center mb-5">
            <Image src="/assets/images/avatar-default.png" width={32} height={32} alt="" />
            <div className="ml-3">
              <p className="text-gray-1000 text-s font-medium">Kim Kinam</p>
              <p className="text-gray-500 text-xs mt-0.5">CEO</p>
            </div>
          </div>
          <div className="text-gray-600 text-s">
            <InfoItem
              iconSrc="/assets/icons/location-icon.svg"
              label="12100 Samsung Boulevard, Austin, Texas 78754, USA"
            />
            <div className="flex items-center mt-2 flex-wrap">
              <InfoItem iconSrc="/assets/icons/phone-icon.svg" label="(201) 229-4000" />
              <div className="w-[1px] h-3 bg-gray-200 mx-3" />
              <InfoItem iconSrc="/assets/icons/email-icon.svg" label="info@samsung.com" />
              <div className="w-[1px] h-3 bg-gray-200 mx-3" />
              <InfoItem iconSrc="/assets/icons/globe-icon.svg" label="samsung.com" />
            </div>
          </div>
        </div>
        <div className="your-response md:p-6 p-4 mt-5 shadow rounded-xl">
          <p className="text-gray-1000 text-l font-medium mb-6">Your Response</p>
          <Textarea
            className="border-[2px] border-primary-400 bg-primary-100"
            placeholder="Type your response..."
            rows={3}
          />
        </div>
      </div>
      <Modal
        ref={modalRef}
        title="Submit Quote"
        secondaryButtonLabel="Back to review"
        primaryButtonLabel="Submit Quote"
        onSubmit={handleSubmitQuote}
      >
        <p className="text-gray-1000 md:text-base text-s">
          Lorem ipsum dolor sit amet consectetur. Vulputate justo aenean magna aliquet mollis.
          Commodo dignissim arcu pulvinar sapien magna viverra arcu sit fringilla.
        </p>
      </Modal>
    </>
  );
};

export default VendorQuoteHeader;
