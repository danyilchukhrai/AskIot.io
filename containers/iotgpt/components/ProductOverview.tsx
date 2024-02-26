import { CustomImg, CustomNextImage } from '@/components/CustomImage';
import Tooltip from '@/components/Tooltip';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { VERIFIED_VENDOR_MESSAGE } from '@/constants/vendors';
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
        <p className="text-primary-500 text-s pb-2">Product description</p>
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
                <tr key={`SPECS-${index}`}>
                  <td
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
            src={product?.vendorlogo || DEFAULT_VENDOR_LOGO || ''}
            alt={product?.vendorName || ''}
            width={40}
            height={40}
          />
          <p className="text-gray-1000 text-base font-medium pl-2.5">
            {product?.vendorName || product?.vendorname || ''}
          </p>
          {product?.verified && (
            <Tooltip textClassName="!left-[calc(50%+32px)]" text={VERIFIED_VENDOR_MESSAGE}>
              <img className="max-w-10 max-h-10" src="/assets/images/askiot_verified_small.png" />
            </Tooltip>
          )}
        </div>
      </div>
      {!!product?.product_details?.length && (
        <>
          <p className="text-primary-500 text-s mt-8 mb-3">Product details</p>
          <table className="mb-2">
            {product?.product_details?.map((productDetails: any, index: any) => (
              <tr key={`PD-${index}`}>
                <td
                  className={clsx('w-[35%] tex-gray-1000 text-base px-3 py-2.5 shadow-s', {
                    'rounded-tl-lg': !index,
                  })}
                >
                  <p>{productDetails?.name}</p>
                </td>
                <td className={clsx('tex-gray-1000 text-base px-3 py-2.5 shadow-s')}>
                  {productDetails?.description}
                </td>
              </tr>
            ))}
          </table>
        </>
      )}
      {!!product?.usecase?.length && (
        <>
          <p className="text-primary-500 text-s mt-8 mb-3">Use cases</p>
          <ol className="mb-2 pl-3 list-disc">
            {product?.usecase?.map((item: string, index: any) => (
              <li key={`PD-${index}`} className="tex-gray-1000 text-base  py-1">
                {item}
              </li>
            ))}
          </ol>
        </>
      )}
      {product?.industries && (
        <div className="industries pt-8">
          <p className="text-primary-500 text-s pb-3">Industries</p>
          <p className="text-gray-1000 text-base word-break">
            {typeof product.industries === 'string'
              ? product.industries?.split(',').join(', ')
              : product.industries?.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
