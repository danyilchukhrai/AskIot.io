'use client';
import Button from '@/components/Button';
import { CustomImg, CustomNextImage } from '@/components/CustomImage';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { generateSpecificationIconPath } from '@/helpers/common';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useContext } from 'react';
import { MessageContext } from '../context';

interface IProductInfoProps {
  onClose?: () => void;
}

const ProductInfo: FC<IProductInfoProps> = ({ onClose }) => {
  const router = useRouter();
  const { productData, selectedChannel } = useContext(MessageContext);
  const product: any = productData?.productDetails?.Product?.[0] || productData?.productDetails;

  console.log('selectedChannel', selectedChannel);

  const handleLearnMore = () => {
    router.push(`${RESTRICTED_APP_ROUTES.PRODUCTS}/${productData?.type}/${product?.slug}`);
  };

  return (
    <div className="product-info-container flex flex-col h-full relative">
      {onClose && (
        <Button
          className="absolute top-8.5 right-8.5"
          variant="inline"
          disabledPadding
          onClick={onClose}
        >
          <Image src="/assets/icons/x-mark-icon.svg" alt="X mark icon" width={24} height={24} />
        </Button>
      )}
      <div className="product-info-header p-6 pb-10.5">
        {product?.img || product?.product_image ? (
          <CustomNextImage
            className="w-full h-[160px] object-cover rounded-[6px]"
            src={product?.img || product?.product_image || ''}
            alt={product?.name || ''}
            width={999}
            height={999}
          />
        ) : (
          <div className="w-full h-[160px] rounded-[6px] bg-primary-500" />
        )}

        <div className="mt-5">
          <div>
            <h4 className="text-3xl text-gray-1000 font-medium">
              {product?.name || product?.product_name}
            </h4>
          </div>
          {product?.vendorName && (
            <div className="flex items-center pt-5">
              <CustomNextImage
                src={product?.vendorLogo || DEFAULT_VENDOR_LOGO}
                alt={''}
                width={20}
                height={20}
              />
              <p className="text-gray-1000 text-base font-medium pl-2.5">{product?.vendorName}</p>
            </div>
          )}
        </div>
      </div>

      <div className="product-info-body flex-1 overflow-auto px-6">
        <div className="product-overview">
          <div className="product">
            <p className="text-primary-500 text-s pb-2">Product</p>
            <p className="text-gray-1000 text-base">
              {product?.device_serp_ai?.introduction || product?.product_description}
            </p>
          </div>
          {product?.specifications && (
            <div className="technical-specification pt-8">
              <p className="text-primary-500 text-s pb-2">Technical Specification</p>
              <table className="table-fixed w-full rounded-lg shadow-s">
                <tbody>
                  {product?.specifications?.map((it: any, index: number) => (
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
          {product?.vendorName && (
            <div className="manufacturer pt-8">
              <p className="text-primary-500 text-s pb-3">Manufacturer</p>
              <div className="flex items-center pb-2">
                <CustomNextImage
                  src={product?.vendorLogo || DEFAULT_VENDOR_LOGO}
                  alt={''}
                  width={20}
                  height={20}
                />
                <p className="text-gray-1000 text-base font-medium pl-2.5">{product?.vendorName}</p>
              </div>
            </div>
          )}
          {product?.industries && (
            <div className="industries pt-8">
              <p className="text-primary-500 text-s pb-3">Industries</p>
              <p className="text-gray-1000 text-base">{product?.industries}</p>
            </div>
          )}
        </div>
      </div>

      <div className="product-info-footer px-6 pb-6 pt-6 z-10">
        <Button variant="secondary" onClick={handleLearnMore} disabled={!product} fullWidth>
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
