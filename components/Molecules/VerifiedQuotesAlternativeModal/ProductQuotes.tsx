import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { CustomImg } from '@/components/CustomImage';
import Tooltip from '@/components/Tooltip';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { VERIFIED_VENDOR_MESSAGE } from '@/constants/vendors';
import { FC } from 'react';

interface IProductQuotesProps {
  products?: any;
  onRequestQuote: (product: any) => void;
  isLoading: boolean;
  requestedIds: number[];
}

const ProductQuotes: FC<IProductQuotesProps> = ({
  products = [],
  onRequestQuote,
  isLoading,
  requestedIds = [],
}) => {
  return (
    <div>
      <div className="header">
        <p className="text-gray-700 text-base text-center">
          Would you also like to receive comparison quotes from some of our verified vendors?
        </p>
      </div>
      <div className="products pt-6.5">
        <div className="list-header text-base text-primary-500 items-center gap-3.5 md:flex hidden">
          <p className="w-[30%]">Product</p>
          <p className="w-[45%]">Features</p>
        </div>
        <div className="w-full h-[0.3px] bg-gray-1600 my-2" />
        <div className="list-body flex flex-col gap-4.5">
          {products?.map((it: any, index: number) => {
            const requested = requestedIds.includes(it?.product_id);
            return (
              <div
                key={it.product_id}
                className="flex md:flex-row flex-col md:items-center gap-3.5"
              >
                <div className="flex items-center gap-4 md:w-[30%]">
                  <CustomImg
                    className="max-w-[50px] max-h-[50px] rounded-[6px]"
                    src={it?.product_image}
                    alt={it?.product_name}
                  />
                  <p className="text-gray-1000 font-medium word-break text-base">
                    {it?.product_name}
                  </p>
                </div>
                <div className="md:w-[45%] text-black text-base md:line-clamp-2">
                  {it?.product_description}
                </div>
                <div className="flex-1 my-2 md:flex md:justify-center">
                  <div className="flex items-center gap-1">
                    <CustomImg
                      src={it?.vendorlogo || DEFAULT_VENDOR_LOGO}
                      className="max-w-[40px] max-h-[40px] object-cover"
                    />
                    {it?.verified && (
                      <Tooltip text={VERIFIED_VENDOR_MESSAGE}>
                        <img
                          className="max-w-10 max-h-10"
                          src="/assets/images/askiot_verified_small.png"
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
                <div className="md:w-[13%] md:flex md:justify-end">
                  {requested ? (
                    <Badge label="Requested" color="green" size="small" />
                  ) : (
                    <Button
                      className="!px-2 !text-gray"
                      onClick={() => onRequestQuote(it)}
                      isLoading={isLoading}
                      loadingIconProps={{
                        width: 12,
                        height: 12,
                      }}
                    >
                      Request Quote
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductQuotes;
