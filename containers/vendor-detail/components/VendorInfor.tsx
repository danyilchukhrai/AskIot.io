import { CustomImg } from '@/components/CustomImage';
import { DEFAULT_VENDOR_LOGO } from '@/constants/common';
import { IVendorDetails } from '@/modules/vendors/type';
import { FC } from 'react';
import InfoItem from './InfoItem';
import MemberItem from './MemberItem';

interface IVendorInfoProps {
  vendor?: IVendorDetails;
}

const VendorInfo: FC<IVendorInfoProps> = ({ vendor }) => {
  return (
    <div className="vendor-info rounded-xl shadow flex flex-col gap-[20px]">
      <div className="cover-avatar relative h-[192px]">
        <div className="w-full h-[150px] rounded-t-lg overflow-hidden [&>.image-bg]:!static bg-gradient-background"></div>
        <div className=" border-4 border-white overflow-hidden absolute bottom-0 left-[20px] rounded-lg">
          <CustomImg
            className="w-auto h-[84px] object-cover"
            src={vendor?.vendorlogo || DEFAULT_VENDOR_LOGO}
            alt=""
          />
        </div>
      </div>

      <div className="info px-6">
        <div className="flex items-start">
          <p className="text-gray-1000 text-3xl font-medium mr-4">{vendor?.vendorname}</p>
        </div>
        <div className="text-gray-600 text-s mt-2 flex flex-col md:flex-row gap-[12px]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-[12px] flex-wrap">
            <InfoItem
              iconSrc="/assets/icons/phone-icon.svg"
              label={vendor?.orgDetails[0].organization_phone}
            />
            <div className="hidden md:block w-[1px] h-3 bg-gray-200 mx-3" />
            <InfoItem
              iconSrc="/assets/icons/globe-icon.svg"
              label={
                <a className="break-all" href={vendor?.vendorurl || ''} target="_blank">
                  {vendor?.vendorurl || ''}
                </a>
              }
            />
          </div>
        </div>
        <div className="members mt-5.5 md:mb-[4px]">
          <ul className="flex flex-col md:flex-row gap-[8px] md:gap-[27px] items-start flex-wrap">
            {vendor?.personDetails.map((member, index) => (
              <li key={index}>
                <MemberItem
                  avatarSrc={member?.photo_url || ''}
                  name={`${member.first_name || ''} ${member.last_name || ''}`}
                  position={member.person_seniority}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="vendor-statistical border-t border-gray-100 flex justify-between flex-wrap">
        {/* <div className="flex items-center md:w-auto w-full">
          <StatisticalItem isLastEl label="Use Case" value="Fleet Management" />
        </div> */}
      </div>
    </div>
  );
};

export default VendorInfo;
