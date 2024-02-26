import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormRadio, { RadioControlLabel } from '@/components/FormComponents/FormRadio';
import { MAX_LEAD_EMAILS } from '@/constants/vendors';
import { handleShowError } from '@/helpers/common';
import { useUpdateLeadEmails } from '@/modules/vendors/hooks';
import { IProviderSettingsForm } from '@/modules/vendors/type';
import { providerSettingsSchema } from '@/validations/vendors';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IProviderSettingsProps {}

const ProviderSettings: FC<IProviderSettingsProps> = (props) => {
  const form = useForm<IProviderSettingsForm>({
    defaultValues: {
      useUserEmail: true,
      leadEmails: [
        {
          value: '',
        },
      ],
    },
    resolver: yupResolver(providerSettingsSchema),
  });
  const watchIsUseUserEmail = form.watch('useUserEmail');

  const {
    fields: emails,
    append: addEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: 'leadEmails',
  });
  const disableAddEmails = form.watch('leadEmails')?.length === MAX_LEAD_EMAILS;
  const { mutate: updateLeadEmails, isPending: updatingLeadEmails } = useUpdateLeadEmails();

  useEffect(() => {
    if (watchIsUseUserEmail) {
      form.resetField('leadEmails');
    }
  }, [watchIsUseUserEmail]);

  const handleAddEmails = () => {
    addEmail({
      value: '',
    });
  };

  const handleRemoveEmail = (index: number) => {
    removeEmail(index);
  };

  const onSubmit = (data: IProviderSettingsForm) => {
    updateLeadEmails(
      {
        ...data,
        leadEmails: data.useUserEmail ? [] : data.leadEmails?.map((it) => it.value),
      },
      {
        onSuccess: (data: { message: string }) => {
          toast.success(data?.message);
        },
        onError: handleShowError,
      },
    );
  };

  return (
    <section className="min-h-screen p-8">
      <div className="lg:w-4/5 mx-auto">
        <p className="text-gray-1000 text-xl font-medium">Settings</p>
        <FormProvider {...form}>
          <form className="mt-16" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 px-4 py-4 lg:py-6 lg:px-10 rounded-xl shadow">
              <div className="grid grid-cols-2 gap-3 items-center">
                <p className="flex-1 text-base text-black">
                  Do you want lead emails sent to your email
                </p>
                <div className="flex-1 flex gap-3">
                  <div>
                    <FormRadio
                      inputClassName="hidden peer"
                      id="useUserEmail-true"
                      name="useUserEmail"
                      value={true as any}
                      controlLabel={
                        <RadioControlLabel className="w-fit" htmlFor="useUserEmail-true">
                          Yes
                        </RadioControlLabel>
                      }
                      isBooleanValue
                    />
                  </div>
                  <div>
                    <FormRadio
                      inputClassName="hidden peer"
                      id="useUserEmail-false"
                      name="useUserEmail"
                      value={false as any}
                      controlLabel={
                        <RadioControlLabel className="w-fit" htmlFor="useUserEmail-false">
                          No
                        </RadioControlLabel>
                      }
                      hideErrorMsg
                      isBooleanValue
                    />
                  </div>
                </div>
              </div>
              {watchIsUseUserEmail === false && (
                <div className="grid grid-cols-2 gap-3">
                  <p className="flex-1 text-base text-black">
                    If no, please enter upto three emails where you want to receive them
                  </p>
                  <div className="emails flex flex-col gap-3">
                    {emails.map((it, index) => (
                      <div className="flex items-center gap-2">
                        <FormInput
                          key={it.id}
                          name={`leadEmails.${index}.value`}
                          placeholder="Email"
                        />
                        <Button
                          className={clsx({
                            invisible: index === 0,
                          })}
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
              <div className="flex items-center justify-end mt-6 w-full">
                <Button className="mt-6" isLoading={updatingLeadEmails}>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ProviderSettings;
