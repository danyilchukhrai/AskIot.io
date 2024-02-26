import { API_ENDPOINT } from '@/configs/appConfig';
import { IOT_GPT_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { IRecommendationProductDetail } from '@/modules/iot-gpt/type';
import dynamic from 'next/dynamic';

const ProductDetail = dynamic(() => import('@/containers/product-detail'));

async function getProductDetails(
  type: string,
  productSlug: string,
): Promise<IRecommendationProductDetail> {
  const res = await fetch(
    `${API_ENDPOINT}${IOT_GPT_API.getRecommendationProductDetail.api(productSlug, type)}`,
    {
      cache: 'no-store',
      method: REQUEST_METHOD.GET,
    },
  );
  const productDetails = await res.json();
  return productDetails;
}

export default async function ProductDetailPage(props: any) {
  const [type, productSlug] = props?.params?.products || [];
  const productDetails = await getProductDetails(type, productSlug);

  return <ProductDetail productDetails={productDetails} />;
}
