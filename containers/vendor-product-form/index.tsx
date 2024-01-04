import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import { RECOMMENDATION_TYPE } from '@/constants/iot-gpt';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import {
  createVendorDeviceDefaultValue,
  createVendorProductDefaultValue,
} from '@/constants/vendor-product-form';
import { getArrayValueFromTags, getMultipleValue, handleShowError } from '@/helpers/common';
import { useUploadFile } from '@/modules/common/hooks';
import {
  useCreateEditDevice,
  useCreateEditProduct,
  useGetProductById,
} from '@/modules/vendors/hooks';
import { vendorDeviceSchema, vendorProductSchema } from '@/validations/vendors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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
          name: it?.split(': ')[0],
          description: it?.split(': ')[1],
        })),
        usecase: productDetail?.usecase?.join(', '),
        product_url: productDetail?.product_url,
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
    router.push(RESTRICTED_APP_ROUTES.MY_COMPANY);
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
          type: isDevice ? RECOMMENDATION_TYPE.DEVICES : RECOMMENDATION_TYPE.PRODUCTS,
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
          type: isDevice ? RECOMMENDATION_TYPE.DEVICES : RECOMMENDATION_TYPE.PRODUCTS,
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

  const getTitle = () => {
    if (isEditMode) {
      return isDevice ? `Edit device` : `Edit product`;
    }

    return isDevice ? `Add a new device` : `Add a new product`;
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
              <DeviceForm onSelectFile={handleSelectFile} />
            </FormProvider>
          ) : (
            <FormProvider {...productForm}>
              <ProductForm onSelectFile={handleSelectFile} />
            </FormProvider>
          )}
        </div>
        <div className="section-footer flex items-center justify-end">
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
