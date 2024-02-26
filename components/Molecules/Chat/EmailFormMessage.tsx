import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import { IThreadInteraction } from '@/modules/iot-gpt/type';
import { BASE_VALIDATION } from '@/validations/base';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object } from 'yup';

interface IEmailFormMessageProps {
  submittingEmail?: boolean;
  onSubmitEmail?: (email: string) => void;
  aiLogo?: string;
  id?: number;
  messageData?: IThreadInteraction[];
}

const EmailFormMessage: React.FunctionComponent<IEmailFormMessageProps> = ({
  submittingEmail,
  onSubmitEmail,
  aiLogo,
  id,
  messageData = [],
}) => {
  const [submitted, setSubmitted] = React.useState(false);
  const submitEmailForm = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(
      object().shape({
        email: BASE_VALIDATION.email,
      }),
    ),
  });
  const isDisabledEmail = messageData?.findIndex((it) => it.id === id) !== messageData.length - 1;

  const handleSubmitEmail = (data: { email: string }) => {
    if (onSubmitEmail) {
      onSubmitEmail(data.email);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex items-center">
      <Avatar
        src={aiLogo || '/assets/logo/logo.svg'}
        className="w-8 h-8 md:w-10 md:h-10 md:mr-6 mr-3"
      />
      <div className="py-3 px-4 rounded-lg border border-gray-300 bg-gray-100">
        <p className="text-gray-700 text-s mb-2">
          Drop your email below and we will notify the supplier
        </p>
        <form className="flex" onSubmit={submitEmailForm.handleSubmit(handleSubmitEmail)}>
          <FormProvider {...submitEmailForm}>
            <FormInput
              name="email"
              className="flex-1"
              inputClassName="!rounded-r-none"
              label=""
              placeholder="email@example.com"
              disabled={submitted || isDisabledEmail}
            />
            <Button
              className="rounded-l-none h-fit !max-h-[40px]"
              variant="info"
              isLoading={submittingEmail}
              disabled={submitted || isDisabledEmail}
            >
              {!submittingEmail && (
                <img className="w-5 h-5" src="/assets/icons/arrow-right-icon.svg" alt="icon" />
              )}
            </Button>
          </FormProvider>
        </form>
      </div>
    </div>
  );
};

export default EmailFormMessage;
