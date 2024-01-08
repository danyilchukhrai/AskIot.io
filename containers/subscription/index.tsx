import SubscriptionPlan from '@/components/Molecules/SubscriptionPlan';
import { FC } from 'react';

interface ISubscriptionProps {}

const Subscription: FC<ISubscriptionProps> = (props) => {
  return (
    <section className="subscription-section p-6">
      <SubscriptionPlan checkoutSessionType="access_bot" hideFreePlan />
    </section>
  );
};

export default Subscription;
