import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormRadio from '@/components/FormComponents/FormRadio';
import FormTextarea from '@/components/FormComponents/FormTextarea';
import LoadingIndicator from '@/components/LoadingIndicator';
import { API_ENDPOINT } from '@/configs/appConfig';
import { handleShowError } from '@/helpers/common';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { useClaimVendor, useCreateVendor } from '@/modules/vendors/hooks';
import { useUserContext } from '@/providers/UserProvider';
import { FC, HTMLProps, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IClaimOwnershipFormProps {
  onNextStep: () => void;
  quoteVerificationHandler: () => void;
}

const RadioControlLable: FC<HTMLProps<HTMLLabelElement>> = ({ htmlFor, children, ...rest }) => (
  <label
    {...rest}
    className="hover:cursor-pointer shadow-s px-3 py-2.5 rounded-lg text-base text-gray-1000 peer-checked:bg-primary-500 peer-checked:text-white block"
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

const ClaimOwnershipForm: FC<IClaimOwnershipFormProps> = ({
  onNextStep,
  quoteVerificationHandler,
}) => {
  const form = useFormContext();
  const vendorId = form.getValues('vendorid');
  const { mutate: claimVendor, isPending: isClaiming } = useClaimVendor();
  const { mutate: createVendor, isPending: isCreating } = useCreateVendor();
  const isLoading = isCreating || isClaiming;
  const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
  const { askIOTUserDetails } = useUserContext();

  const handleClaimVendor = (data: any) => {
    const { phone_number, email_associated_with_business, claim_reason, first_name, last_name } =
      data;

    claimVendor(
      {
        id: vendorId,
        data: {
          claimDetails: {
            phone_number,
            email_associated_with_business,
            claim_reason,
            first_name,
            last_name,
          },
        },
      },
      {
        onSuccess: onNextStep,
        onError: handleShowError,
      },
    );
  };

  const handleCreateVendor = (data: any) => {
    createVendor(data, {
      onSuccess: onNextStep,
      onError: handleShowError,
    });
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

  const onSubmit = async (data: any) => {
    const { vendorname, vendorid, ...restData } = data || {};
    try {
      setIsSendOTPLoading(true);
      const verificationStatus = await askIOTApiFetch(
        `${API_ENDPOINT}/private/users/verification-status`,
      );
      setIsSendOTPLoading(false);
      if (verificationStatus?.isVerified) {
        if (vendorid) {
          handleClaimVendor(restData);
        } else {
          handleCreateVendor(data);
        }
      } else {
        await handleSendOPT(data);
      }
    } catch (error: any) {
      const errorData = await error?.json();
      console.log(errorData);
      toast.error(errorData?.error || 'Failed to verify the status');
    }
  };

  return (
    <>
      <form className="mt-16 flex flex-col items-end" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 py-6 px-8 rounded-xl border border-gray-300 w-full">
          <div className="grid grid-cols-2">
            <p className="flex-1 text-l text-black">
              Is your current email associated with the business
            </p>
            <div className="flex-1 flex gap-3 items-center">
              <div>
                <FormRadio
                  inputClassName="hidden peer"
                  id="isEmailAssociated-true"
                  name="email_associated_with_business"
                  value={true as any}
                  controlLabel={
                    <RadioControlLable htmlFor="isEmailAssociated-true">Yes</RadioControlLable>
                  }
                />
              </div>
              <div>
                <FormRadio
                  inputClassName="hidden peer"
                  id="isEmailAssociated-false"
                  name="email_associated_with_business"
                  value={false as any}
                  controlLabel={
                    <RadioControlLable htmlFor="isEmailAssociated-false">No</RadioControlLable>
                  }
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-l text-black">
              Provide the best number to reach you for verification
            </p>
            <FormInput name="phone_number" placeholder="Phone number" />
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
        </div>
        <Button className="mt-6">Submit</Button>
      </form>
      {(isLoading || isSendOTPLoading) && <LoadingIndicator />}
    </>
  );
};

export default ClaimOwnershipForm;
