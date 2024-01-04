'use-client';
import Button from '@/components/Button';
import ConfirmModal from '@/components/ConfirmModal';
import Image from 'next/image';
import { FC } from 'react';

interface ISubmitQuoteModal {
  onSuccess: () => void;
  onClose: () => void;
  buttonLoading: boolean;
}

const SubmitQuoteModal: FC<ISubmitQuoteModal> = ({ onSuccess, onClose, buttonLoading }) => {
  return (
    <ConfirmModal>
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-l leading-[32px] font-semibold">Submit Quote</p>
          <Image
            src="/assets/icons/x-mark-icon.svg"
            className="cursor-pointer"
            alt=""
            height={16}
            width={16}
            onClick={onClose}
          />
        </div>
        <div className="mt-3">
          <p className="text-xs">
            Please make sure all changes are correct before sending quote for accepted to user
          </p>
        </div>
        <div className="flex mt-5">
          <Button onClick={onClose} className="flex-1 mr-2" variant="secondary">
            Back to Review
          </Button>
          <Button onClick={onSuccess} className="flex-1" disabled={buttonLoading}>
            Submit Quote{buttonLoading && '...'}
          </Button>
        </div>
      </div>
    </ConfirmModal>
  );
};

export default SubmitQuoteModal;
