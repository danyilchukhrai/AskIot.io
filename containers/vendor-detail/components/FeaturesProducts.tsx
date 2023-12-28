import { CustomNextImage } from '@/components/CustomImage';
import Table from '@/components/Table';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { IProductByVendor } from '@/modules/vendors/type';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IFeaturesProductsProps {
  products?: IProductByVendor[];
}

const FeaturesProducts: FC<IFeaturesProductsProps> = ({ products }) => {
  const router = useRouter();

  const handleClickRow = (row: IProductByVendor) => {
    if (!row?.slug) return;
    router.push(`${RESTRICTED_APP_ROUTES.PRODUCTS}/${row?.recommendationType}/${row?.slug}`);
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
          {row?.key_features || row?.product_description}
        </p>
      ),
    },
  ];
  return (
    <div className="mt-5">
      {products?.length ? (
        <>
          <div className="rounded-t-xl border border-gray-100 border-b-0 px-6 py-4">
            <p className="text-primary-500 text-base font-medium">Features Products</p>
          </div>
          <Table
            containerClassName="rounded-t-none"
            rows={products || []}
            columns={columns}
            onClickRow={handleClickRow}
          />
        </>
      ) : (
        <p className="text-center">Empty</p>
      )}
    </div>
  );
};

export default FeaturesProducts;
