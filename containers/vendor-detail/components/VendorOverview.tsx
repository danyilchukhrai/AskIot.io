import DropdownButton from '@/components/DropdownButton';
import { ColumnsProps } from '@/components/Table';
import { IProduct } from '@/interfaces/products';
import { IVendorDetails } from '@/modules/vendors/type';
import Image from 'next/image';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IVendorOverviewProps {
  vendor?: IVendorDetails;
}

const rows = [
  {
    id: uuidv4(),
    name: 'TankMon1',
    ref: 'Ref 76D87YD',
    description: 'Lorem ipsum dolor sit amet sit.',
    image: '/assets/images/tank-mon-1.jpeg',
  },
  {
    id: uuidv4(),
    name: 'TankMon2',
    ref: 'Ref 76D87YD',
    description: 'Lorem ipsum dolor sit amet sit.',

    image: '/assets/images/tank-mon-2.jpeg',
  },
];

const VendorOverview: FC<IVendorOverviewProps> = ({ vendor }) => {
  const orgDetail = vendor?.orgDetails?.[0];

  const columns: ColumnsProps[] = [
    {
      title: 'Name',
      key: 'name',
      styles: 'w-[28%] !pr-8',
      renderNode: (row: IProduct) => {
        return (
          <div className="flex items-center md:flex-row flex-col w-23 md:w-auto">
            <Image src={row.image} width={60} height={40} alt={row.name} />
            <p className="flex flex-col md:ml-4 ml-2 items-center md:items-start mt-1 md:mt-0">
              <span className="text-gray-1000 text-base font-medium">{row.name}</span>
              <span className="text-gray-600 text-s mt-1">{row.ref}</span>
            </p>
          </div>
        );
      },
    },
    {
      title: 'Features',
      key: 'features',
      styles: '!pr-8',
      renderNode: (row: IProduct) => <p className="text-gray-600 text-base">{row.description}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      hiddenTitle: true,
      renderNode: (row: IProduct) => (
        <div className="flex justify-end items-center">
          <DropdownButton className="invisible group-hover:visible" dropdownMenu={[]} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="rounded-xl shadow p-6 mt-5">
        <div className="mb-6">
          <p className="text-primary-500 text-base font-medium md:mb-6 mb-3">Details</p>
          <div className="flex md:flex-row flex-col">
            <p className="text-gray-1000 text-base font-semibold w-[15%] mr-2 md:mb-0 mb-1">
              Overview
            </p>
            <p className="flex-1 text-base text-gray-1000">{vendor?.snippet}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <div>
            <div className="text-gray-1000 text-base flex items-center mb-6">
              <p className=" font-semibold w-[30%] mr-2">Linkedin</p>
              <p className="flex-1 text-end md:text-start word-break">
                {orgDetail?.organization_linkedin_url}
              </p>
            </div>
            <div className="text-gray-1000 text-base flex items-center">
              <p className=" font-semibold w-[30%] mr-2">Specialties</p>
              <p className="flex-1 text-end md:text-start">{'Specialties'}</p>
            </div>
          </div>

          <div>
            <div className="text-gray-1000 text-base flex items-center mb-6">
              <p className=" font-semibold w-[30%] mr-2">Industry</p>
              <p className="flex-1 text-end md:text-start">{'Industry'}</p>
            </div>
            <div className="text-gray-1000 text-base flex items-center mb-6">
              <p className=" font-semibold w-[30%] mr-2">Twitter</p>
              <p className="flex-1 text-end md:text-start word-break">
                {orgDetail?.organization_twitter_url}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="rounded-xl shadow mt-5">
        <p className="text-primary-500 font-medium text-base px-6 py-4">Features Products</p>
        <Table containerClassName="rounded-t-none" rows={rows} columns={columns} />
      </div> */}
    </>
  );
};

export default VendorOverview;
