import TypeFormPopupButton from '@/components/TypeFormPopupButton';
import { JOIN_WAITLIST_TYPEFORM_ID } from '@/constants/typeform';

import { AUTH_ROUTES } from '@/constants/routes';
import Button from '@/components/Button';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IAboutSectionProps {}

const AboutSection: FC<IAboutSectionProps> = (props) => {
  const router = useRouter();

  return (
    <section className="about-section md:pt-15 pt-8 overflow-hidden">
      <div className="container flex  md:justify-between items-center flex-wrap">
        <div className="section-left w-full md:w-[41%]">
        <h2 className="text-4xl md:text-5xl text-black font-bold md:break-all md:-tracking-[2.56px] md:leading-normal text-center md:text-left">
  Your <span className="text-blue-600">AI</span> Powered IoT Marketplace
</h2>

          <p className="text-gray-600 text-xl md:text-2xl py-6 md:py-10.5 text-center md:text-left">
            Our AI is trained on the IoT ecosystem. Build your solution in minutes.  <span className="text-blue-500">Always Free for Builders.</span>
          </p>
          <div className="flex items-center justify-center md:justify-start">
          <Button link={AUTH_ROUTES.SIGN_UP}>Start Building</Button>
          </div>
        </div>
        <div className="section-right w-full md:w-[50%] flex flex-col mt-5 md:mt-0">
          <div className="relative flex justify-end">
            <Image
              className="w-[350px] md:w-[589px] h-auto mx-auto"
              src="/assets/images/about-image.webp"
              width={589}
              height={643}
              alt="images"
            />
            <Image
              className="absolute bottom-[126px] -right-[49px] -z-10"
              src="/assets/logo/logo-gray-landing.svg"
              width={114}
              height={114}
              alt="AskIoT"
            />
            <Image
              className="absolute top-9 -left-8 -z-10"
              src="/assets/logo/logo-gray-landing.svg"
              width={76}
              height={76}
              alt="AskIoT"
            />
          </div>
          <Link className="text-gray-500 text-base mt-3 text-center" href="/">
            Try it live now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
