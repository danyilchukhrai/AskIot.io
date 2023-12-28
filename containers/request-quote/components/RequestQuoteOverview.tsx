import Button from '@/components/Button';
import DropdownButton, { IDropdownMenuItem } from '@/components/DropdownButton';
import Input from '@/components/Input';
import Table, { ColumnsProps } from '@/components/Table';
import Textarea from '@/components/Textarea';
import { IProduct } from '@/interfaces/products';
import Image from 'next/image';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IRequestQuoteOverviewProps {}

const rows = [
  {
    id: uuidv4(),
    name: 'TankMon1',
    ref: 'Ref 76D87YD',
    description: 'Lorem ipsum dolor sit amet sit.',
    manufacturer: {
      name: 'Manufacturer 1',
      image: '/assets/images/manufacturer.svg',
      overview: `Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing. Sapien sit elit viverra feugiat nunc auctor pellentesque laoreet.
      Arcu eu proin risus vulputate risus nibh faucibus ultricies. Nec nisi pellentesque massa vitae sem velit lectus non. Mauris blandit sit ante non suspendisse.`,
    },
    image: '/assets/images/tank-mon-1.jpeg',
    technicalSpecification: {
      color: 'black',
      width: '2 in',
      height: '6 in',
      voltage: '5V',
    },
    overview: `Lorem ipsum dolor sit amet consectetur. Pretium in odio fringilla ut mi morbi. Commodo ipsum imperdiet posuere risus mauris nec lacus. Vitae risus justo fermentum ut vel gravida dictumst. Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing.
    Augue ac sit dolor pretium auctor pretium. Senectus egestas pretium at egestas vel nibh dignissim. Elit morbi ut ultrices cursus et. At sed lectus augue sed. Mi etiam et sem lectus auctor lacus mauris a.`,
  },
  {
    id: uuidv4(),
    name: 'TankMon2',
    ref: 'Ref 76D87YD',
    description: 'Lorem ipsum dolor sit amet sit.',
    manufacturer: {
      name: 'Manufacturer 2',
      image: '/assets/images/manufacturer.svg',
      overview: `Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing. Sapien sit elit viverra feugiat nunc auctor pellentesque laoreet.
      Arcu eu proin risus vulputate risus nibh faucibus ultricies. Nec nisi pellentesque massa vitae sem velit lectus non. Mauris blandit sit ante non suspendisse.`,
    },
    image: '/assets/images/tank-mon-2.jpeg',
    technicalSpecification: {
      color: 'black',
      width: '2 in',
      height: '6 in',
      voltage: '5V',
    },
    overview: `Lorem ipsum dolor sit amet consectetur. Pretium in odio fringilla ut mi morbi. Commodo ipsum imperdiet posuere risus mauris nec lacus. Vitae risus justo fermentum ut vel gravida dictumst. Tortor ac cras tempor mi libero pellentesque senectus quam nisl. Pellentesque donec a donec ac adipiscing.
    Augue ac sit dolor pretium auctor pretium. Senectus egestas pretium at egestas vel nibh dignissim. Elit morbi ut ultrices cursus et. At sed lectus augue sed. Mi etiam et sem lectus auctor lacus mauris a.`,
  },
];

const RequestQuoteOverview: FC<IRequestQuoteOverviewProps> = (props) => {
  const dropdownMenu: IDropdownMenuItem[] = [
    {
      label: 'Add note',
      icon: <Image src="/assets/icons/pencil-icon.svg" alt="" width={24} height={24} />,
      onAction: () => {},
    },
    {
      label: 'View details',
      icon: <Image src="/assets/icons/eye-icon.svg" alt="" width={24} height={24} />,
      onAction: () => {},
    },
    {
      label: <span className="text-red-500">Delete</span>,
      icon: <Image src="/assets/icons/danger-trash-icon.svg" alt="" width={24} height={24} />,
      onAction: () => {},
    },
  ];
  const columns: ColumnsProps[] = [
    {
      title: 'Item',
      key: 'item',
      styles: 'w-[28%] !pr-8',
      renderNode: (row: IProduct) => {
        return (
          <div className="flex items-center">
            <Image src={row.image} width={60} height={40} alt={row.name} />
            <p className="flex flex-col ml-4">
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
      styles: 'w-[28%] !pr-8',
      renderNode: (row: IProduct) => <p className="text-gray-600 text-base">{row.description}</p>,
    },
    {
      title: 'Manufacturer',
      key: 'manufacturer',
      styles: 'w-[23%]',
      renderNode: (row: IProduct) => (
        <div className="flex items-center">
          <Image src={row.manufacturer.image} width={20} height={20} alt={row.manufacturer.name} />
          <span className="ml-2.5">{row.manufacturer.name}</span>
        </div>
      ),
    },
    {
      title: 'Quantity',
      key: 'quantity',
      styles: 'w-[10%] text-end',
      renderNode: (row: IProduct) => (
        <Input inputClassName="text-end" defaultValue="10" placeholder="Quantity" />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      hiddenTitle: true,
      renderNode: (row: IProduct) => (
        <div className="flex justify-center items-center">
          <DropdownButton className="invisible group-hover:visible" dropdownMenu={dropdownMenu} />
        </div>
      ),
    },
  ];
  return (
    <div className="mt-5 rounded-xl shadow bg-white">
      <div className="items p-6 flex">
        <div className="w-1/5 mr-6">
          <p className="text-gray-1000 text-l font-medium">Items</p>
          <p className="text-gray-500 text-s mt-0.5">Further instructions in one line</p>
        </div>
        <div className="flex-1">
          <div className="hardware">
            <div className="hardware-header flex justify-between items-center mb-4">
              <p className="text-gray-1000 text-l font-medium">Hardware</p>
              <Button className="flex items-center" variant="inline">
                <Image src="/assets/icons/plus-icon.svg" alt="" width={20} height={20} />
                <span className="text-primary-500 ml-2.5">Add hardware item</span>
              </Button>
            </div>
            <Table rows={rows} columns={columns} />
          </div>

          <div className="connectivity mt-8">
            <div className="connectivity-header flex justify-between items-center mb-4">
              <p className="text-gray-1000 text-l font-medium">Connectivity</p>
              <Button className="flex items-center" variant="inline">
                <Image src="/assets/icons/plus-icon.svg" alt="" width={20} height={20} />
                <span className="text-primary-500 ml-2.5">Add connectivity item</span>
              </Button>
            </div>
            <Table rows={rows.slice(1)} columns={columns} />
          </div>

          <div className="platforms mt-8">
            <div className="connectivity-header flex justify-between items-center mb-4">
              <p className="text-gray-1000 text-l font-medium">Platforms</p>
              <Button className="flex items-center" variant="inline">
                <Image src="/assets/icons/plus-icon.svg" alt="" width={20} height={20} />
                <span className="text-primary-500 ml-2.5">Add platform item</span>
              </Button>
            </div>
            <div className="shadow-s rounded-xl py-4 px-6">
              <p className="text-gray-600 text-base">No platform items.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-100" />
      <div className="additional-info flex p-6">
        <div className="w-1/5 mr-6">
          <p className="text-gray-1000 text-l font-medium">Additional information</p>
          <p className="text-gray-500 text-s mt-0.5">Further instructions in one line</p>
        </div>
        <div className="flex-1">
          <Input inputClassName="mb-6" defaultValue="8/31/2023" label="Quote by date" />
          <Textarea
            label="Note"
            defaultValue="Update delivery address before sending over the quote"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestQuoteOverview;
