'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import { FC } from 'react';
import { PopupButton } from '@typeform/embed-react';
import TypeFormPopupButton from '@/components/TypeFormPopupButton';
import { JOIN_WAITLIST_TYPEFORM_ID } from '@/constants/typeform';

interface IAboutSectionProps {}

const AboutSection: FC<IAboutSectionProps> = (props) => {
  return (
    <section className="about-section md:pt-25 md:pb-30 pt-12 pb-15 relative overflow-hidden">
      <div className="w-[241px] h-[241px] bg-primary-500 opacity-30 blur-[198px] absolute -bottom-[148px] -left-[107px] rounded-full" />
      <div className="left-icon-group hidden md:flex flex-col items-end justify-between w-[235px] h-[457px] absolute top-[63px] left-[73px]">
        <div className="w-full flex justify-between">
          <Image
            className="mt-24.5"
            src="/assets/logo/logo-new-landing.svg"
            width={49}
            height={49}
            alt="AskIoT"
          />
          <Image
            className="w-[73px] h-[73px]"
            src="/assets/logo/logo-new-landing.svg"
            width={73}
            height={73}
            alt="AskIoT"
          />
        </div>
        <Image src="/assets/logo/logo-new-landing.svg" width={160} height={160} alt="AskIoT" />
      </div>
      <div className="container">
        <div className="content max-w-[770px] mx-auto">
          <p className="text-[3rem] md:text-[4rem] text-blueGray-900 leading-[78px] font-[800] text-center">
            Boost your business with <span className="text-primary-500">askIoT</span>
          </p>
          <p className="text-blueGray-800 text-2xl md:text-3xl font-medium text-center pt-[15px] pb-10 max-w-[583px] mx-auto">
            Get highly qualified IoT leads every. single. day
          </p>
          <TypeFormPopupButton
            typeformId={JOIN_WAITLIST_TYPEFORM_ID}
            className="text-xl font-semibold py-3 w-full md:!w-[379px] block mx-auto"
            variant="info"
          >
            Join the waitlist
          </TypeFormPopupButton>
        </div>
      </div>

      <div className="right-icon-group hidden md:flex flex-col items-end justify-between w-[195px] h-[478px] absolute top-[68px] right-[71px]">
        <div className="w-full flex justify-between">
          <Image
            className="w-[85px] h-[85px] mt-[255px]"
            src="/assets/logo/logo-new-landing.svg"
            width={85}
            height={85}
            alt="AskIoT"
          />
          <Image
            className="w-[153px] h-[153px]"
            src="/assets/logo/logo-new-landing.svg"
            width={153}
            height={153}
            alt="AskIoT"
          />
        </div>
        <Image
          className="w-[53px] h-[53px]"
          src="/assets/logo/logo-new-landing.svg"
          width={53}
          height={53}
          alt="AskIoT"
        />
      </div>
      <div className="w-[254px] h-[254px] bg-primary-500 opacity-30 blur-[198px] absolute top-[55px] -right-[58px] rounded-full" />
      <div className="w-[294px] h-[294px] bg-primary-500 opacity-30 blur-[198px] absolute -bottom-[221px] -right-[65px] rounded-full" />
    </section>
  );
};

export default AboutSection;
