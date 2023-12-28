import { CustomNextImage } from '@/components/CustomImage';
import Table from '@/components/Table';
import { DUMMY_VENDORS } from '@/constants/dummy';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { IVendor } from '@/interfaces/vendor';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IVendorsProps {}

const Vendors: FC<IVendorsProps> = (props) => {
  const router = useRouter();

  const handleClickRow = (row: IVendor) => {
    router.push(`${RESTRICTED_APP_ROUTES.VENDORS}/${row.id}`);
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      renderNode: (row: IVendor) => {
        return (
          <div className="flex items-center md:w-auto w-25">
            <CustomNextImage src={row.avatar || ''} width={40} height={20} alt={row.name} />
            <p className="text-s md:text-base ml-2 font-medium text-gray-1000">{row.name}</p>
          </div>
        );
      },
    },
    {
      title: 'Address',
      key: 'address',
      renderNode: (row: IVendor) => row.address,
    },
  ];
  return (
    <section className="vendors-section p-4 md:p-8">
      <Table rows={DUMMY_VENDORS} columns={columns} onClickRow={handleClickRow} />
    </section>
  );
};

export default Vendors;
