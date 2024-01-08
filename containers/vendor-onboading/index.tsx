import LoadingIndicator from '@/components/LoadingIndicator';
import { IModalElement } from '@/components/Modal';
import Stepper from '@/components/Steppter';
import SwitchToProviderOTPVerification from '@/components/SwitchToProviderOPTVerfication';
import { API_ENDPOINT } from '@/configs/appConfig';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { handleShowError } from '@/helpers/common';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { parseAskIoTPhoneNumber } from '@/helpers/phone-number';
import { getValue } from '@/helpers/storage';
import { useClaimVendor, useCreateVendor } from '@/modules/vendors/hooks';
import { vendorOnboardingSchema } from '@/validations/vendors';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import BusinessInformation from './components/BusinessInformation';
import ClaimBusiness from './components/ClaimBusiness';
import ConfirmDetails from './components/ConfimDetails';
import SubscriptionStep from './components/SubscriptionStep';
import ThankYou from './components/ThankYou';

interface IVendorOnboardingProps {
  paymentSuccess?: boolean;
  paymentCancel?: boolean;
}

export enum VENDOR_ONBOARDING_STEPS {
  BUSINESS_INFORMATION,
  CONFIRM_DETAILS,
  CLAIM_BUSINESS,
  SUBSCRIPTION,
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
  {
    label: 'Subscription',
    step: VENDOR_ONBOARDING_STEPS.SUBSCRIPTION,
  },
];

const VendorOnboarding: FC<IVendorOnboardingProps> = ({
  paymentSuccess = false,
  paymentCancel = false,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [active, setActive] = useState(VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const sessionId = params.get('session_id');

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
    vendorOnboardingForm.setValue('step', active);
  }, [active]); //eslint-disable-line

  useEffect(() => {
    if (paymentSuccess || paymentCancel) {
      setActive(VENDOR_ONBOARDING_STEPS.SUBSCRIPTION);
      handleFillDataFromStorage();
    }
  }, [paymentSuccess, paymentCancel]);

  useEffect(() => {
    setIsPaymentSuccess(Boolean(paymentSuccess && sessionId));
  }, [paymentSuccess, sessionId]);

  const vendorId = vendorOnboardingForm.watch('vendorid');
  const { mutate: claimVendor, isPending: isClaiming } = useClaimVendor();
  const { mutate: createVendor, isPending: isCreating } = useCreateVendor();
  const isLoading = isCreating || isClaiming;
  const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const quoteVerificationRef = useRef<IModalElement>(null);

  const handleClaimVendor = (data: any) => {
    const {
      phone_number,
      email_associated_with_business,
      claim_reason,
      first_name,
      last_name,
      isSentEmail,
      emails,
    } = data;
    const { phoneCode, nationalNumber } = parseAskIoTPhoneNumber(phone_number);
    const claimDetails: any = {
      phone_number: nationalNumber,
      email_associated_with_business,
      claim_reason,
      first_name,
      last_name,
      country_code: phoneCode,
    };

    if (!isSentEmail) {
      claimDetails.emails = emails?.map((it: any) => it?.value);
    }

    claimVendor(
      {
        id: String(vendorId),
        data: {
          claimDetails,
        },
      },
      {
        onSuccess: handleClaimOrCreateVendorSuccess,
        onError: handleShowError,
      },
    );
  };

  const handleCreateVendor = (data: any) => {
    const { phoneCode, nationalNumber } = parseAskIoTPhoneNumber(data?.phone_number);
    const { emails, isSentEmail, step, ...rest } = data;
    const body = {
      ...rest,
      phone_number: nationalNumber,
      country_code: phoneCode,
    };
    if (!isSentEmail) {
      body.emails = emails?.map((it: { value: string }) => it?.value);
    }

    createVendor(body, {
      onSuccess: handleClaimOrCreateVendorSuccess,
      onError: handleShowError,
    });
  };

  const handleClaimOrCreateVendorSuccess = () => {
    handleRemoveOnboardingInfoFromStorage();
    setIsCompleted(true);
  };

  const handleSendOPT = async (data: any) => {
    try {
      setIsSendOTPLoading(true);

      const sendOTPReq = await askIOTApiFetch(`${API_ENDPOINT}/private/users/send-otp`, {
        phoneNumber: data?.phone_number,
      });
      //update-user
      askIOTApiFetch(
        `${API_ENDPOINT}/private/users`,
        {
          firstName: data?.first_name,
          lastName: data?.last_name,
          phoneNumber: data?.phone_number,
        },
        'PUT',
      );
      setIsSendOTPLoading(false);
      if (sendOTPReq?.message === 'OTP sent successfully') {
        quoteVerificationHandler();
      } else {
        toast.error('Unknown please try again.');
      }
    } catch (error: any) {
      setIsSendOTPLoading(false);
      const errorData = await error?.json();
      toast.error(errorData?.error);
    }
  };

  const quoteVerificationHandler = () => {
    quoteVerificationRef?.current?.open();
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSendOTPLoading(true);
      const verificationStatus = await askIOTApiFetch(
        `${API_ENDPOINT}/private/users/verification-status`,
      );
      setIsSendOTPLoading(false);
      if (verificationStatus?.isVerified) {
        handleClaimOrCreateVendor(data);
      } else {
        await handleSendOPT(data);
      }
    } catch (error: any) {
      const errorData = await error?.json();
      console.log(errorData);
      toast.error(errorData?.error || 'Failed to verify the status');
    }
  };

  const handleClaimOrCreateVendor = (data: any) => {
    const { vendorname, vendorid, ...restData } = data || {};

    if (vendorid) {
      handleClaimVendor(restData);
    } else {
      handleCreateVendor(data);
    }
  };

  const handleVerifyOTPSuccess = () => {
    onSubmit(vendorOnboardingForm.getValues());
    closeOTPModal();
  };

  const handleRemoveOnboardingInfoFromStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.VENDOR_ONBOARDING_DATA);
  };

  const closeOTPModal = () => {
    quoteVerificationRef?.current?.close();
  };

  const handleFillDataFromStorage = () => {
    const vendorOnboardingDataFromStorage: any = JSON.parse(
      getValue(LOCAL_STORAGE_KEYS.VENDOR_ONBOARDING_DATA) || '{}',
    );

    vendorOnboardingForm.reset(vendorOnboardingDataFromStorage);
  };

  const handleNextStep = () => {
    setActive((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setActive((prev) => prev - 1);
  };

  const renderSteps = () => {
    switch (active) {
      case VENDOR_ONBOARDING_STEPS.BUSINESS_INFORMATION:
        return <BusinessInformation onNextStep={handleNextStep} />;
      case VENDOR_ONBOARDING_STEPS.CONFIRM_DETAILS:
        return <ConfirmDetails onNextStep={handleNextStep} onBackStep={handleBackStep} />;
      case VENDOR_ONBOARDING_STEPS.CLAIM_BUSINESS:
        return (
          <ClaimBusiness
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
            onSubmit={onSubmit}
          />
        );
      case VENDOR_ONBOARDING_STEPS.SUBSCRIPTION:
        return (
          <SubscriptionStep
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
            onSubmit={onSubmit}
            success={isPaymentSuccess}
          />
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
              {isCompleted ? <ThankYou /> : renderSteps()}
            </>
          )}
        </section>
        <SwitchToProviderOTPVerification
          ref={quoteVerificationRef}
          onSuccess={handleVerifyOTPSuccess}
        />
      </FormProvider>
      <LoadingIndicator isLoading={isLoading || isSendOTPLoading} />
    </>
  );
};

export default VendorOnboarding;
