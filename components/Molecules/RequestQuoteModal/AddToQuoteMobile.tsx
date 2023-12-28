import Button from '@/components/Button';
import CloseButtonMobile from '@/components/CloseButtonMobile';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import AddToQuote from './AddToQuote';

interface IAddToQuoteMobileProps {
  onClose: () => void;
  product?: any;
  onSubmit: () => void;
}

const AddToQuoteMobile: FC<IAddToQuoteMobileProps> = ({ product, onClose, onSubmit }) => {
  const form = useForm();
  return (
    <div className="h-screen fixed top-0 left-0 right-0 bottom-0 bg-gray z-20 flex flex-col">
      <div className="bg-white p-4 flex justify-end items-center">
        <CloseButtonMobile onClick={onClose}>
          <img className="w-6 h-6" src="/assets/icons/x-mark-icon.svg" />
        </CloseButtonMobile>
      </div>
      <AddToQuote product={product} />
      <div className="footer flex flex-col gap-4 absolute bottom-4 right-4 left-4">
        <Button variant="secondary" fullWidth onClick={onClose}>
          Cancel
        </Button>
        <Button fullWidth onClick={onSubmit}>
          Request Quote
        </Button>
      </div>
    </div>
  );
};

export default AddToQuoteMobile;
