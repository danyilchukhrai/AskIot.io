import LoadingIndicator from '@/components/LoadingIndicator';
import { CHECKOUT_STATUS } from '@/constants/checkout';
import { handleShowError } from '@/helpers/common';
import { useCreateCheckoutSession } from '@/modules/subscription/hooks';
import { CheckoutSessionType } from '@/modules/subscription/types';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import PlanItem from './components/PlanItem';

interface ISubscriptionPlanProps {
  onStayOnFree?: () => void;
  onGoUnlimited?: () => void;
  checkoutSessionType: CheckoutSessionType;
  onPaymentSuccess?: () => void;
  hideFreePlan?: boolean;
}

const SubscriptionPlan: FC<ISubscriptionPlanProps> = ({
  onStayOnFree,
  checkoutSessionType,
  onGoUnlimited,
  hideFreePlan = false,
}) => {
  const pathname = usePathname();
  const { mutate: createCheckoutSession, isPending } = useCreateCheckoutSession();
  const isCancel = pathname.split('/').pop() === CHECKOUT_STATUS.Cancel;

  const handleGoUnlimited = () => {
    onGoUnlimited && onGoUnlimited();
    createCheckoutSession(
      {
        type: checkoutSessionType,
        env: 'staging',
      },
      {
        onError: handleShowError,
        onSuccess: (data) => {
          window.location.replace(data.url);
        },
      },
    );
  };

  return (
    <>
      <div className="subscription">
        <div className="header">
          <p className="text-3xl font-medium text-center">Elevate your business with askIoT</p>
          <p className="text-gray-600 text-l text-center mt-2">
            Generate unlimited leads and transform your website into a lead-generating powerhouse
            with askIoT.
          </p>
          {isCancel && (
            <p className="text-red-500 text-base mt-4 error-msg text-center">
              Looks like your payment failed, please try again if are interested in the Unlimited
              plan
            </p>
          )}
        </div>
        <div className="body flex md:flex-row flex-col justify-center mt-8">
          {!hideFreePlan && (
            <PlanItem
              className="flex-1"
              title="Start Smart - Free Plan"
              description="Embark on your AI journey without spending a dime."
              price={0}
              features={[
                'MGet started with 5 leads each month.',
                'Showcase your products through our intelligent',
                'Engage directly with quote request.',
              ]}
              limits={['Upgrade to unlock personalized AI chatGPT for your website']}
              isFreePlan
              onStayOnFree={onStayOnFree}
            />
          )}
          {!hideFreePlan && <div className="w-[2px] bg-gray-700 mx-2 hidden md:block" />}
          {!hideFreePlan && <div className="h-[2px] bg-gray-700 my-2 md:hidden" />}
          <PlanItem
            className={clsx(hideFreePlan ? 'w-fit' : 'flex-1')}
            title="Scale Limitlessly - Unlimited Plan"
            description="Skyrocket your lead generation and AI capabilities.<br/> Cancel anytime"
            price={99}
            features={[
              'Unlimited Leads.',
              'Customized chatGPT for your website.',
              'Verified vendors are proactively recommended to customers during their quote requests.',
              'Distinguish your business with a Verified Badge and more.',
            ]}
            onGoUnlimited={handleGoUnlimited}
          />
        </div>
      </div>
      <LoadingIndicator isLoading={isPending} />
    </>
  );
};

export default SubscriptionPlan;
