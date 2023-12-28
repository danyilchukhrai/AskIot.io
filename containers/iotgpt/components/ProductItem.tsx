import Button from '@/components/Button';
import { CustomImg } from '@/components/CustomImage';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { IRecommendationInfo } from '@/modules/iot-gpt/type';
import { useSavedProductsContext } from '@/providers/SavedProductsProvider';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IProductItemProps {
  product?: IRecommendationInfo;
  hiddenDescription?: boolean;
  onOpenSaveForm?: (item?: IRecommendationInfo, isSaved?: boolean) => void;
  onOpenShareForm?: () => void;
  onClickProduct?: (product?: IRecommendationInfo) => void;
  hideActionButtons?: boolean;
  className?: string;
}

const ProductItem: FC<IProductItemProps> = ({
  product,
  hiddenDescription,
  onOpenSaveForm,
  onOpenShareForm,
  onClickProduct,
  hideActionButtons = false,
  className = '',
}) => {
  const router = useRouter();
  const { isSavedProduct } = useSavedProductsContext();
  const saved = isSavedProduct?.(product?.id || product?.product_id);

  const handleClickProduct = () => {
    onClickProduct && onClickProduct(product);
  };
  return (
    <div
      className={clsx(
        'flex md:items-center md:flex-row flex-col md:gap-6 border-b border-gray-100 last:border-b-0 md:px-6 md:py-6 px-6 py-5 cursor-pointer hover:bg-gray group',
        className,
      )}
      onClick={handleClickProduct}
    >
      <div
        className={clsx('flex items-center w-full ', hideActionButtons ? 'md:w-1/3' : 'md:w-[23%]')}
      >
        <CustomImg
          className="max-w-15 h-10 rounded-[6px]"
          src={product?.img || product?.product_image}
          alt={product?.name || ''}
        />
        <div className="pl-4">
          <p className="text-gray-1000 text-base font-medium">
            {product?.name || product?.product_name}
          </p>
        </div>
      </div>
      {!hiddenDescription && (
        <div className="w-full md:w-[49%] md:px-3 mt-2.5 md:mt-0">
          <p className="text-primary-500 text-xs font-medium pb-1">{product?.recommendationType}</p>
          <p className="text-gray-1000 text-xs md:line-clamp-2 line-clamp-3">
            {product?.description || product?.product_description}
          </p>
        </div>
      )}
      <div className="manufacturer mt-4 md:mt-0 flex-1 md:flex md:flex-col md:items-center">
        <div
          className="flex items-center md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            product?.vendorid &&
              router.push(`${RESTRICTED_APP_ROUTES.VENDORS}/${product?.vendorid}`);
          }}
        >
          <CustomImg
            className="max-w-[80px] max-h-12.5 object-cover"
            src={product?.logo || DEFAULT_VENDOR_LOGO}
            alt="manufacturer"
          />
        </div>
        <div
          className="hidden md:block hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            product?.vendorid &&
              router.push(`${RESTRICTED_APP_ROUTES.VENDORS}/${product?.vendorid}`);
          }}
        >
          <CustomImg
            className="max-w-[80px] max-h-12.5 object-cover"
            src={product?.vendorlogo || product?.logo || DEFAULT_VENDOR_LOGO}
            alt="manufacturer"
          />
          <p className="text-gray-1000 text-base ml-2.5 md:hidden">{product?.vendorname}</p>
        </div>
        {!hideActionButtons && (
          <div className="button-groups flex items-center md:justify-center md:gap-3 gap-2.5 mt-2.5">
            <Button
              className="flex items-center gap-2"
              variant="inline"
              disabledPadding
              onClick={(e) => {
                e.stopPropagation();
                onOpenShareForm && onOpenShareForm();
              }}
            >
              <img className="w-4 h-4 md:w-auto md:h-auto" src="/assets/icons/share-icon.svg" />
              <span className="text-xs text-gray-700 md:inline hidden">Share</span>
            </Button>

            <Button
              className="flex items-center gap-2"
              variant="inline"
              disabledPadding
              onClick={(e) => {
                e.stopPropagation();
                onOpenSaveForm && onOpenSaveForm(product, saved);
              }}
            >
              <img
                className="w-4 h-4 md:w-auto md:h-auto"
                src={saved ? '/assets/icons/red-heart-icon.svg' : '/assets/icons/heart-icon.svg'}
              />
              <span className="text-xs text-gray-700 md:inline hidden">
                {saved ? 'Saved' : 'Save'}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
