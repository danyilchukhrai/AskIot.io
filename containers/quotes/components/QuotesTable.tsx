import Badge, { ColorType } from '@/components/Badge';
import { CustomNextImage } from '@/components/CustomImage';
import Spinner from '@/components/Spinner';
import Table, { ColumnsProps } from '@/components/Table';
import Tooltip from '@/components/Tooltip';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { QUOTE_STATUS, colorByStatus } from '@/constants/quotes';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { VERIFIED_VENDOR_MESSAGE } from '@/constants/vendors';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { getQuotesURL } from '@/services/quotes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getQuoteStatus } from '../utils';
interface IQuotesTableProps {
  status?: QUOTE_STATUS;
  currentUserType: string;
}

const QuotesTable: FC<IQuotesTableProps> = ({ status, currentUserType }) => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<any[]>([]);
  const [isQuotesLoading, setIsQuotesLoading] = useState(true);
  const router = useRouter();
  const { isVendor } = useUserTypeContext();

  useEffect(() => {
    getQuotesHandler();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (status && quotes) {
      setFilteredQuotes(quotes?.filter((quote) => quote?.status === status));
    }
  }, [status]); // eslint-disable-line

  const getQuotesHandler = async () => {
    try {
      setIsQuotesLoading(true);
      const quotesURL = getQuotesURL(currentUserType);
      const quotes: any[] = await askIOTApiFetch(quotesURL);
      setQuotes(quotes);
      setIsQuotesLoading(false);
    } catch (error: any) {
      const errorData = await error?.json();
      setIsQuotesLoading(false);
      toast.error(errorData?.message);
    }
  };

  const handleClickRow = (row: any) => {
    router.push(
      isVendor
        ? `${RESTRICTED_APP_ROUTES.VENDOR_QUOTES}/${row?.quote_id}`
        : `${RESTRICTED_APP_ROUTES.QUOTES}/${row?.quote_id}`,
    );
  };

  const renderImage = (imageURL: string) => {
    console.log('imageURL: ', imageURL);
    return (
      <Image
        src={imageURL || ''}
        className="w-15 h-10 object-cover rounded-[6px]"
        width={60}
        height={40}
        alt=""
      />
    );
    // return (
    //   <div className="relative flex">
    //     {row?.images.map((image, index) => (
    //       <Image
    //         key={index}
    //         className={clsx('w-15 h-10 rounded-[6px]', {
    //           'absolute ': index > 0,
    //         })}
    //         src={image}
    //         width={60}
    //         height={40}
    //         alt={row?.name}
    //         style={{
    //           left: index * 8,
    //         }}
    //       />
    //     ))}
    //   </div>
    // );
  };

  const columns: ColumnsProps[] = [
    {
      title: 'Quote',
      key: 'quote',
      styles: 'w-[28%]',
      renderNode: (row: any) => {
        return (
          <div className="flex items-center md:flex-row flex-col">
            <CustomNextImage
              src={row?.productDetails?.product_image || ''}
              className="w-15 h-10 object-cover rounded-[6px]"
              width={60}
              height={40}
              alt=""
            />
            <div className="md:pl-8 pt-2 md:pt-0">
              <p className="text-base text-gray-1000 font-medium pb-1 text-center md:text-start">
                {row?.productDetails?.product_name}
              </p>
              {(row?.productDetails?.device_type || row?.device_type) && (
                <p className="flex items-center text-s text-gray-600 w-[140px] md:w-auto">
                  <span className="capitalize text-primary-500 font-medium text-xs">
                    {row?.productDetails?.device_type || row?.device_type}
                  </span>
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    // Replace 'manufacturer' column renderNode with this:
    {
      title: isVendor ? 'Customer' : 'Manufacturer',
      key: 'manufacturer',
      styles: 'w-[10%] pl-24', // Adjust padding as necessary
      renderNode: (row: any) => {
        if (isVendor) {
          // Assuming customer details are within the row object, modify as per your actual data structure
          return (
            <div className="flex items-center">
              <p className="text-base text-gray-1000">{`${row?.first_name || ''} ${row?.last_name || ''}`.trim()}</p>
            </div>
          );
        } else {
          // This is the existing code for manufacturer, keep as is
          return (
            <div className="flex items-center">
              <CustomNextImage
                src={row?.productDetails?.vendorlogo || DEFAULT_VENDOR_LOGO || ''}
                width={20}
                height={20}
                alt={''}
              />
              <p className="text-base text-gray-1000 pl-2.5">{row?.productDetails?.vendorname}</p>
              {row?.productDetails?.verified && (
                <Tooltip text={VERIFIED_VENDOR_MESSAGE}>
                  <img className="max-w-10 max-h-10" src="/assets/images/askiot_verified_small.png" />
                </Tooltip>
              )}
            </div>
          );
        }
      },
    },
    
    {
      title: 'Amount',
      key: 'amount',
      styles: 'w-[20%] !text-center',
      renderNode: (row: any) =>
        row?.offered_price ? `$${row?.offered_price?.toLocaleString()}` : '-',
    },
    {
      title: 'Status',
      key: 'total',
      styles: 'w-[15%]',
      renderNode: (row: any) => {
        const quoteStatus = getQuoteStatus(row?.status);
        return (
          <div className="flex items-center justify-between">
            <Badge
              label={quoteStatus}
              color={colorByStatus[row?.status as QUOTE_STATUS] as ColorType}
            />
          </div>
        );
      },
    },
  ];

  if (!quotes.length)
    return (
      <div className="h-50 w-full flex items-center justify-center">
        <p className="text-gray-600">Empty</p>
      </div>
    );

  return (
    <div className="mt-5 relative">
      {isQuotesLoading ? (
        <div className="absolute mt-[35%] left-[50%]  -translate-x-2/4">
          <Spinner />
        </div>
      ) : (
        <Table
          columns={columns}
          rows={status ? filteredQuotes : quotes}
          onClickRow={handleClickRow}
          pagination={false}
        />
      )}
    </div>
  );
};

export default QuotesTable;
