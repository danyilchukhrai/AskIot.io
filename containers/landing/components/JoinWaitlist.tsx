import Button from '@/components/Button';

import { FC } from 'react';
import { AUTH_ROUTES } from '@/constants/routes';


interface IJoinWaitlistProps {}

const JoinWaitlist: FC<IJoinWaitlistProps> = (props) => {
  return (
    <section className="join-waitlist-section h-[300px] md:h-[431px] bg-black  border-b border-gray-800">
      <div className="container flex flex-col items-center justify-center h-full">
        <p className="max-w-[748px] text-3xl md:text-[2.5rem] font-bold md:leading-normal -tracking-[1.6px] text-center md:mb-16 mb-10 text-white">
          Join the elite circle of forward-thinking enterprises with exclusive access to the
          game-changing AI platform, askIoT.
        </p>
        <Button link={AUTH_ROUTES.SIGN_UP}>Start Building</Button>
      </div>
    </section>
  );
};

export default JoinWaitlist;
