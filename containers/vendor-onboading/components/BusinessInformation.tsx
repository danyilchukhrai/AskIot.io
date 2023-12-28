import Button from '@/components/Button';
import { CustomNextImage } from '@/components/CustomImage';
import FormInput from '@/components/FormComponents/FormInput';
import Spinner from '@/components/Spinner';
import { DEFAULT_PAGINATION, DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { useSearchVendors } from '@/modules/vendors/hooks';
import { ISearchVendorItem } from '@/modules/vendors/type';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IBusinessInformationProps {
  onNextStep: () => void;
}

const BusinessInformation: FC<IBusinessInformationProps> = ({ onNextStep }) => {
  const form = useFormContext();
  const [selectedVendor, setSelectedVendor] = useState<number>();
  const { data: vendors, setParams, isLoading, params } = useSearchVendors();
  const { data: vendorsData, currentPage = 0, totalPages = 0 } = vendors || {};

  const handleSearch = useCallback(
    debounce((value) => {
      setParams({
        search: value,
      });
    }, 300),
    [],
  );

  const handleSelectVendor = (vendor: ISearchVendorItem) => {
    setSelectedVendor(vendor.vendorid);
    form.setValue('vendorname', vendor.vendorname);
    form.setValue('vendorid', vendor.vendorid);
  };

  const handleLoadMoreData = () => {
    setParams({
      limit: (params?.limit || 0) + DEFAULT_PAGINATION.limit,
    });
  };

  return (
    <div className="md:mt-[78px] mt-15 flex flex-col items-center">
      <div className="max-w-[393px] flex flex-col items-center mx-auto">
        <p className="text-gray-1000 text-l text-center">
          {/* Render this message for first init and search field is not dirty */}
          {vendors?.data?.length || typeof params?.search !== 'string' || isLoading ? (
            'Great,lets see if askIoT already has your information'
          ) : (
            <span className="text-primary-500">
              Looks like we missed you, let’s go ahead and add your business to askIoT
            </span>
          )}
        </p>
        <FormInput
          name="vendorname"
          className="md:w-[343px] w-full my-5"
          placeholder="Start typing the name of your business"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
        />
      </div>

      <InfiniteScroll
        dataLength={vendorsData?.length || 0}
        next={() => {
          handleLoadMoreData();
        }}
        hasMore={totalPages > currentPage}
        loader={<p className="text-base">...Loading</p>}
        height={350}
        className="md:w-[343px] w-full flex flex-col items-center gap-y-4 mb-5"
      >
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!isLoading &&
          (vendorsData || []).map((it) => (
            <div
              key={it.vendorid}
              onClick={() => handleSelectVendor(it)}
              className={clsx(
                'hover:cursor-pointer p-3 rounded-xl border border-gray-300 flex items-center w-full',
                {
                  'bg-primary-500': selectedVendor === it.vendorid,
                },
              )}
            >
              <CustomNextImage
                src={it?.logo || DEFAULT_VENDOR_LOGO || ''}
                width={40}
                height={40}
                alt={it.vendorname}
              />
              <div className="ml-4 flex-1">
                <p
                  className={clsx('text-base text-gray-1000 font-medium', {
                    'text-white': selectedVendor === it.vendorid,
                  })}
                >
                  {it.vendorname}
                </p>
                <p
                  className={clsx('text-base text-gray-700 line-clamp-1 break-all', {
                    'text-white': selectedVendor === it.vendorid,
                  })}
                >
                  {it.vendorurl}
                </p>
              </div>
            </div>
          ))}
      </InfiniteScroll>
      <Button onClick={form.handleSubmit(onNextStep)}>Next</Button>
    </div>
  );
};

export default BusinessInformation;
