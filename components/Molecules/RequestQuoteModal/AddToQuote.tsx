import { CustomNextImage } from '@/components/CustomImage';
import FormDatePicker from '@/components/FormComponents/DatePicker';
import FormInput from '@/components/FormComponents/FormInput';
import FormTextarea from '@/components/FormComponents/FormTextarea';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { FC } from 'react';

interface IAddToQuoteProps {
  product?: any;
}

const AddToQuote: FC<IAddToQuoteProps> = ({ product }) => {
  return (
    <div className="p-4 md:p-0">
      <div className="mb-5">
        <p className="text-gray-700 text-s mb-2">Item</p>
        <div className="p-3 rounded-lg shadow-s flex md:items-center md:flex-row flex-col bg-white">
          <div className="flex items-center w-full md:w-auto md:mr-16">
            <CustomNextImage
              className="rounded-lg md:w-[87px] md:h-[58px] w-15 h-7.5"
              src={product?.img || product?.product_image}
              alt={product?.name || ''}
              width={87}
              height={58}
            />
            <div className="md:ml-5 ml-2.5">
              <p className="text-xl text-gray-1000 font-medium md:mb-1.5 mb-0.5">
                {product?.name || product?.product_name}
              </p>
              {/* <p className="text-gray-500 text-s">{product?.ref}</p> */}
            </div>
          </div>
          <div className="flex md:items-center mt-4 md:mt-0">
            <CustomNextImage
              className="rounded-lg"
              src={product?.vendorlogo || DEFAULT_VENDOR_LOGO || ''}
              alt={product?.vendorName || ''}
              width={60}
              height={40}
            />
            <p className="ml-2.5 text-gray-1000 md:text-base text-s font-medium mt-1 md:mt-0">
              {product?.vendorName}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <FormInput name="quantity" label="Quantity" />
      </div>
      <div className="mb-5">
        <FormDatePicker name="requestedByDate" label="Requested By Date" inputClassName="w-full" />
      </div>
      <FormTextarea name="notes" label="Note to vendor" rows={3} />
    </div>
  );
};

export default AddToQuote;
