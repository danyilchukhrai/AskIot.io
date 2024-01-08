'use client';

import dynamic from 'next/dynamic';

const ProductDetail = dynamic(() => import('@/containers/product-detail'));

const ProductDetailPage = () => {
  return <ProductDetail />;
};

export default ProductDetailPage;
