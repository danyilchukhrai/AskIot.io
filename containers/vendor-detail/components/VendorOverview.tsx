import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import FormTags from '@/components/FormComponents/FormTags';
import FormTextarea from '@/components/FormComponents/FormTextarea';
import LoadingIndicator from '@/components/LoadingIndicator';
import { getArrayValueFromTags, handleShowError } from '@/helpers/common';
import { useUpdateVendor } from '@/modules/vendors/hooks';
import { IVendorDetails } from '@/modules/vendors/type';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IVendorDetailProps } from '..';

interface IVendorOverviewProps extends IVendorDetailProps {
  vendor?: IVendorDetails;
}

const VendorOverview: FC<IVendorOverviewProps> = ({ vendor, isVendor }) => {
  const [isEditInfo, setIsEditInfo] = useState(false);
  const orgDetail = vendor?.orgDetails?.[0];
  const { mutate: updateVendor, isPending: updatingVendor } = useUpdateVendor();

  const vendorInfoForm = useForm({
    defaultValues: {
      companyinfo: '',
      linkedin: '',
      specialities: '',
      industry: '',
      twitter: '',
    },
  });

  useEffect(() => {
    if (vendor) {
      handleFillFormData();
    }
  }, [vendor, isVendor]);

  const handleFillFormData = () => {
    if (!isVendor) return;

    vendorInfoForm.reset({
      companyinfo: vendor?.companyinfo,
      linkedin: orgDetail?.organization_linkedin_url,
      specialities: getVendorSpecialities(),
      industry: getVendorIndustries(),
      twitter: orgDetail?.organization_twitter_url,
    });
  };

  const onSaveVendorInfo = (data: any) => {
    const body = {
      ...data,
      specialities: getArrayValueFromTags(data.specialities),
      industry: getArrayValueFromTags(data.industry),
    };
    if (vendor?.vendorid) {
      updateVendor(
        { data: body, id: vendor?.vendorid },
        {
          onError: handleShowError,
          onSuccess: () => {
            toast.success('Vendor updated successfully');
            setIsEditInfo(false);
          },
        },
      );
    }
  };

  const getVendorIndustries = () =>
    Array.isArray(vendor?.industries) ? vendor?.industries.join(', ') : vendor?.industries || '';

  const getVendorSpecialities = () =>
    Array.isArray(vendor?.specialities) ? vendor?.specialities?.join(', ') : vendor?.specialities;

  const showTags = (value: string) => {
    try {
      const parseValue = JSON.parse(value);
      return Array.isArray(parseValue)
        ? parseValue?.map((it: any) => it?.value)?.join(', ')
        : parseValue;
    } catch (error) {
      return value;
    }
  };

  return (
    <>
      <FormProvider {...vendorInfoForm}>
        <div className="rounded-xl shadow p-6 mt-5">
          <div className="mb-6">
            <p className="text-primary-500 text-base font-medium md:mb-6 mb-3">Details</p>
            <div className="flex md:flex-row flex-col">
              <p className="text-gray-1000 text-base font-semibold w-[15%] mr-2 md:mb-0 mb-1">
                Overview
              </p>
              {isEditInfo ? (
                <FormTextarea
                  name="companyinfo"
                  containerClassName="w-full"
                  placeholder="Overview"
                  rows={4}
                />
              ) : (
                <p className="flex-1 text-base text-gray-1000">
                  {isVendor ? vendorInfoForm.getValues('companyinfo') : vendor?.companyinfo}
                </p>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div>
              <div className="text-gray-1000 text-base flex mb-6">
                <p className=" font-semibold w-[30%] mr-2">Linkedin</p>
                {isEditInfo ? (
                  <FormInput name="linkedin" placeholder="Linkedin" />
                ) : (
                  <p className="flex-1 text-end md:text-start word-break">
                    {isVendor
                      ? vendorInfoForm.getValues('linkedin')
                      : orgDetail?.organization_linkedin_url}
                  </p>
                )}
              </div>
              <div className="text-gray-1000 text-base flex">
                <p className=" font-semibold w-[30%] mr-2">Specialities</p>
                {isEditInfo ? (
                  <FormTags name="specialities" placeholder="Specialities" />
                ) : (
                  <p className="flex-1 text-end md:text-start">
                    {isVendor
                      ? showTags(vendorInfoForm.getValues('specialities'))
                      : getVendorSpecialities()}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="text-gray-1000 text-base flex mb-6">
                <p className=" font-semibold w-[30%] mr-2">Industry</p>
                {isEditInfo ? (
                  <FormTags name="industry" placeholder="Industry" />
                ) : (
                  <p className="flex-1 text-end md:text-start">
                    {isVendor
                      ? showTags(vendorInfoForm.getValues('industry'))
                      : getVendorIndustries()}
                  </p>
                )}
              </div>
              <div className="text-gray-1000 text-base flex mb-6">
                <p className=" font-semibold w-[30%] mr-2">Twitter</p>
                {isEditInfo ? (
                  <FormInput name="twitter" placeholder="Twitter" />
                ) : (
                  <p className="flex-1 text-end md:text-start word-break">
                    {isVendor
                      ? vendorInfoForm.getValues('twitter')
                      : orgDetail?.organization_twitter_url}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {isVendor && (
          <div
            className={clsx('buttons mt-10 flex', isEditInfo ? 'justify-between' : 'justify-end')}
          >
            {isEditInfo ? (
              <>
                <Button variant="secondary" onClick={() => setIsEditInfo(false)}>
                  Cancel
                </Button>
                <Button onClick={vendorInfoForm.handleSubmit(onSaveVendorInfo)}>Save</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditInfo(true)}>Edit</Button>
            )}
          </div>
        )}
      </FormProvider>
      <LoadingIndicator isLoading={updatingVendor} />
    </>
  );
};

export default VendorOverview;
