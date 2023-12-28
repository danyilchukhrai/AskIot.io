import { CustomImg, CustomNextImage } from '@/components/CustomImage';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { generateSpecificationIconPath } from '@/helpers/common';
import { ISpecification } from '@/modules/iot-gpt/type';
import clsx from 'clsx';
import { FC } from 'react';

interface IProductOverviewProps {
  product?: any;
  specifications?: ISpecification[];
}

const ProductOverview: FC<IProductOverviewProps> = ({ product, specifications = [] }) => {
  return (
    <div className="product-overview pt-10.5">
      <div className="product">
        <p className="text-primary-500 text-s pb-2">Product</p>
        <p className="text-gray-1000 text-l">
          {product?.device_serp_ai?.introduction ||
            product?.product_description ||
            product?.introduction}
        </p>
      </div>
      {!!specifications.length && (
        <div className="technical-specification pt-8">
          <p className="text-primary-500 text-s pb-2">Technical Specification</p>
          <table className="table-fixed w-full rounded-lg shadow-s">
            <tbody>
              {specifications.map((it: any, index: number) => (
                <tr>
                  <td
                    key={index}
                    className={clsx('w-[35%] tex-gray-1000 text-base px-3 py-2.5 shadow-s', {
                      'rounded-tl-lg': !index,
                    })}
                  >
                    <div className="flex items-center">
                      <CustomImg
                        className="w-5 h-5 mr-2"
                        src={generateSpecificationIconPath(it?.icon)}
                      />
                      <span className="inline-block break-words first-letter:flex-1">
                        {' '}
                        {it.name || it?.split(':')?.[0]}
                      </span>
                    </div>
                  </td>
                  <td
                    className={clsx('tex-gray-1000 text-base px-3 py-2.5 shadow-s', {
                      'rounded-tr-lg': !index,
                    })}
                  >
                    <span className="break-words">{it.value || it?.split(':')?.[1]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="manufacturer pt-8">
        <p className="text-primary-500 text-s pb-3">Manufacturer</p>
        <div className="flex items-center pb-2">
          <CustomNextImage
            src={product?.vendorLogo || product?.vendorlogo || DEFAULT_VENDOR_LOGO || ''}
            alt={product?.vendorName || ''}
            width={20}
            height={20}
          />
          <p className="text-gray-1000 text-base font-medium pl-2.5">
            {product?.vendorName || product?.vendorname || ''}
          </p>
        </div>
      </div>
      {product?.industries && (
        <div className="industries pt-8">
          <p className="text-primary-500 text-s pb-3">Industries</p>
          <p className="text-gray-1000 text-base word-break">
            {product.industries?.split(',').join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
