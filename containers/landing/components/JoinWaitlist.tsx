import Button from '@/components/Button';
import TypeFormPopupButton from '@/components/TypeFormPopupButton';
import { JOIN_WAITLIST_TYPEFORM_ID } from '@/constants/typeform';
import { FC } from 'react';

interface IJoinWaitlistProps {}

const JoinWaitlist: FC<IJoinWaitlistProps> = (props) => {
  return (
    <section className="join-waitlist-section h-[300px] md:h-[431px] bg-black  border-b border-gray-800">
      <div className="container flex flex-col items-center justify-center h-full">
        <p className="max-w-[748px] text-3xl md:text-[2.5rem] font-bold md:leading-normal -tracking-[1.6px] text-center md:mb-16 mb-10 text-white">
          Join the elite circle of forward-thinking enterprises with exclusive access to the
          game-changing AI platform, askIoT.
        </p>
        <TypeFormPopupButton
          typeformId={JOIN_WAITLIST_TYPEFORM_ID}
          className="text-l"
          variant="secondary"
        >
          Join Waitlist
        </TypeFormPopupButton>
      </div>
    </section>
  );
};

export default JoinWaitlist;
