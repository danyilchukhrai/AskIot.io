import LoadingIndicator from '@/components/LoadingIndicator';
import { CHECKOUT_STATUS } from '@/constants/checkout';
import { PLANS_DATA, PLAN_TERM, SUBSCRIPTION_PLANS } from '@/constants/subscription';
import { handleShowError } from '@/helpers/common';
import { useCreateCheckoutSession, useGeneratePaymentUrl } from '@/modules/subscription/hooks';
import { CheckoutSessionType } from '@/modules/subscription/types';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ChangeEvent, FC, useState } from 'react';
import EnterpriseItem from './components/EnterpirseItem';
import PlanItem from './components/PlanItem';
import TermToggleButton from './components/TermToggleButton';

interface ISubscriptionPlanProps {
  onStayOnFree?: () => void;
  onGoUnlimited?: (planTitle: string) => void;
  checkoutSessionType: CheckoutSessionType;
  onPaymentSuccess?: () => void;
  hideFreePlan?: boolean;
  onTermChange?: (term: PLAN_TERM) => void;
}

const SubscriptionPlan: FC<ISubscriptionPlanProps> = ({
  onStayOnFree,
  checkoutSessionType,
  onGoUnlimited,
  hideFreePlan = false,
  onTermChange,
}) => {
  const pathname = usePathname();
  const [isMonthly, setIsMonthly] = useState(true);

  const { mutate: createCheckoutSession, isPending: creatingCheckoutSession } =
    useCreateCheckoutSession();
  const { mutate: generatePaymentUrl, isPending: generatingPaymentUrl } = useGeneratePaymentUrl();
  const isCancel = pathname.split('/').pop() === CHECKOUT_STATUS.Cancel;

  const handleGoUnlimited = (planName: string, planTitle: string) => {
    const term = isMonthly ? PLAN_TERM.MONTHLY : PLAN_TERM.ANNUAL;
    onGoUnlimited && onGoUnlimited(planTitle);
    createCheckoutSession(
      {
        type: checkoutSessionType,
        env: process.env.NEXT_PUBLIC_APP_ENV as string,
        planName,
        term,
      },
      {
        onError: handleShowError,
        onSuccess: handleGeneratePaymentUrl,
      },
    );
  };

  const handleGeneratePaymentUrl = ({ sessionId }: { sessionId: string }) => {
    generatePaymentUrl(sessionId, {
      onError: handleShowError,
      onSuccess: ({ url }) => {
        window.location.replace(url);
      },
    });
  };

  const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isMonthly = e.target.checked;
    setIsMonthly(isMonthly);
    onTermChange && onTermChange(isMonthly ? PLAN_TERM.MONTHLY : PLAN_TERM.ANNUAL);
  };

  const getPrice = (planInfo: any) => {
    return isMonthly ? planInfo?.monthlyPrice : planInfo?.annuallyPrice;
  };

  const LeadGuaranteeBox: FC<{ text: string }> = ({ text }) => (
    <div className="lead-guarantee-box my-4 p-4 border-l-4 border-blue-600 bg-blue-50">
      <p className="text-blue-600">{text}</p>
    </div>
  );

  return (
    <>
      <div className="subscription">
        <div className="header flex flex-col items-center">
          <p className="text-3xl font-medium text-center">Elevate your business with askIoT</p>
          <LeadGuaranteeBox
            text="Experience askIoT risk-free with a complimentary trial period. 
          During this trial, you can fully utilize the features of your selected plan without any charges. 
          No leads will be billed, ensuring a completely free and transparent experience. 
          After the trial, choose to continue with the plan that best suits your needs. No hidden fees or surprises!!"
          />

          {isCancel && (
            <p className="text-red-500 text-base mt-4 error-msg text-center">
              Looks like your payment failed, please try again if are interested in the Unlimited
              plan
            </p>
          )}
          <TermToggleButton checked={isMonthly} onChange={handleTermChange} />
        </div>
        <div className="flex md:flex-row flex-col 2xl:w-4/5 mt-8 mx-auto gap-4">
          {!hideFreePlan && (
            <div className="md:w-1/3 w-full h-full">
              <PlanItem
                {...PLANS_DATA[SUBSCRIPTION_PLANS.FREE]}
                price={getPrice(PLANS_DATA[SUBSCRIPTION_PLANS.FREE])}
                onSelect={onStayOnFree}
              />
            </div>
          )}
          <div className={clsx('w-full', hideFreePlan ? 'md:w-full' : 'md:w-2/3')}>
            <EnterpriseItem
              {...PLANS_DATA[SUBSCRIPTION_PLANS.ENTERPRISE]}
              price={getPrice(PLANS_DATA[SUBSCRIPTION_PLANS.ENTERPRISE])}
              onSelect={handleGoUnlimited}
            />
          </div>
        </div>
      </div>
      <LoadingIndicator isLoading={creatingCheckoutSession || generatingPaymentUrl} />
    </>
  );
};

export default SubscriptionPlan;
