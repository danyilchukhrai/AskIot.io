import Stepper from '@/components/Steppter';
import { FC, useEffect, useRef, useState } from 'react';
import BusinessInformation from './components/BusinessInformation';
import ConfirmDetails from './components/ConfimDetails';
import ClaimBusiness from './components/ClaimBusiness';
import { FormProvider, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { vendorOnboardingSchema } from '@/validations/vendors';
import { IModalElement } from '@/components/Modal';
import SwitchToProviderOTPVerification from '@/components/SwitchToProviderOPTVerfication';

interface IVendorOnboardingProps {}

export enum VENDOR_ONBOARDING_STEPS {
  BUSINESS_INFORMATION,
  CONFIRM_DETAILS,
  CLAIM_BUSINESS,
}

const steps = [
  {
    label: 'Business Information',
    step: VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION,
  },
  {
    label: 'Confirm Details',
    step: VENDOR_ONBOARDING_STEPS.CONFIRM_DETAILS,
  },
  {
    label: 'Claim Business',
    step: VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS,
  },
];

const VendorOnboarding: FC<IVendorOnboardingProps> = (props) => {
  const [active, setActive] = useState(VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION);
  const quoteVerificationRef = useRef<IModalElement>(null);
  const vendorOnboardingForm = useForm({
    defaultValues: {
      vendorname: '',
      vendorurl: '',
      notes: '',
      email_associated_with_business: '',
      phone_number: '',
      claim_reason: '',
      vendorid: undefined,
      step: VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION,
      first_name: '',
      last_name: '',
    },
    resolver: yupResolver(vendorOnboardingSchema),
  });

  const handleNextStep = () => {
    setActive((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setActive((prev) => prev - 1);
  };

  useEffect(() => {
    vendorOnboardingForm.setValue('step', active);
  }, [active]); //eslint-disable-line

  const closeOTPModal = () => {
    quoteVerificationRef?.current?.close();
  };

  const renderSteps = () => {
    switch (active) {
      case VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION:
        return <BusinessInformation onNextStep={handleNextStep} />;
      case VENDOR_ONBOARDING_STEPS.CONFIRM_DETAILS:
        return <ConfirmDetails onNextStep={handleNextStep} onBackStep={handleBackStep} />;
      case VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS:
        return (
          <ClaimBusiness quoteVerificationHandler={() => quoteVerificationRef?.current?.open()} />
        );
    }
  };

  return (
    <>
      <FormProvider {...vendorOnboardingForm}>
        <section
          className={clsx('vendor-onboarding-section relative min-h-screen p-8', {
            'flex justify-center items-center':
              active === VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION,
          })}
        >
          {active === VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION ? (
            <div className="md:w-[630px] w-full md:py-12 md:px-9 py-8 px-6 rounded-xl border border-gray-500">
              <Stepper active={active} steps={steps} />
              {renderSteps()}
            </div>
          ) : (
            <>
              <div className="md:w-[600px] w-full mx-auto">
                <Stepper active={active} steps={steps} />
              </div>
              {renderSteps()}
            </>
          )}
        </section>
        <SwitchToProviderOTPVerification ref={quoteVerificationRef} onSuccess={closeOTPModal} />
      </FormProvider>
    </>
  );
};

export default VendorOnboarding;
