import { IVendorDetails } from '@/modules/vendors/type';
import { FC } from 'react';

interface IVendorOverviewProps {
  vendorProfile?: IVendorDetails;
}

const VendorOverview: FC<IVendorOverviewProps> = ({ vendorProfile }) => {
  return (
    <div className="rounded-xl shadow p-6 mt-5">
      <div className="mb-6">
        <p className="text-primary-500 text-base font-medium md:mb-6 mb-3">Details</p>
        <div className="flex md:flex-row flex-col">
          <p className="text-gray-1000 text-base font-semibold w-[15%] mr-2 md:mb-0 mb-1">
            Overview
          </p>
          <p className="flex-1 text-base text-gray-1000">{vendorProfile?.snippet}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {vendorProfile?.industries && (
          <div className="text-gray-1000 text-base flex items-center">
            <p className=" font-semibold w-[30%] mr-2">Industry</p>
            <p className="flex-1 text-end md:text-start">
              {Array.isArray(vendorProfile?.industries)
                ? vendorProfile?.industries.join(', ')
                : vendorProfile?.industries}
            </p>
          </div>
        )}
        <div className="text-gray-1000 text-base flex items-center">
          <p className=" font-semibold w-[30%] mr-2">Founded</p>
          <p className="flex-1 text-end md:text-start">
            {vendorProfile?.orgDetails[0]?.organization_founded_year}
          </p>
        </div>
        {vendorProfile?.specialities && (
          <div className="text-gray-1000 text-base flex items-center">
            <p className="font-semibold w-[30%] mr-2">Specialties</p>
            <p className="flex-1 text-end md:text-start">
              {Array.isArray(vendorProfile?.specialities)
                ? vendorProfile?.specialities?.join(', ')
                : vendorProfile?.specialities}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOverview;
