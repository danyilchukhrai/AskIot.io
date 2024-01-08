import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormTextarea from '@/components/FormComponents/FormTextarea';
import LoadingIndicator from '@/components/LoadingIndicator';
import Tabs from '@/components/Tabs';
import { VENDORS_TAB_KEY } from '@/constants/vendors';
import FeaturesProducts from '@/containers/vendor-detail/components/FeaturesProducts';
import InfoItem from '@/containers/vendor-detail/components/InfoItem';
import MemberItem from '@/containers/vendor-detail/components/MemberItem';
import { useGetProductsByVendor, useGetVendorDetails } from '@/modules/vendors/hooks';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import VendorOverview from './VendorOverview';

interface IConfirmDetailsProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

enum CHILD_STEP {
  REVIEW_DETAILS,
  ADD_BUSINESS_DETAILS,
}

const ConfirmDetails: FC<IConfirmDetailsProps> = ({ onBackStep, onNextStep }) => {
  const [childStep, setChildStep] = useState(CHILD_STEP.ADD_BUSINESS_DETAILS);

  const form = useFormContext();
  const vendorName = form.getValues('vendorname');
  const vendorId = form.getValues('vendorid');

  const { data: vendorProfile, isLoading: loadingVendorProfile } = useGetVendorDetails(vendorId);
  const { data: productsByVendor, isLoading: loadingProductsByVendor } =
    useGetProductsByVendor(vendorId);
  const { products = [], devices = [] } = productsByVendor || {};

  const isLoading = loadingVendorProfile || loadingProductsByVendor;

  useEffect(() => {
    if (vendorId) {
      setChildStep(CHILD_STEP.REVIEW_DETAILS);
    }
  }, [vendorId]);

  const tabs = [
    {
      key: VENDORS_TAB_KEY.Overview,
      label: 'Overview',
      component: <VendorOverview vendorProfile={vendorProfile} />,
    },
    {
      key: VENDORS_TAB_KEY.Products,
      label: 'Products',
      component: <FeaturesProducts products={[...products, ...devices]} />,
    },
  ];

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="md:mt-25 mt-20">
      {childStep === CHILD_STEP.REVIEW_DETAILS && (
        <>
          <p className="text-xl text-primary-500">
            Please review business details (You will be able to edit details after ownership
            confirmation)
          </p>
          <div className="rounded-xl border border-gray-300 px-8 py-6 mt-6">
            <div className="flex items-center gap-[13px]">
              <p className="text-gray-1000 text-3xl font-medium">{vendorProfile?.vendorname}</p>
            </div>
            <div className="text-black text-l mt-6">
              {/* <InfoItem iconSrc="/assets/icons/map-pin.svg" label={vendorProfile?.address || ''} /> */}
              <div className="flex items-center mt-4 flex-wrap gap-6">
                <InfoItem
                  iconSrc="/assets/icons/phone-icon.svg"
                  label={vendorProfile?.orgDetails[0].organization_phone}
                />
                {/* <InfoItem iconSrc="/assets/icons/email-icon.svg" label={vendorProfile?.email} /> */}
                <InfoItem
                  iconSrc="/assets/icons/globe-icon.svg"
                  label={
                    <a className="word-break" href={vendorProfile?.vendorurl} target="_blank">
                      {vendorProfile?.vendorurl}
                    </a>
                  }
                />
              </div>
            </div>
            <div className="members mt-5.5">
              <ul className="flex items-center md:gap-10 gap-5 flex-wrap">
                {vendorProfile?.personDetails.map((member, index) => (
                  <li key={index}>
                    <MemberItem
                      avatarSrc={member.photo_url || ''}
                      name={`${member.first_name || ''} ${member.last_name || ''}`}
                      position={member.person_seniority}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Tabs tabs={tabs} disabledSpaceBetween />
          </div>
        </>
      )}
      {childStep === CHILD_STEP.ADD_BUSINESS_DETAILS && (
        <>
          <p className="text-xl text-black">Please add your business details</p>
          <div className="mt-6 py-6 px-8 rounded-xl border border-gray-300">
            <p className="text-gray-1000 text-3xl font-medium mb-5">Company</p>
            <div className="flex items-center justify-between mb-5 flex-wrap">
              <p className="text-black text-l w-full md:w-auto mb-2 md:mb-0">Company Name</p>
              <FormInput
                name="vendorname"
                className="md:w-[70%] w-full"
                defaultValue={vendorName}
              />
            </div>
            <div className="flex items-center justify-between mb-5 flex-wrap">
              <p className="text-black text-l w-full md:w-auto mb-2 md:mb-0">Website</p>
              <FormInput
                name="vendorurl"
                className="md:w-[70%] w-full"
                placeholder="www.something.com"
              />
            </div>
            <div className="flex justify-between flex-wrap">
              <p className="text-black text-l w-full md:w-auto mb-2 md:mb-0">Notes</p>
              <div className="md:w-[70%] w-full">
                <FormTextarea name="notes" rows={3} placeholder="Anything you should know" />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex items-center justify-between mt-6">
        <Button className="bg-gray" variant="secondary" onClick={onBackStep}>
          Previous
        </Button>
        <Button onClick={vendorId ? onNextStep : form.handleSubmit(onNextStep)}>Next</Button>
      </div>
    </div>
  );
};

export default ConfirmDetails;
