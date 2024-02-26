import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import { RECOMMENDATION_TYPE } from '@/constants/iot-gpt';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import {
  createVendorDeviceDefaultValue,
  createVendorProductDefaultValue,
} from '@/constants/vendor-product-form';
import { VENDORS_TAB_KEY } from '@/constants/vendors';
import { getArrayValueFromTags, getMultipleValue, handleShowError } from '@/helpers/common';
import { useUploadFile } from '@/modules/common/hooks';
import {
  useCreateEditDevice,
  useCreateEditProduct,
  useGetProductById,
} from '@/modules/vendors/hooks';
import { vendorDeviceSchema, vendorProductSchema } from '@/validations/vendors';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import DeviceForm from './components/DeviceForm';
import ProductForm from './components/ProductForm';

interface IVendorProductFormProps {}

const VendorProductForm: FC<IVendorProductFormProps> = (props) => {
  const params = useParams();
  const { type = '', slug = '' } = params || {};
  const isEditMode = !!slug;
  const router = useRouter();
  const isDevice = type === RECOMMENDATION_TYPE.DEVICES;
  const productId = Number(slug);

  const { mutate: uploadFile, isPending: uploadingFile } = useUploadFile();
  const { mutate: createEditDevice, isPending: creatingDevice } = useCreateEditDevice();
  const { mutate: createEditProduct, isPending: creatingProduct } = useCreateEditProduct();
  const { data: productDetail, isLoading: gettingProductInfo } = useGetProductById(
    productId,
    isDevice,
  );

  const isLoading = creatingDevice || creatingProduct || uploadingFile;

  const deviceForm = useForm({
    defaultValues: createVendorDeviceDefaultValue,
    resolver: yupResolver(vendorDeviceSchema),
  });
  const productForm = useForm({
    defaultValues: createVendorProductDefaultValue,
    resolver: yupResolver(vendorProductSchema),
  });

  useEffect(() => {
    if (productDetail) {
      handleFillData();
    }
  }, [productDetail]);

  const handleFillData = () => {
    if (isDevice) {
      handleFillDeviceFormData();
    } else {
      productForm.reset({
        product_name: productDetail?.product_name,
        product_description: productDetail?.product_description,
        product_details: productDetail?.product_details?.map((it: any) => ({
          name: typeof it === 'object' ? Object.keys(it)?.[0] : it?.split(': ')?.[0],
          description: typeof it === 'object' ? Object.values(it)[0] : it?.split(': ')?.[1],
        })),
        usecase: productDetail?.usecase?.join(', '),
        product_url: productDetail?.product_url,
        product_image: productDetail?.product_image,
      });
    }
  };

  const handleFillDeviceFormData = () => {
    deviceForm.reset({
      ...productDetail,
      key_features: productDetail?.key_features?.join(', '),
    });
  };

  const handleCreateEditProductSuccess = () => {
    toast.success(isEditMode ? 'Product updated successfully' : 'Product created successfully');
    router.push(`${RESTRICTED_APP_ROUTES.MY_COMPANY}?tab=${VENDORS_TAB_KEY.Products}`);
  };

  const onSubmitDevice = ({ file, vendorid, ...data }: any) => {
    const body = {
      ...data,
      industries: getMultipleValue(data.industries),
      key_features: getArrayValueFromTags(data?.key_features),
      specifications: {
        ...data.specifications,
        nat: getMultipleValue(data.specifications.nat),
        supported_global_markets: getMultipleValue(data.specifications.supported_global_markets),
        security_protocol: getMultipleValue(data.specifications.security_protocol),
        vpn_support: getMultipleValue(data.specifications.vpn_support),
      },
    };

    if (file) {
      uploadFile(
        {
          file,
          type: type as string,
        },
        {
          onError: handleShowError,
          onSuccess: (product_image: string) => {
            createEditDevice(
              { data: { ...body, product_image }, id: productId },
              {
                onSuccess: handleCreateEditProductSuccess,
                onError: handleShowError,
              },
            );
          },
        },
      );
    } else {
      createEditDevice(
        { data: body, id: productId },
        {
          onSuccess: handleCreateEditProductSuccess,
          onError: handleShowError,
        },
      );
    }
  };

  const onSubmitProduct = ({ file, ...data }: any) => {
    const body = {
      ...data,
      usecase: getArrayValueFromTags(data.usecase),
      type,
    };

    if (isEditMode) {
      delete body.type;
      body.is_updated = true;
    }

    if (file) {
      uploadFile(
        {
          file,
          type: type as string,
        },
        {
          onError: handleShowError,
          onSuccess: (product_image: string) => {
            createEditProduct(
              {
                data: {
                  ...body,
                  product_image,
                },
                id: productId,
              },
              {
                onSuccess: handleCreateEditProductSuccess,
                onError: handleShowError,
              },
            );
          },
        },
      );
    } else {
      createEditProduct(
        {
          data: body,
          id: productId,
        },
        {
          onSuccess: handleCreateEditProductSuccess,
          onError: handleShowError,
        },
      );
    }
  };

  const handleSelectFile = (file: File) => {
    isDevice
      ? deviceForm.setValue('file', file, {
          shouldValidate: true,
        })
      : productForm.setValue('file', file, {
          shouldValidate: true,
        });
  };

  const handleRemoveImage = () => {
    const form: UseFormReturn<any> = isDevice ? deviceForm : productForm;
    form.setValue('product_image', '');
    form.setValue('file', undefined);
  };

  const getTitle = () => {
    if (isEditMode) {
      return isDevice ? `Edit device` : `Edit product`;
    }

    return isDevice ? `Add a new device` : `Add a new product`;
  };

  const commonFormsProps = {
    onSelectFile: handleSelectFile,
    onRemoveImage: handleRemoveImage,
  };

  if (gettingProductInfo) return <LoadingIndicator />;

  return (
    <>
      <section className="vendor-product-form py-9 px-8">
        <div className="section-header flex items-center gap-3">
          <BackButton />
          <p className="text-black text-l font-medium">{getTitle()}</p>
        </div>
        <div className="section-body pt-7 pb-8">
          {isDevice ? (
            <FormProvider {...deviceForm}>
              <DeviceForm {...commonFormsProps} />
            </FormProvider>
          ) : (
            <FormProvider {...productForm}>
              <ProductForm {...commonFormsProps} />
            </FormProvider>
          )}
        </div>
        <div className="section-footer flex items-center justify-end gap-3">
          <Link
            className="text-s md:text-base font-medium rounded-lg shadow-s text-gray-800 bg-white hover:bg-gray focus:ring-1 focus:ring-black disabled:bg-gray disabled:text-gray-300 w-fit px-3 py-2.5 text-center"
            href={`${RESTRICTED_APP_ROUTES.MY_COMPANY}?tab=${VENDORS_TAB_KEY.Products}`}
          >
            Cancel
          </Link>
          <Button
            variant="info"
            onClick={
              isDevice
                ? deviceForm.handleSubmit(onSubmitDevice)
                : productForm.handleSubmit(onSubmitProduct)
            }
            isLoading={creatingDevice || creatingProduct || uploadingFile}
          >
            {isEditMode ? 'Save' : 'Submit'}
          </Button>
        </div>
      </section>
      <LoadingIndicator isLoading={isLoading} />
    </>
  );
};

export default VendorProductForm;
