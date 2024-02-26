import Avatar from '@/components/Avatar';
import Input from '@/components/Input';
import Table, { ColumnsProps } from '@/components/Table';
import Textarea from '@/components/Textarea';
import Tooltip from '@/components/Tooltip';
import { USER_TYPE } from '@/configs/routeConfig';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { VERIFIED_VENDOR_MESSAGE } from '@/constants/vendors';
import { IProductDetails, IProviderFormData, IQuoteDetails } from '@/interfaces/quotes';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';
import { formatWebsiteUrl } from '@/helpers/common'; 


interface IQuoteDetailOverviewProps {
  onOpenChatDrawer: () => void;
  quoteDetails: IQuoteDetails;
  providerFormData: IProviderFormData;
  setProviderFormData: Dispatch<SetStateAction<IProviderFormData>>;
  vendorNotesIsValid: boolean;
  offeredPriceIsValid: boolean;
  setVendorNotesIsValid: Dispatch<SetStateAction<boolean>>;
  setOfferedPriceIsValid: Dispatch<SetStateAction<boolean>>;
}

const QuoteDetailOverview: FC<IQuoteDetailOverviewProps> = ({
  onOpenChatDrawer,
  quoteDetails,
  providerFormData,
  setProviderFormData,
  vendorNotesIsValid,
  offeredPriceIsValid,
  setVendorNotesIsValid,
  setOfferedPriceIsValid,
}) => {
  const { currentUserType } = useUserTypeContext();
  const IS_USER = currentUserType === USER_TYPE.USER;
  const IS_PROVIDER = currentUserType === USER_TYPE.PROVIDER;
  const { first_name, last_name, email, website }  = quoteDetails?.user || {}
  const getTotalPrice = (offeredPrice: any) => {
    if (offeredPrice) {
      const totalPrice = offeredPrice || 0;
      return `$${totalPrice?.toLocaleString()}`;
    }
    return '-';
  };

  const columns: ColumnsProps[] = [
    {
      title: 'Item',
      key: 'item',
      styles: 'w-[28%] !pr-8',
      renderNode: (row: IProductDetails) => {
        return (
          <div className="flex items-center md:flex-row flex-col md:w-auto w-25">
            <Image src={row?.product_image} width={60} height={40} alt="" />
            <p className="flex flex-col ml-4 md:mt-0 mt-2">
              <span className="text-gray-1000 text-s md:text-base font-medium">{row?.name}</span>
              {/* <span className="text-gray-600 text-xs md:text-s mt-1">{row.type}</span> */}
            </p>
          </div>
        );
      },
    },
    {
      title: `${IS_USER ? 'Manufacturer' : 'Quantity'}`,
      key: `${IS_USER ? 'manufacturer' : 'quantity'}`,
      styles: 'w-[32%]',
      renderNode: (row: IProductDetails) => {
        return (
          <>
            {IS_USER ? (
              <div className="flex items-center md:w-auto w-[140px]">
                <Image src={row?.vendorlogo || DEFAULT_VENDOR_LOGO} width={20} height={20} alt="" />
                <span className="ml-2.5 text-s md:text-base">{row?.vendorname}</span>
                {row?.verified && (
                  <Tooltip text={VERIFIED_VENDOR_MESSAGE}>
                    <img
                      className="max-w-10 max-h-10"
                      src="/assets/images/askiot_verified_small.png"
                    />
                  </Tooltip>
                )}
              </div>
            ) : (
              <p className="text-s md:text-base w-20">{`${row?.quantity} `}</p>
            )}
          </>
        );
      },
    },
    {
      title: `${IS_USER ? 'Quantity' : 'Unit Price ($)'}`,
      key: `${IS_USER ? 'quantity' : 'unit_price'}`,
      styles: 'w-[20%]',
      renderNode: (row: IProductDetails) => {
        return (
          <>
            {IS_USER ? (
              <p className="text-s md:text-base w-20">{`${row?.quantity} `}</p>
            ) : (
              // <FormInput name="offeredPrice" className="w-20 h-10" />
              <input
                type="text"
                value={providerFormData?.offeredPrice || 0}
                onChange={(evt) => {
                  if (evt?.target?.value) {
                    setOfferedPriceIsValid(true);
                  } else {
                    setOfferedPriceIsValid(false);
                  }
                  setProviderFormData((prevData) => ({
                    ...prevData,
                    offeredPrice: Number(evt?.target?.value),
                  }));
                }}
                className={clsx(
                  'w-20 h-10 rounded-lg px-3 py-2.5 text-gray-1000 text-base text-right focus:ring-[1px] focus:ring-transparent ',
                  offeredPriceIsValid
                    ? 'border-[1px] '
                    : 'border-[1px] border-red-500 focus:border-red-500',
                )}
              />
            )}
          </>
        );
      },
    },
    {
      title: `${IS_USER ? 'Unit Price ($)' : 'Total'}`,
      key: `${IS_USER ? 'unit_price' : 'total'}`,
      styles: 'w-[15%] text-end',
      renderNode: (row: IProductDetails) => {
        if (IS_USER) {
          if (row?.offered_price) {
            return row?.offered_price?.toLowerCase();
          } else {
            return '-';
          }
        } else {
          {
            return getTotalPrice(providerFormData?.offeredPrice * row?.quantity);
          }
        }
      },
    },
  ];

  return (
    <div className="mt-5 rounded-xl bg-white">
      {/* <div className="p-6 rounded-xl bg-primary-100">
        <p className="text-base text-primary-600 font-medium mb-2">Notes from Vendor</p>
        <p className="text-base text-primary-600">
          Lorem ipsum dolor sit amet consectetur. Hac duis enim tempus feugiat risus dolor ut.
          Varius in habitasse pellentesque etiam lacus proin. Sociis diam consectetur volutpat
          habitant urna laoreet pulvinar libero integer.
        </p>
        <div className="mt-6">
          <Button variant="secondary" onClick={onOpenChatDrawer}>
            Reply
          </Button>
          <span className="text-gray-1000 text-base font-medium cursor-pointer ml-4">
            Continue in email
          </span>
        </div>
      </div> */}
      {IS_PROVIDER && (
        <div className="shadow rounded-xl mt-5 p-3 sm:p-4 md:p-6">
          <p className="text-l font-medium">Customer</p>
          <div className="flex items-center mt-3 md:mt-5">
  <Avatar
    src="/assets/images/avatar-default.png"
    firstName={first_name}
    lastName={last_name || ''}
    className="bg-blue-600" 
  />
  <div className="ml-3">
    <p className="capitalize font-semibold text-lg text-gray-900"> {/* Increased font weight and size for better visibility */}
      {first_name} {last_name || ''}
    </p>
    <a href={`mailto:${email}`} className="flex items-center text-sm text-blue-500 hover:text-blue-800 mt-1"> {/* Adjusted text colors for your website palette */}
      <svg className="fill-current mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9l7.997-3.116A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z"/>
        <path d="M18 8l-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      </svg>
      {email}
    </a>
    <a href={formatWebsiteUrl(website)} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-500 hover:text-blue-800 mt-1">
      <svg className="fill-current mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> 
        <path d="M10.59,13.41L9.17,14.83a1,1,0,1,1-1.41-1.41l1.42-1.42a1,1,0,0,1,1.41,1.41Z"/>
        <path d="M14.83,9.17l1.42-1.42a1,1,0,0,0-1.41-1.41L13.41,7.76a1,1,0,0,0,1.42,1.41Z"/>
        <path d="M8,11a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h4a1,1,0,0,0,0-2H9V12A1,1,0,0,0,8,11Z"/>
        <path d="M16,3H8A5,5,0,0,0,3,8v8a5,5,0,0,0,5,5h8a5,5,0,0,0,5-5V8A5,5,0,0,0,16,3Zm3,10a3,3,0,0,1-3,3H8a3,3,0,0,1-3-3V8A3,3,0,0,1,8,5h8a3,3,0,0,1,3,3Z"/>
      </svg>
      {website}
    </a>
  </div>
</div>

        </div>
      )}
      {(IS_PROVIDER || (quoteDetails?.vendor_to_user_message && IS_USER)) && (
        <div className="shadow rounded-xl mt-5">
          <div className="px-4 md:px-5 py-2 md:py-3">
            <p className="text-gray-1000 text-l font-medium">
              {IS_PROVIDER ? 'Your Response' : 'Vendor Response'}
            </p>
            <div className="mt-3">
              {IS_PROVIDER ? (
                // <FormTextarea
                //   rows={3}
                //   name="vendorNotes"
                //   value={quoteDetails?.vendor_to_user_message || ''}
                // />
                <textarea
                  rows={3}
                  className={clsx(
                    'rounded-lg w-full px-3 py-2.5 shadow-s text-gray-1000 text-base resize-none',
                    vendorNotesIsValid
                      ? 'border-[1px]'
                      : 'border-[1px] border-red-500 focus:border-red-500',
                  )}
                  placeholder="Type your response..."
                  value={providerFormData?.vendorNotes}
                  onChange={(evt) => {
                    if (evt?.target?.value) {
                      setVendorNotesIsValid(true);
                    } else {
                      setVendorNotesIsValid(false);
                    }
                    setProviderFormData((prevData) => ({
                      ...prevData,
                      vendorNotes: evt?.target?.value,
                    }));
                  }}
                />
              ) : (
                <>
                  <Textarea rows={3} value={quoteDetails?.vendor_to_user_message || ''} disabled />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="shadow rounded-xl mt-5">
        <div className="items p-6 flex flex-wrap">
          <div className="md:w-1/5 w-full mr-6">
            <p className="text-gray-1000 text-l font-medium">Items</p>
            <p className="text-gray-500 text-s mt-0.5">Further instructions in one line</p>
          </div>
          <div className="md:flex-1 w-full md:w-auto">
            <div className="hardware">
              <p className="text-gray-1000 text-l font-medium mb-4 capitalize">
                {quoteDetails?.type}
              </p>
              <Table
                rows={[
                  {
                    ...quoteDetails?.productDetails,
                    offered_price: quoteDetails?.offered_price,
                    quantity: quoteDetails?.quantity,
                  },
                ]}
                columns={columns}
                additionalRow={
                  <div className="w-full flex items-center justify-end">
                    <p className="text-gray-1000 text-base font-semibold mr-8">Total</p>
                    <p className="text-gray-1000 text-base font-semibold">
                      {getTotalPrice(providerFormData?.offeredPrice * quoteDetails?.quantity)}
                    </p>
                  </div>
                }
              />
            </div>
            {/* 
            <div className="connectivity mt-8">
              <p className="text-gray-1000 text-l font-medium mb-4">Connectivity</p>
              <Table
                rows={rows.slice(1)}
                columns={columns}
                additionalRow={
                  <div className="w-full flex items-center justify-end">
                    <p className="text-gray-1000 text-base font-semibold mr-8">Total</p>
                    <p className="text-gray-1000 text-base font-semibold">
                      {getTotalPrice(rows.slice(1))}
                    </p>
                  </div>
                }
              />
            </div> */}
            <div className="shadow-s rounded-xl mt-8">
              {/* <div className="border-t border-gray-100 px-6 py-4 text-gray-1000 text-base font-semibold flex items-center justify-end rounded-t-xl">
                <p className="mr-8">Grand Total</p>
                <p>{getTotalPrice(providerFormData)}</p>
              </div> */}
              {/* <div className="border-t border-gray-100 px-6 py-4 text-gray-1000 text-base  flex items-center justify-end rounded-t-xl">
                <p className="mr-8">Tax</p>
                <p>-</p>
              </div>
              <div className="border-t border-gray-100 px-6 py-4 text-gray-1000 text-base flex items-center justify-end rounded-t-xl">
                <p className="mr-8">Discount</p>
                <p>-</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-100" />
        <div className="additional-info flex p-6 md:flex-row flex-col">
          <div className="md:w-1/5 w-full mr-6">
            <p className="text-gray-1000 text-l font-medium">Additional information</p>
            <p className="text-gray-500 text-s mt-0.5">Further instructions in one line</p>
          </div>

          <div className="md:flex-1 w-full md:w-auto">
            <Input
              label="Quote by Date"
              value={new Date(quoteDetails?.requested_by_date).toDateString()}
              disabled
            />

            <div className="flex flex-col w-full md:mt-6 mt-4">
              <p className="text-gray-700 text-s mb-2">Note</p>
            </div>
            <Textarea rows={3} value={quoteDetails?.user_to_vendor_message || 'N/A'} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailOverview;
