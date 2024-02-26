import { API_ENDPOINT } from '@/configs/appConfig';
import { VENDOR_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { IVendorDetails } from '@/modules/vendors/type';
import { get } from 'lodash';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const VendorDetail = dynamic(() => import('@/containers/vendor-detail'));

async function getVendorDetails(slug: string): Promise<IVendorDetails> {
  const res = await fetch(`${API_ENDPOINT}${VENDOR_API.getVendorDetailsBySlug.api(slug)}`, {
    cache: 'no-store',
    method: REQUEST_METHOD.GET,
  });
  const vendorDetails = await res.json();
  return vendorDetails;
}

export default async function VendorsPage(props: any) {
  const slug = props?.params?.slug;
  const vendorDetails = await getVendorDetails(slug);

  if (get(vendorDetails, 'error')) {
    return notFound();
  }

  return <VendorDetail vendorDetails={vendorDetails} />;
}
