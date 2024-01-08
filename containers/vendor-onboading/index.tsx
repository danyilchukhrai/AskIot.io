import Stepper from '@/components/Steppter';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { getValue } from '@/helpers/storage';
import { vendorOnboardingSchema } from '@/validations/vendors';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import BusinessInformation from './components/BusinessInformation';
import ClaimBusiness from './components/ClaimBusiness';
import ConfirmDetails from './components/ConfimDetails';

interface IVendorOnboardingProps {
  paymentSuccess?: boolean;
  paymentCancel?: boolean;
}

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

const VendorOnboarding: FC<IVendorOnboardingProps> = ({
  paymentSuccess = false,
  paymentCancel = false,
}) => {
  const router = useRouter();
  const [active, setActive] = useState(VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION);
  const vendorOnboardingForm = useForm({
    defaultValues: {
      vendorname: '',
      vendorurl: '',
      notes: '',
      email_associated_with_business: undefined,
      phone_number: '',
      claim_reason: '',
      vendorid: undefined,
      step: VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION,
      first_name: '',
      last_name: '',
      emails: [
        {
          value: '',
        },
      ],
    },
    resolver: yupResolver(vendorOnboardingSchema),
  });

  useEffect(() => {
    if (paymentSuccess || paymentCancel) {
      handleFillFormFromStorage();
    }
  }, [paymentSuccess, paymentCancel]);

  const handleFillFormFromStorage = () => {
    const vendorOnboardingDataFromStorage: any = JSON.parse(
      getValue(LOCAL_STORAGE_KEYS.VENDOR_ONBOARDING_DATA) || '{}',
    );

    if (isEmpty(vendorOnboardingDataFromStorage)) {
      router.push(RESTRICTED_APP_ROUTES.VENDOR_ONBOARDING);
    } else {
      setActive(VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS);
      vendorOnboardingForm.reset(vendorOnboardingDataFromStorage);
    }
  };

  const handleNextStep = () => {
    setActive((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setActive((prev) => prev - 1);
  };

  useEffect(() => {
    vendorOnboardingForm.setValue('step', active);
  }, [active]); //eslint-disable-line

  const renderSteps = () => {
    switch (active) {
      case VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION:
        return <BusinessInformation onNextStep={handleNextStep} />;
      case VENDOR_ONBOARDING_STEPS.CONFIRM_DETAILS:
        return <ConfirmDetails onNextStep={handleNextStep} onBackStep={handleBackStep} />;
      case VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS:
        return <ClaimBusiness paymentSuccess={paymentSuccess} paymentCancel={paymentCancel} />;
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
      </FormProvider>
    </>
  );
};

export default VendorOnboarding;
