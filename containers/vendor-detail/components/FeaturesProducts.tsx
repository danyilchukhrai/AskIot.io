import Button from '@/components/Button';
import { CustomNextImage } from '@/components/CustomImage';
import FormSelect from '@/components/FormComponents/FormSelect';
import LoadingIndicator from '@/components/LoadingIndicator';
import Modal, { IModalElement } from '@/components/Modal';
import Table from '@/components/Table';
import { USER_TYPE } from '@/configs/routeConfig';
import { RECOMMENDATION_TYPE } from '@/constants/iot-gpt';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { handleShowError } from '@/helpers/common';
import { useDeleteProduct } from '@/modules/vendors/hooks';
import { IProductByVendor } from '@/modules/vendors/type';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { useRouter } from 'next/navigation';
import { FC, MouseEvent, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IFeaturesProductsProps {
  products?: IProductByVendor[];
}

const FeaturesProducts: FC<IFeaturesProductsProps> = ({ products }) => {
  const router = useRouter();
  const productTypeModalRef = useRef<IModalElement>(null);
  const confirmModalRef = useRef<IModalElement>(null);
  const form = useForm();
  const { mutate: deleteProduct, isPending: deletingProduct } = useDeleteProduct();
  const [selectedProduct, setSelectedProduct] = useState<IProductByVendor>();
  const { currentUserType } = useUserTypeContext();
  const isVendor = currentUserType === USER_TYPE.PROVIDER;

  const handleRedirectToCreateForm = (data: any) => {
    if (data?.type) {
      router.push(`${RESTRICTED_APP_ROUTES.MY_COMPANY}/${data.type}/create`);
    }
  };

  const handleEditProduct = (e: MouseEvent<HTMLButtonElement>, row: IProductByVendor) => {
    e.stopPropagation();
    router.push(`${RESTRICTED_APP_ROUTES.MY_COMPANY}/${row.type}/${row?.product_id}`);
  };

  const handleDeleteProduct = (product?: IProductByVendor) => {
    const isDevice = selectedProduct?.type === RECOMMENDATION_TYPE.DEVICES;
    if (product?.product_id) {
      deleteProduct(
        {
          id: product.product_id,
          vendorId: product.vendorid,
          isDevice,
        },
        {
          onSuccess: () => {
            toast.success(
              isDevice ? 'Device deleted successfully' : 'Product deleted successfully',
            );
            confirmModalRef.current?.close();
          },
          onError: handleShowError,
        },
      );
    }
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      renderNode: (row: IProductByVendor) => {
        return (
          <div className="flex items-center w-50 md:w-auto">
            <CustomNextImage
              className="h-10 w-15 rounded-[6px]"
              src={row?.product_image || row?.img}
              width={60}
              height={40}
              alt={row?.product_name || ''}
            />
            <div className="ml-8">
              <p className="text-base font-medium text-gray-1000">
                {row?.product_name || row?.name}
              </p>
              {/* <p className="text-s text-gray-600 mt-1">{row.ref}</p> */}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Features',
      key: 'features',
      renderNode: (row: IProductByVendor) => (
        <p className="text-base text-gray-1000 md:w-auto w-50">
          {row?.key_features?.description || row?.product_description}
        </p>
      ),
    },
    {
      title: '',
      key: 'actions',
      renderNode: (row: IProductByVendor) => (
        <div className="flex items-center gap-2 justify-end min-w-[100px]">
          <Button variant="inline" onClick={(e) => handleEditProduct(e, row)}>
            <img src="/assets/icons/pencil-icon.svg" alt="" width={20} height={20} />
          </Button>
          <Button
            variant="inline"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(row);
              confirmModalRef.current?.open();
            }}
          >
            <img src="/assets/icons/danger-trash-icon.svg" alt="" width={20} height={20} />
          </Button>
        </div>
      ),
      hidden: !isVendor,
    },
  ];

  return (
    <>
      <div className="mt-5">
        {products?.length ? (
          <>
            <div className="rounded-t-xl border border-gray-100 border-b-0 px-6 py-4 flex justify-between items-center">
              <p className="text-primary-500 text-base font-medium">Features Products</p>
              {isVendor && (
                <Button onClick={() => productTypeModalRef.current?.open()}>Create</Button>
              )}
            </div>
            <Table containerClassName="rounded-t-none" rows={products || []} columns={columns} />
          </>
        ) : (
          <p className="text-center">Empty</p>
        )}
      </div>
      <Modal
        ref={productTypeModalRef}
        title="Select type"
        primaryButtonLabel="Next"
        onSubmit={form.handleSubmit(handleRedirectToCreateForm)}
      >
        <FormProvider {...form}>
          <FormSelect
            name="type"
            label="Type"
            placeholder="Please select"
            options={[
              RECOMMENDATION_TYPE.DEVICES,
              RECOMMENDATION_TYPE.PLATFORM,
              RECOMMENDATION_TYPE.CONNECTIVITY,
              RECOMMENDATION_TYPE.SERVICES,
              RECOMMENDATION_TYPE.HARDWARE,
            ]}
          />
        </FormProvider>
      </Modal>
      <Modal
        ref={confirmModalRef}
        title="Delete product"
        primaryButtonLabel="Delete"
        onSubmit={() => handleDeleteProduct(selectedProduct)}
      >
        <div className="text-base">
          <p>Are you sure you want to delete this product?</p>
          <p>This action cannot be undone.</p>
        </div>
      </Modal>
      <LoadingIndicator isLoading={deletingProduct} />
    </>
  );
};

export default FeaturesProducts;
