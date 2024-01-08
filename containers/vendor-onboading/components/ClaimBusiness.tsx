import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormPhoneNumberInput from '@/components/FormComponents/FormPhoneNumberInput';
import FormRadio from '@/components/FormComponents/FormRadio';
import FormTextarea from '@/components/FormComponents/FormTextarea';
import { useUserContext } from '@/providers/UserProvider';
import clsx from 'clsx';
import { FC, HTMLProps, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface IClaimBusinessProps {
  onNextStep: () => void;
  onBackStep: () => void;
  onSubmit: (data: any) => void;
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

const ClaimBusiness: FC<IClaimBusinessProps> = ({ onNextStep, onBackStep, onSubmit }) => {
  const { isNoPaymentStatus } = useUserContext();
  const form = useFormContext();
  const watchIsSentEmail = form.watch('isSentEmail');

  const {
    fields: emails,
    append: addEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: 'emails',
  });
  const disableAddEmails = form.watch('emails')?.length === MAX_EMAILS;

  useEffect(() => {
    if (watchIsSentEmail) {
      form.resetField('emails');
    }
  }, [watchIsSentEmail]);

  const handleAddEmails = () => {
    addEmail({
      value: '',
    });
  };

  const handleRemoveEmail = (index: number) => {
    removeEmail(index);
  };

  return (
    <>
      <form
        className="mt-16 flex flex-col items-end"
        onSubmit={isNoPaymentStatus ? form.handleSubmit(onNextStep) : form.handleSubmit(onSubmit)}
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
                      <Button
                        variant="inline"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveEmail(index);
                        }}
                      >
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
                      e.preventDefault();
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
        <div className="flex items-center justify-between mt-6 w-full">
          <Button className="bg-gray" variant="secondary" onClick={onBackStep}>
            Previous
          </Button>
          <Button className="mt-6">Next</Button>
        </div>
      </form>
    </>
  );
};

export default ClaimBusiness;
