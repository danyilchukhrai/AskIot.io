import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormTags from '@/components/FormComponents/FormTags';
import FormTextarea from '@/components/FormComponents/FormTextarea';
import UploadFileBox from '@/components/UploadFileBox';
import { IMAGE_ACCEPT_INPUT } from '@/constants/common';
import Image from 'next/image';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface IProductFormProps {
  onSelectFile: (file: File) => void;
  onRemoveImage: () => void;
}

const ProductForm: FC<IProductFormProps> = ({ onSelectFile, onRemoveImage }) => {
  const form = useFormContext();
  const { fields: productDetailsArray, append } = useFieldArray({
    control: form.control,
    name: 'product_details',
  });

  const handleAddMoreProductDetails = () => {
    append({
      name: '',
      description: '',
    });
  };

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
        <FormInput
          name="product_url"
          label="URL"
          placeholder="Enter URL"
         
        />
        <FormInput
          name="product_name"
          label="Name"
          placeholder="Enter Name"
         
        />
      </div>
      <FormTextarea
        name="product_description"
        label="Product Description"
        placeholder="Enter Product Description"
        rows={3}
        
      />
      <div className="product-details">
  <p className="text-gray-700 text-s mb-2 ">Product details</p>
  {productDetailsArray.map((field, index) => (
    <div className="flex items-center gap-4 mb-4" key={field.id}>
      <div className="flex-1">
        <label htmlFor={`product_details.${index}.name`} className="block text-sm font-small text-gray-700">
          Feature Title:
        </label>
        <FormInput
          id={`product_details.${index}.name`}
          name={`product_details.${index}.name`}
          placeholder="Enter feature title"
          className="mt-1"
        />
      </div>
      <div className="flex-1">
        <label htmlFor={`product_details.${index}.description`} className="block text-sm font-small text-gray-700">
          Feature Description:
        </label>
        <FormTextarea
          id={`product_details.${index}.description`}
          name={`product_details.${index}.description`}
          placeholder="Enter feature description"
          rows={3}
          className="mt-1"
        />
      </div>
    </div>
  ))}
  <Button
    className="flex items-center !p-0 mt-6"
    variant="inline"
    onClick={handleAddMoreProductDetails}
  >
    <Image src="/assets/icons/plus-icon.svg" alt="" width={24} height={24} />
    <span className="text-primary-500 ml-2.5 font-bold">Add more</span>
  </Button>
</div>

      <FormTags
        name="usecase"
        label="Use case (Please add a comma for multiple values)"
        placeholder="Enter use case"
        
      />
      <div className="grid grid-cols-1">
        <UploadFileBox
          accept={IMAGE_ACCEPT_INPUT}
          onSelectFile={onSelectFile}
          errorMessage={form.formState.errors?.file?.message as string}
          url={form.watch('product_image')}
          onRemoveImage={onRemoveImage}
        />
      </div>
    </div>
  );
};

export default ProductForm;
