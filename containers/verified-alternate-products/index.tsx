import BackButton from '@/components/BackButton';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useGetVerifiedAlternateProducts } from '@/modules/product/hooks';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import ProductList from '../iotgpt/components/ProductList';

interface IVerifiedAlternateProductsProps {}

const VerifiedAlternateProducts: FC<IVerifiedAlternateProductsProps> = (props) => {
  const prams = useParams();
  const { productId } = prams || {};
  const { data: verifiedAlternateProducts, isLoading } = useGetVerifiedAlternateProducts(
    Number(productId),
  );
  const products = verifiedAlternateProducts?.alternate_products_verified || [];

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleClickProduct = (product: any) => {
    router.push(`/app/${product?.type}/${product?.slug}`);
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <section className="verified-alternate-products-section md:p-8 p-4">
      <BackButton />
      <p className="text-l text-gray-700 text-center flex-1 px-2 mt-4">
        Would you also like to receive comparison quotes from some of our verified vendors?
      </p>
      <div className="products mt-6">
        <ProductList
          products={products}
          hideActionButtons
          onClickProduct={handleClickProduct}
          requestQuote
        />
      </div>
    </section>
  );
};

export default VerifiedAlternateProducts;
