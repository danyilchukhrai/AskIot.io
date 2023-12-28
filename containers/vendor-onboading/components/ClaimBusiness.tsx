import { USER_TYPE } from '@/configs/routeConfig';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import ClaimOwnershipForm from './ClaimOwnershipForm';

interface IClaimBusinessProps {
  quoteVerificationHandler: () => void;
}

enum CHILD_STEP {
  CLAIM_OWNERSHIP,
  THANK_YOU,
}

const ClaimBusiness: FC<IClaimBusinessProps> = ({ quoteVerificationHandler }) => {
  const [childStep, setChildStep] = useState(CHILD_STEP.CLAIM_OWNERSHIP);
  const { setCurrentUserType } = useUserTypeContext();
  const router = useRouter();

  // Redirect to user view after 10 seconds
  useEffect(() => {
    if (childStep === CHILD_STEP.THANK_YOU) {
      setTimeout(() => {
        setCurrentUserType(USER_TYPE.USER);
        router.push(RESTRICTED_APP_ROUTES.IOTGPT);
      }, 10000);
    }
  }, [childStep]);

  return (
    <>
      {childStep === CHILD_STEP.CLAIM_OWNERSHIP && (
        <ClaimOwnershipForm
          quoteVerificationHandler={quoteVerificationHandler}
          onNextStep={() => setChildStep(CHILD_STEP.THANK_YOU)}
        />
      )}
      {childStep === CHILD_STEP.THANK_YOU && (
        <div className="rounded-xl border border-gray-300 md:px-8 md:py-6 px-6 py-3 md:mt-25 mt-20">
          <p className="text-gray-1000 text-3xl font-medium mb-5">Thank you</p>
          <p className="text-black text-l">
            We Generally confirm your ownership within 24hours. Please keep an eye out for our
            email. We may reach you by phone for confirmation
          </p>
        </div>
      )}
    </>
  );
};

export default ClaimBusiness;
