import LoadingIndicator from '@/components/LoadingIndicator';
import Modal, { IModalElement } from '@/components/Modal';
import { IOTPInputElement } from '@/components/OTPInput';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { OTP_LENGTH } from '@/constants/common';
import { OTP_ERROR_MSG } from '@/constants/error-msg';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { API_ENDPOINT } from '@/configs/appConfig';
import { toast } from 'react-toastify';
import { useFormContext } from 'react-hook-form';
import ProviderOTPForm from './ProviderOTPForm';

interface IQuoteVerificationProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export interface IQuoteVerificationElement {
  open: () => void;
  close: () => void;
}

const SwitchToProviderOTPVerification = forwardRef<
  IQuoteVerificationElement,
  IQuoteVerificationProps
>(({ onSuccess }, ref) => {
  const form = useFormContext();
  const modalRef = useRef<IModalElement>(null);
  const otpInputRef = useRef<IOTPInputElement>(null);
  const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
  const [openQuoteVerificationMobile, setOpenQuoteVerificationMobile] = useState(false);

  const isMobileMatches = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (isMobileMatches) {
      modalRef.current?.close();
    } else {
      openQuoteVerificationMobile && setOpenQuoteVerificationMobile(false);
    }
  }, [isMobileMatches]); //eslint-disable-line

  useImperativeHandle(ref, () => ({
    open: () => {
      isMobileMatches ? setOpenQuoteVerificationMobile(true) : modalRef.current?.open();
    },
    close: () => {
      isMobileMatches ? setOpenQuoteVerificationMobile(false) : modalRef.current?.close();
    },
  }));

  const handleVerifyOTP = async (data: any) => {
    if ((otpInputRef.current?.getValue()?.length || 0) < OTP_LENGTH) {
      toast.error(OTP_ERROR_MSG);
      return;
    }
    try {
      setIsSendOTPLoading(true);
      await askIOTApiFetch(`${API_ENDPOINT}/private/users/verify-otp`, {
        phoneNumber: data?.phone_number,
        code: otpInputRef.current?.getValue(),
      });
      setIsSendOTPLoading(false);
      onSuccess && onSuccess();
    } catch (error: any) {
      setIsSendOTPLoading(false);
      const errorData = await error?.json();
      toast.error(errorData?.error);
    }
  };

  return (
    <>
      <Modal
        ref={modalRef}
        title="Verification"
        primaryButtonLabel="Submit"
        onSubmit={form.handleSubmit(handleVerifyOTP)}
      >
        <ProviderOTPForm otpInputRef={otpInputRef} />
      </Modal>
      {isSendOTPLoading && <LoadingIndicator />}
    </>
  );
});

export default SwitchToProviderOTPVerification;
