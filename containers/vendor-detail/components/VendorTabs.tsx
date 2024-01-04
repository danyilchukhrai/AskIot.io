import Tabs from '@/components/Tabs';
import { VENDORS_TAB_KEY } from '@/constants/vendors';
import { useGetProductsByVendor } from '@/modules/vendors/hooks';
import { IVendorDetails } from '@/modules/vendors/type';
import { FC } from 'react';
import { IVendorDetailProps } from '..';
import FeaturesProducts from './FeaturesProducts';
import VendorOverview from './VendorOverview';

interface IVendorTabsProps extends IVendorDetailProps {
  vendor?: IVendorDetails;
}

const VendorTabs: FC<IVendorTabsProps> = (props) => {
  const { vendor } = props;
  const { data } = useGetProductsByVendor(vendor?.vendorid || '');
  const { products = [], devices = [] } = data || {};

  const tabs = [
    {
      key: VENDORS_TAB_KEY.Overview,
      label: 'Overview',
      component: <VendorOverview {...props} />,
    },
    {
      key: VENDORS_TAB_KEY.Products,
      label: 'Products',
      component: <FeaturesProducts products={[...products, ...devices]} />,
    },
  ];

  return (
    <div className="mt-5">
      <Tabs tabs={tabs} disabledSpaceBetween />
    </div>
  );
};

export default VendorTabs;
