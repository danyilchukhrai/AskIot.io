import Button from '@/components/Button';
import SubscriptionPlan from '@/components/Molecules/SubscriptionPlan';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { PLANS_DATA, SUBSCRIPTION_PLAN, SUBSCRIPTION_PLANS } from '@/constants/subscription';
import { getValue, setValue } from '@/helpers/storage';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface IPlanMessageProps {
  isFree?: boolean;
  vendorName: string;
  setPlan: Dispatch<SetStateAction<SUBSCRIPTION_PLAN | undefined>>;
  onSubmit: () => void;
}

interface ISubscriptionStepProps {
  onNextStep: () => void;
  onBackStep: () => void;
  onSubmit: (data: any) => void;
  success: boolean;
}

const PlanMessage: FC<IPlanMessageProps> = ({ isFree, vendorName, setPlan, onSubmit }) => {
  const planName = getValue(LOCAL_STORAGE_KEYS.PLAN_NAME);

  return (
    <div className="flex justify-center">
      <div className="text-gray-1000 md:w-2/3">
        <p className="text-3xl font-medium">
          {isFree ? `You have chosen the ${planName}` : `Welcome to askloT's ${planName}!`}
        </p>
        <p className="text-l py-6">
          {isFree
            ? ` Welcome to the ${planName}! With this choice, you'll receive five exclusive leads
          each month, along with the ability to add and update your product listings. If you're
          looking to elevate your experience, our Unlimited Plan offers boundless opportunities. It
          includes unlimited lead access, Al training tailored to your company's unique
          products and services, and a customizable AI chatbot for your website.`
            : `Welcome to the ${planName} - your gateway to limitless possibilities! This plan grants you unrestricted access to an abundance of leads each month, alongside the freedom to continually add and update your products. Experience the innovation of a personalized chatbot, tailored just for you. To fully activate these benefits, we need to verify your business.`}
        </p>
        <p className="text-l pb-6">
          Please click next to continue your verification process to claim ownership of {vendorName}
        </p>

        <div className="flex items-center justify-between mt-15">
          <Button className="bg-gray" variant="secondary" onClick={() => setPlan(undefined)}>
            Previous
          </Button>
          <Button onClick={onSubmit}>Continue Verification</Button>
        </div>
      </div>
    </div>
  );
};

const SubscriptionStep: FC<ISubscriptionStepProps> = ({ onSubmit, success, onBackStep }) => {
  const form = useFormContext();
  const [plan, setPlan] = useState<SUBSCRIPTION_PLAN | undefined>();
  const vendorName = form.getValues('vendorname');

  useEffect(() => {
    if (success) {
      setPlan(SUBSCRIPTION_PLAN.UNLIMITED);
    }
  }, [success]);

  const handleGoUnlimited = (planTitle: string) => {
    setValue(LOCAL_STORAGE_KEYS.VENDOR_ONBOARDING_DATA, JSON.stringify(form.getValues()));
    setValue(LOCAL_STORAGE_KEYS.PLAN_NAME, planTitle);
  };

  const handleStayOnFree = () => {
    setValue(LOCAL_STORAGE_KEYS.VENDOR_ONBOARDING_DATA, JSON.stringify(form.getValues()));
    setValue(LOCAL_STORAGE_KEYS.PLAN_NAME, PLANS_DATA[SUBSCRIPTION_PLANS.FREE].title);
    setPlan(SUBSCRIPTION_PLAN.FREE);
  };

  const handleSubmit = () => {
    onSubmit(form.getValues());
  };

  return (
    <div className="md:mt-25 mt-20">
      {!plan && (
        <SubscriptionPlan
          checkoutSessionType="vendor_onboarding"
          onStayOnFree={handleStayOnFree}
          onGoUnlimited={handleGoUnlimited}
        />
      )}
      {plan && (
        <PlanMessage
          vendorName={vendorName}
          isFree={plan === SUBSCRIPTION_PLAN.FREE}
          setPlan={setPlan}
          onSubmit={handleSubmit}
        />
      )}
      {!plan && (
        <div className="flex items-center justify-between mt-6">
          <Button onClick={onBackStep}>Previous</Button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionStep;
