import LoadingIndicator from '@/components/LoadingIndicator';
import Modal, { IModalElement } from '@/components/Modal';
import { IOTPInputElement } from '@/components/OTPInput';
import { API_ENDPOINT } from '@/configs/appConfig';
import { OTP_LENGTH } from '@/constants/common';
import { OTP_ERROR_MSG } from '@/constants/error-msg';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IQuoteVerificationForm } from '@/modules/quotes/types';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUserContext } from '@/providers/UserProvider';
import { quoteVerificationSchema } from '@/validations/quotes';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import QuoteVerificationFormDesktop from './QuoteVerificationFormDesktop';
import QuoteVerificationOTPForm from './QuoteVerificationOTP';
import QuoteVerificationFormMobile from './QuoteVerificatonFormMobile';

interface IQuoteVerificationProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export interface IQuoteVerificationElement {
  open: () => void;
  close: () => void;
}

const QuoteVerification = forwardRef<IQuoteVerificationElement, IQuoteVerificationProps>(
  ({ onSuccess, onClose }, ref) => {
    const { user } = useAuthContext();
    const { askIOTUserDetails, setAskIOTUserIsValid } = useUserContext();
    const modalRef = useRef<IModalElement>(null);
    const otpInputRef = useRef<IOTPInputElement>(null);
    const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
    const [isShowOTPForm, setIsShowOTPForm] = useState(false);
    const [openQuoteVerificationMobile, setOpenQuoteVerificationMobile] = useState(false);
    const form = useForm<IQuoteVerificationForm>({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
      },
      resolver: yupResolver(quoteVerificationSchema),
    });
    const isMobileMatches = useMediaQuery('(max-width: 767px)');

    useEffect(() => {
      if (user) {
        form.setValue('email', user?.email || '');
        form.setValue('phone', user?.phone || '');
      }
    }, []); //eslint-disable-line

    useEffect(() => {
      form.setValue('firstName', askIOTUserDetails?.first_name || '');
      form.setValue('lastName', askIOTUserDetails?.last_name || '');
    }, [askIOTUserDetails]); //eslint-disable-line

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

    const handleSendOPT = async (data: IQuoteVerificationForm) => {
      try {
        setIsSendOTPLoading(true);

        const sendOTPReq = await askIOTApiFetch(`${API_ENDPOINT}/private/users/send-otp`, {
          phoneNumber: data?.phone,
        });
        //update-user
        askIOTApiFetch(
          `${API_ENDPOINT}/private/users`,
          {
            firstName: data?.firstName,
            lastName: data?.lastName,
            phoneNumber: data?.phone,
            website: data?.website || '',
          },
          'PUT',
        );
        setIsSendOTPLoading(false);
        if (sendOTPReq?.message === 'OTP sent successfully') {
          setIsShowOTPForm(true);
        } else {
          toast.error('Unknown please try again.');
        }
      } catch (error: any) {
        setIsSendOTPLoading(false);
        const errorData = await error?.json();
        toast.error(errorData?.error);
      }
    };

    const handleQuoteVerification = async (data: IQuoteVerificationForm) => {
      if (isShowOTPForm) {
        await handleVerifyOTP(data);
      } else {
        await handleSendOPT(data);
      }
    };
    const handleVerifyOTP = async (data: IQuoteVerificationForm) => {
      if ((otpInputRef.current?.getValue()?.length || 0) < OTP_LENGTH) {
        toast.error(OTP_ERROR_MSG);
        return;
      }
      try {
        setIsSendOTPLoading(true);
        const verifyOTPReq = await askIOTApiFetch(`${API_ENDPOINT}/private/users/verify-otp`, {
          phoneNumber: data?.phone,
          code: otpInputRef.current?.getValue(),
        });
        setIsSendOTPLoading(false);
        if (verifyOTPReq?.user?.is_mobile_verified) {
          setAskIOTUserIsValid(true);
          onSuccess && onSuccess();
        } else {
          toast.error('Unknown please try again.');
        }
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
          onSubmit={form.handleSubmit(handleQuoteVerification)}
          onClose={() => setIsShowOTPForm(false)}
        >
          {isShowOTPForm ? (
            <QuoteVerificationOTPForm
              otpInputRef={otpInputRef}
              onBack={() => setIsShowOTPForm(false)}
            />
          ) : (
            <FormProvider {...form}>
              <QuoteVerificationFormDesktop />
            </FormProvider>
          )}
        </Modal>
        <LoadingIndicator isLoading={isSendOTPLoading} />
        {openQuoteVerificationMobile && (
          <FormProvider {...form}>
            <QuoteVerificationFormMobile
              onClose={() => {
                setOpenQuoteVerificationMobile(false);
                setIsShowOTPForm(false);
                onClose && onClose();
              }}
              onSubmit={form.handleSubmit(handleQuoteVerification)}
              isShowOTPForm={isShowOTPForm}
              otpInputRef={otpInputRef}
              onOTPFormBack={() => setIsShowOTPForm(false)}
            />
          </FormProvider>
        )}
      </>
    );
  },
);

export default QuoteVerification;
