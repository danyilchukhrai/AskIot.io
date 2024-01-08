import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { CustomImg } from '@/components/CustomImage';
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
        <p className="text-gray-700 text-[0.75rem]">
          Would you also like to receive comparison quotes from some of our verified vendors?
        </p>
      </div>
      <div className="products pt-6.5">
        <div className="list-header text-[0.625rem] text-primary-500 flex items-center gap-3.5">
          <p className="w-[25%]">Product</p>
          <p className="w-[36%]">Features</p>
        </div>
        <div className="w-full h-[0.3px] bg-gray-1600 my-2" />
        <div className="list-body flex flex-col gap-4.5">
          {products?.map((it: any) => {
            const requested = requestedIds.includes(it?.product_id);
            return (
              <div key={it.product_id} className="flex items-center gap-3.5">
                <div className="flex items-center gap-4 w-[25%]">
                  <CustomImg
                    className="max-w-15 h-10 rounded-[6px]"
                    src={it?.product_image}
                    alt={it?.product_name}
                  />
                  <p className="text-gray-1000 text-[0.5rem] font-medium">{it?.product_name}</p>
                </div>
                <div className="w-[37%] text-black text-[0.5rem] line-clamp-2">
                  {it?.product_description}
                </div>
                <div className="w-[8%]">
                  <CustomImg src={it?.vendorlogo} className="max-w-[40px] max-h-10 object-cover" />
                </div>
                <div className="flex-1 flex justify-end">
                  {requested ? (
                    <Badge label="Requested" color="green" size="small" />
                  ) : (
                    <Button
                      className="!text-[0.5rem] !px-2 !text-gray"
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
