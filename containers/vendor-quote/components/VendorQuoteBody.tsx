import Input from '@/components/Input';
import { ColumnsProps } from '@/components/Table';
import Textarea from '@/components/Textarea';
import { IProduct } from '@/interfaces/products';
import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import ItemsTable from './ItemsTable';
import { getProductList } from '@/services/dummy';
import Drawer, { IDrawerElement } from '@/components/Drawer';
import SuggestProducts from './SuggestProducts';
import DropdownButton, { IDropdownMenuItem } from '@/components/DropdownButton';

interface IVendorQuoteBodyProps {}

export type SectionSuggested = 'hardware' | 'connectivity';

const VendorQuoteBody: FC<IVendorQuoteBodyProps> = (props) => {
  const suggestDrawerRef = useRef<IDrawerElement>(null);
  const [hardwares, setHardwares] = useState<IProduct[]>([]);
  const [connectivity, setConnectivity] = useState<IProduct[]>([]);
  const [sectionSuggested, setSectionSuggested] = useState<SectionSuggested>();

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const res = await getProductList();
      setHardwares(res.slice(0, 2));
      setConnectivity(res.slice(-1));
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPrice = (rows: any[]) => {
    const totalPrice = rows?.reduce((prev, currentItem) => {
      return prev + currentItem?.quantity * currentItem?.unitPrice;
    }, 0);

    return `$${totalPrice?.toLocaleString()}`;
  };

  const handleOpenSuggestDrawer = (sectionSuggested: SectionSuggested) => {
    suggestDrawerRef.current?.open();
    setSectionSuggested(sectionSuggested);
  };

  const handleSelectAlternativeProduct = (product?: IProduct) => {
    if (!product) return;

    if (sectionSuggested === 'hardware') {
      setHardwares((prev) => [
        ...prev,
        {
          ...product,
          isSuggested: true,
        },
      ]);
    } else {
      setConnectivity((prev) => [
        ...prev,
        {
          ...product,
          isSuggested: true,
        },
      ]);
    }
    suggestDrawerRef.current?.close();
  };

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
      styles: 'w-[24%]',
      renderNode: (row: IProduct) => {
        return (
          <div className="flex items-center">
            <div className="relative w-15 h-10">
              <Image
                className="w-full h-full"
                src={row.image}
                width={60}
                height={40}
                alt={row.name}
              />
              {row?.isSuggested && (
                <p className="text-[10px] text-primary-100 px-1.5 border-[2px] leading-[14px] border-white rounded-[9px] bg-primary-500 absolute bottom-0 flex items-center py-0.5 -translate-x-1/2 left-1/2 translate-y-1/2">
                  Suggested
                </p>
              )}
            </div>
            <p className="flex flex-col ml-4">
              <span className="text-gray-1000 text-s md:text-base font-medium">{row.name}</span>
              <span className="text-gray-600 text-xs md:text-s mt-1">{row.ref}</span>
            </p>
          </div>
        );
      },
    },
    {
      title: 'Quantity',
      key: 'quantity',
      styles: 'w-[8%] text-end',
      renderNode: (row: IProduct) => row.quantity,
    },
    {
      title: 'Unit Price',
      key: 'unitPrice',
      styles: 'w-[20%] text-end',
      renderNode: (row: IProduct) => (
        <Input
          inputClassName="border-primary-400 border-[2px] bg-primary-100 max-w-[80px] self-end text-end"
          defaultValue={`$${row.unitPrice}`}
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      styles: 'w-[11%] text-end',
      renderNode: (row: IProduct) => (
        <div className="flex justify-end items-center relative">
          <span>${((row?.quantity || 0) * (row?.unitPrice || 0)).toLocaleString()}</span>
          <DropdownButton
            className="invisible group-hover:visible absolute -right-6 translate-x-full"
            dropdownMenu={dropdownMenu}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mt-5 rounded-xl bg-white">
        <div className="shadow rounded-xl mt-5">
          <div className="items p-6 flex flex-wrap">
            <div className="md:w-1/5 w-full mr-6">
              <p className="text-gray-1000 md:text-l text-base font-medium">Items</p>
              <p className="text-gray-500 text-s mt-0.5">Further instructions in one line</p>
            </div>
            <div className="md:flex-1 md:w-auto w-full mt-2 md:mt-0">
              <div className="hardware">
                <p className="text-gray-1000 text-base md:text-l font-medium mb-4">Hardware</p>
                <ItemsTable
                  rows={hardwares}
                  columns={columns}
                  additionalRow={
                    <div className="w-full flex items-center justify-end">
                      <p className="text-gray-1000 text-base font-semibold mr-8">Total</p>
                      <p className="text-gray-1000 text-base font-semibold">
                        {getTotalPrice(hardwares)}
                      </p>
                    </div>
                  }
                  onOpenSuggestDrawer={() => handleOpenSuggestDrawer('hardware')}
                />
              </div>
              <div className="connectivity mt-8">
                <p className="text-gray-1000 text-l font-medium mb-4">Connectivity</p>
                <ItemsTable
                  rows={connectivity}
                  columns={columns}
                  additionalRow={
                    <div className="w-full flex items-center justify-end">
                      <p className="text-gray-1000 text-base font-semibold mr-8">Total</p>
                      <p className="text-gray-1000 text-base font-semibold">
                        {getTotalPrice(connectivity)}
                      </p>
                    </div>
                  }
                  onOpenSuggestDrawer={() => handleOpenSuggestDrawer('connectivity')}
                />
              </div>
              <div className="shadow-s rounded-xl mt-8">
                <div className="border-t border-gray-100 px-6 py-4 text-gray-1000 text-base font-semibold flex items-center justify-end rounded-t-xl">
                  <p className="mr-8">Grand Total</p>
                  <p>{getTotalPrice([...hardwares, ...connectivity])}</p>
                </div>
                <div className="border-t border-gray-100 px-6 py-4 text-gray-1000 text-base  flex items-center justify-end rounded-t-xl">
                  <p className="mr-8">Tax</p>
                  <p>-</p>
                </div>
                <div className="border-t border-gray-100 px-6 py-4 text-gray-1000 text-base flex items-center justify-end rounded-t-xl">
                  <Button className="flex items-center mr-8" variant="inline">
                    <Image
                      src="/assets/icons/plus-primary-icon.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <span className="text-primary-500 text-base font-medium pl-2.5">
                      Add discount
                    </span>
                  </Button>
                  <div className="flex items-center">
                    <p className="mr-8">Discount</p>
                    <p>-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-100" />
          <div className="additional-info flex md:p-6 p-4 flex-wrap">
            <div className="md:w-1/5 w-full mr-6">
              <p className="text-gray-1000 text-l font-medium">Additional information</p>
              <p className="text-gray-500 text-s mt-0.5">Further instructions in one line</p>
            </div>
            <div className="md:flex-1 md:w-auto w-full mt-2 md:mt-0">
              <Input inputClassName="mb-6" defaultValue="8/31/2023" label="Quote by date" />
              <Textarea
                label="Note"
                defaultValue="Update delivery address before sending over the quote"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
      <Drawer ref={suggestDrawerRef} closeIconClassName="top-0 left-8">
        <SuggestProducts
          onSelectAlternativeProduct={handleSelectAlternativeProduct}
          onCloseDrawer={() => suggestDrawerRef.current?.close()}
        />
      </Drawer>
    </>
  );
};

export default VendorQuoteBody;
