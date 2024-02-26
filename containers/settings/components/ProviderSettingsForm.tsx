import { useState } from 'react';
import React, { useMemo } from 'react';
import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormRadio, { RadioControlLabel } from '@/components/FormComponents/FormRadio';
import { MAX_LEAD_EMAILS } from '@/constants/vendors';
import { handleShowError } from '@/helpers/common';
import { useGetVendorSettings, useUpdateLeadEmails } from '@/modules/vendors/hooks';
import { useInviteUser } from '@/modules/user/hooks';
import { IProviderSettingsForm } from '@/modules/vendors/type';
import { providerSettingsSchema } from '@/validations/vendors';
import { yupResolver } from '@hookform/resolvers/yup';
import { clsx } from 'clsx';
import { FC, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import UserTable from '../../provider-settings/UserTable'; 
import { useListAssociatedVendorUsers } from '@/modules/user/hooks';

import {IUser} from '@/modules/user/types';



interface IProviderSettingsFormProps {}

const ProviderSettingsForm: FC<IProviderSettingsFormProps> = (props) => {

  const { data: vendorSettings } = useGetVendorSettings();
  const [users, setUsers] = useState<IUser[]>([]);
  const { data: listUsersData, isLoading: listUsersLoading, error: listUsersError } = useListAssociatedVendorUsers();


  const form = useForm<IProviderSettingsForm>({
    defaultValues: {
      useUserEmail: undefined,
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

  // Initialize the user management form instance with useForm
const userManagementForm = useForm({
  defaultValues: {
    firstName: '',
    lastName: '',
    email: '',
  },
 
});



// Destructure the necessary methods and properties from the userManagementForm instance
const {
  register,
  handleSubmit: handleInviteSubmit, // Renamed for clarity when used for submitting the invite form
  reset: resetUserManagementForm, // Renamed for clarity to indicate it's for resetting the user management form
} = userManagementForm;

  const { mutate: inviteUser, isPending: invitingUser } = useInviteUser();

  // New form submission handler for user invitation
  const onInviteSubmit = () => {
    const data = {firstName, lastName, email}

    inviteUser(data, {
      onSuccess: (data: { message: string }) => {
        toast.success(data?.message);
        // Reset the form fields to their initial values after successful invitation
      resetUserManagementForm({
        firstName: '',
        lastName: '',
        email: '',
      });
      },
      onError: handleShowError,
    });
  };

  useEffect(() => {
    if (watchIsUseUserEmail) {
      form.resetField('leadEmails');
    }
  }, [watchIsUseUserEmail]);

  useEffect(() => {
    if (vendorSettings) {
      form.reset({
        leadEmails: vendorSettings.emails?.length
          ? vendorSettings.emails?.map((it) => ({
              value: it,
            }))
          : [
              {
                value: '',
              },
            ],
        useUserEmail: vendorSettings.isUserEmailUsed,
      });
    }
  }, [vendorSettings]);

  const handleAddEmails = () => {
    addEmail({
      value: '',
    });
  };

  const handleRemoveEmail = (index: number) => {
    removeEmail(index);
  };
  
  useEffect(() => {
    if (listUsersData) {
      setUsers(listUsersData); // Update the users state with the fetched data
    }
  }, [listUsersData]);


 // Use useMemo to prepare users data for rendering
const formattedUsers = useMemo(() => users.map(user => ({
  id: user.id,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
})), [users]);


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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>

    <FormProvider {...form}>
      <form className="mt-16 mb-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 px-4 py-4 lg:py-6 lg:px-10 rounded-xl shadow">
        <h3 className="text-md font-normal text-black">Manage your lead settings</h3>

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
                    <FormInput key={it.id} name={`leadEmails.${index}.value`} placeholder="Email" />
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
    <div className="px-4 py-4 lg:py-6 lg:px-10 rounded-xl shadow">
  <h3 className="text-md font-normal text-black">Invite an user to your organization</h3>
  <FormProvider {...userManagementForm}>
    <form className="mt-4" onSubmit={handleInviteSubmit(onInviteSubmit)}> {/* Adjusted the top margin */}
      <div className="flex flex-col gap-5 px-4 py-4 lg:py-6 lg:px-10 rounded-xl shadow"> {/* Removed gap from here */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput {...register('firstName')} placeholder="First Name" onChange={(e : any) => {
              setFirstName(e.target.value);
            }} value={firstName}/>
            <FormInput {...register('lastName')} placeholder="Last Name"  onChange={(e : any) => {
              setLastName(e.target.value);
            }} value={lastName} />
            <FormInput {...register('email')} placeholder="Email" type="email" onChange={(e : any) => {
              setEmail(e.target.value);
            }} value={email} />
          </div>
          <div className="flex items-center justify-end mt-6 w-full">
            {/* Submit Button */}
            <Button type="submit" className="mt-6" isLoading={invitingUser}>
              Invite
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
    {/* Section for Existing Users */}
      <div className="mt-6">
        <h3 className="text-md font-normal text-black">Current Users with access</h3>
        <UserTable users={formattedUsers} />
      </div>
    </div>
  </>
  );
};

export default ProviderSettingsForm;
