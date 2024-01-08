import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormPhoneNumberInput from '@/components/FormComponents/FormPhoneNumberInput';
import FormRadio from '@/components/FormComponents/FormRadio';
import FormTextarea from '@/components/FormComponents/FormTextarea';
import LoadingIndicator from '@/components/LoadingIndicator';
import Modal, { IModalElement } from '@/components/Modal';
import SubscriptionPlan from '@/components/Molecules/SubscriptionPlan';
import SwitchToProviderOTPVerification from '@/components/SwitchToProviderOPTVerfication';
import { API_ENDPOINT } from '@/configs/appConfig';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { handleShowError } from '@/helpers/common';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { parseAskIoTPhoneNumber } from '@/helpers/phone-number';
import { setValue } from '@/helpers/storage';
import { useClaimVendor, useCreateVendor } from '@/modules/vendors/hooks';
import { useUserContext } from '@/providers/UserProvider';
import clsx from 'clsx';
import { FC, HTMLProps, useEffect, useRef, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IClaimOwnershipFormProps {
  onNextStep: () => void;
  paymentSuccess?: boolean;
  paymentCancel?: boolean;
}

const MAX_EMAILS = 3;

const RadioControlLable: FC<HTMLProps<HTMLLabelElement>> = ({
  htmlFor,
  children,
  className,
  ...rest
}) => (
  <label
    {...rest}
    className={clsx(
      'hover:cursor-pointer shadow-s px-3 py-2.5 rounded-lg text-base text-gray-1000 peer-checked:bg-primary-500 peer-checked:text-white block',
      className,
    )}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

const ClaimOwnershipForm: FC<IClaimOwnershipFormProps> = ({
  onNextStep,
  paymentSuccess,
  paymentCancel,
}) => {
  const form = useFormContext();
  const vendorId = form.getValues('vendorid');
  const { mutate: claimVendor, isPending: isClaiming } = useClaimVendor();
  const { mutate: createVendor, isPending: isCreating } = useCreateVendor();
  const isLoading = isCreating || isClaiming;
  const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
  const subscriptionModalRef = useRef<IModalElement>(null);
  const quoteVerificationRef = useRef<IModalElement>(null);
  const { isNoPaymentStatus } = useUserContext();
  const watchIsSentEmail = form.watch('isSentEmail');

  const {
    fields: emails,
    append: addEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: 'emails',
  });
  const disableAddEmails = form.watch('emails')?.length === 3;

  useEffect(() => {
    if (watchIsSentEmail) {
      form.resetField('emails');
    }
  }, [watchIsSentEmail]);

  useEffect(() => {
    if (paymentSuccess) {
      onSubmit(form.getValues());
    }
  }, [paymentSuccess]);

  useEffect(() => {
    if (paymentCancel) {
      subscriptionModalRef.current?.open();
    }
  }, [paymentCancel]);

  const handleClaimVendor = (data: any) => {
    const { phone_number, email_associated_with_business, claim_reason, first_name, last_name } =
      data;
    const { phoneCode, nationalNumber } = parseAskIoTPhoneNumber(phone_number);

    claimVendor(
      {
        id: vendorId,
        data: {
          claimDetails: {
            phone_number: nationalNumber,
            email_associated_with_business,
            claim_reason,
            first_name,
            last_name,
            country_code: phoneCode,
          },
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

    createVendor(
      {
        ...rest,
        phone_number: nationalNumber,
        country_code: phoneCode,
      },
      {
        onSuccess: handleClaimOrCreateVendorSuccess,
        onError: handleShowError,
      },
    );
  };

  const handleClaimOrCreateVendorSuccess = () => {
    handleCloseSubscriptionModal();
    paymentSuccess && handleRemoveOnboardingInfoFromStorage();
    onNextStep();
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
    onSubmit(form.getValues());
    closeOTPModal();
  };

  const handleRemoveOnboardingInfoFromStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.VENDOR_ONBOARDING_DATA);
  };

  const handleAddEmails = () => {
    addEmail({
      value: '',
    });
  };

  const handleRemoveEmail = (index: number) => {
    removeEmail(index);
  };

  const handleGoUnlimited = () => {
    setValue(LOCAL_STORAGE_KEYS.VENDOR_ONBOARDING_DATA, JSON.stringify(form.getValues()));
  };

  const handleOpenSubscriptionModal = () => {
    subscriptionModalRef.current?.open();
  };

  const handleCloseSubscriptionModal = () => {
    subscriptionModalRef.current?.close();
  };

  const closeOTPModal = () => {
    quoteVerificationRef?.current?.close();
  };

  return (
    <>
      <form
        className="mt-16 flex flex-col items-end"
        onSubmit={form.handleSubmit(isNoPaymentStatus ? handleOpenSubscriptionModal : onSubmit)}
      >
        <div className="flex flex-col gap-5 py-6 px-8 rounded-xl border border-gray-300 w-full">
          <div className="grid grid-cols-2">
            <p className="flex-1 text-l text-black">
              Is your current email associated with the business
            </p>
            <div className="flex-1 flex gap-3">
              <div>
                <FormRadio
                  inputClassName="hidden peer"
                  id="isEmailAssociated-true"
                  name="email_associated_with_business"
                  value={true as any}
                  controlLabel={
                    <RadioControlLable className="w-fit" htmlFor="isEmailAssociated-true">
                      Yes
                    </RadioControlLable>
                  }
                  isBooleanValue
                />
              </div>
              <div>
                <FormRadio
                  inputClassName="hidden peer"
                  id="isEmailAssociated-false"
                  name="email_associated_with_business"
                  value={false as any}
                  controlLabel={
                    <RadioControlLable className="w-fit" htmlFor="isEmailAssociated-false">
                      No
                    </RadioControlLable>
                  }
                  hideErrorMsg
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-l text-black">
              Provide the best number to reach you for verification
            </p>
            <FormPhoneNumberInput name="phone_number" placeholder="Phone number" />
          </div>
          <div className="grid grid-cols-2">
            <p className="text-l text-black">First name</p>
            <FormInput name="first_name" placeholder="First name" />
          </div>
          <div className="grid grid-cols-2">
            <p className="text-l text-black">Last name</p>
            <FormInput name="last_name" placeholder="Last name" />
          </div>
          <div className="grid grid-cols-2">
            <p className="flex-1 text-l text-black">Provide details around ownership</p>
            <FormTextarea name="claim_reason" placeholder="For ex : I am marketing VP" rows={3} />
          </div>
          <div className="grid grid-cols-2">
            <p className="flex-1 text-l text-black">Do you want lead emails sent to your email</p>
            <div className="flex-1 flex gap-3">
              <div>
                <FormRadio
                  inputClassName="hidden peer"
                  id="isSentEmail-true"
                  name="isSentEmail"
                  value={true as any}
                  controlLabel={
                    <RadioControlLable className="w-fit" htmlFor="isSentEmail-true">
                      Yes
                    </RadioControlLable>
                  }
                  isBooleanValue
                />
              </div>
              <div>
                <FormRadio
                  inputClassName="hidden peer"
                  id="isSentEmail-false"
                  name="isSentEmail"
                  value={false as any}
                  controlLabel={
                    <RadioControlLable className="w-fit" htmlFor="isSentEmail-false">
                      No
                    </RadioControlLable>
                  }
                  hideErrorMsg
                  isBooleanValue
                />
              </div>
            </div>
          </div>
          {watchIsSentEmail === false && (
            <div className="grid grid-cols-2">
              <p className="flex-1 text-l text-black">
                If no, please enter upto three emails where you want to receive theme
              </p>
              <div className="emails flex flex-col gap-3">
                {emails.map((it, index) => (
                  <div className="flex items-center gap-2">
                    <FormInput
                      className="!w-1/2"
                      key={it.id}
                      name={`emails.${index}.value`}
                      placeholder="Email"
                    />
                    {index >= 1 && (
                      <Button variant="inline" onClick={() => handleRemoveEmail(index)}>
                        <img
                          src="/assets/icons/danger-trash-icon.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      </Button>
                    )}
                  </div>
                ))}
                {!disableAddEmails && (
                  <Button
                    className="flex items-center gap-2"
                    variant="inline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddEmails();
                    }}
                  >
                    <img src="/assets/icons/plus-primary-icon.svg" alt="plus icon" />
                    <span className="text-primary-500">Add</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        <Button className="mt-6">Submit</Button>
      </form>
      <LoadingIndicator isLoading={isLoading || isSendOTPLoading} />
      <Modal ref={subscriptionModalRef} paperClassName="md:!w-3/4" hideButtons>
        <SubscriptionPlan
          checkoutSessionType="vendor_onboarding"
          onStayOnFree={() => onSubmit(form.getValues())}
          onGoUnlimited={handleGoUnlimited}
        />
      </Modal>
      <SwitchToProviderOTPVerification
        ref={quoteVerificationRef}
        onSuccess={handleVerifyOTPSuccess}
      />
    </>
  );
};

export default ClaimOwnershipForm;
