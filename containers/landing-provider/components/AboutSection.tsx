'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import { FC } from 'react';
import { AUTH_ROUTES } from '@/constants/routes';


interface IAboutSectionProps {
  onBookDemoClick: () => void; 
}

const AboutSection: FC<IAboutSectionProps> = ({ onBookDemoClick }) => {
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
            Boost your IoT business with <span className="text-primary-500">askIoT</span>
          </p>
          <p className="text-blueGray-800 text-2xl md:text-3xl font-medium text-center pt-[15px] pb-10 max-w-[583px] mx-auto">
            Stop wasting money on Google ads. askIoT delivers verified leads.
          </p>

          <div className="bg-white p-4 shadow-md rounded-lg mx-auto max-w-4xl">
            <ul className="flex flex-wrap justify-center items-center gap-4 text-center text-blue-600">
              <li className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full p-2">
                  <svg
                    width="10pt"
                    height="10pt"
                    version="1.1"
                    viewBox="0 0 1200 1200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#1f4dbb">
                      <path d="m600 30c-314.3 0-570 255.7-570 570s255.7 570 570 570 570-255.7 570-570-255.7-570-570-570zm0 1080c-281.21 0-510-228.79-510-510s228.79-510 510-510 510 228.79 510 510-228.79 510-510 510z" />
                      <path d="m890.88 362.79-410.79 410.79-170.98-170.96c-11.719-11.719-30.703-11.719-42.422 0s-11.719 30.715 0 42.422l192.19 192.18c5.8594 5.8594 13.535 8.7891 21.211 8.7891s15.352-2.9297 21.211-8.7891l432-432c11.719-11.719 11.719-30.703 0-42.422s-30.703-11.719-42.422 0z" />
                    </g>
                  </svg>
                </span>
                Whiteglove onboarding
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 rounded-full p-2">
                  <svg
                    width="10pt"
                    height="10pt"
                    version="1.1"
                    viewBox="0 0 1200 1200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#1f4dbb">
                      <path d="m600 30c-314.3 0-570 255.7-570 570s255.7 570 570 570 570-255.7 570-570-255.7-570-570-570zm0 1080c-281.21 0-510-228.79-510-510s228.79-510 510-510 510 228.79 510 510-228.79 510-510 510z" />
                      <path d="m890.88 362.79-410.79 410.79-170.98-170.96c-11.719-11.719-30.703-11.719-42.422 0s-11.719 30.715 0 42.422l192.19 192.18c5.8594 5.8594 13.535 8.7891 21.211 8.7891s15.352-2.9297 21.211-8.7891l432-432c11.719-11.719 11.719-30.703 0-42.422s-30.703-11.719-42.422 0z" />
                    </g>
                  </svg>
                </span>
                30-day free trial
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 rounded-full p-2">
                  <svg
                    width="10pt"
                    height="10pt"
                    version="1.1"
                    viewBox="0 0 1200 1200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#1f4dbb">
                      <path d="m600 30c-314.3 0-570 255.7-570 570s255.7 570 570 570 570-255.7 570-570-255.7-570-570-570zm0 1080c-281.21 0-510-228.79-510-510s228.79-510 510-510 510 228.79 510 510-228.79 510-510 510z" />
                      <path d="m890.88 362.79-410.79 410.79-170.98-170.96c-11.719-11.719-30.703-11.719-42.422 0s-11.719 30.715 0 42.422l192.19 192.18c5.8594 5.8594 13.535 8.7891 21.211 8.7891s15.352-2.9297 21.211-8.7891l432-432c11.719-11.719 11.719-30.703 0-42.422s-30.703-11.719-42.422 0z" />
                    </g>
                  </svg>
                </span>
                Partner Leads
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 rounded-full p-2">
                  <svg
                    width="10pt"
                    height="10pt"
                    version="1.1"
                    viewBox="0 0 1200 1200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#1f4dbb">
                      <path d="m600 30c-314.3 0-570 255.7-570 570s255.7 570 570 570 570-255.7 570-570-255.7-570-570-570zm0 1080c-281.21 0-510-228.79-510-510s228.79-510 510-510 510 228.79 510 510-228.79 510-510 510z" />
                      <path d="m890.88 362.79-410.79 410.79-170.98-170.96c-11.719-11.719-30.703-11.719-42.422 0s-11.719 30.715 0 42.422l192.19 192.18c5.8594 5.8594 13.535 8.7891 21.211 8.7891s15.352-2.9297 21.211-8.7891l432-432c11.719-11.719 11.719-30.703 0-42.422s-30.703-11.719-42.422 0z" />
                    </g>
                  </svg>
                </span>
                AI Chatbot on your website
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 rounded-full p-2">
                  <svg
                    width="10pt"
                    height="10pt"
                    version="1.1"
                    viewBox="0 0 1200 1200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#1f4dbb">
                      <path d="m600 30c-314.3 0-570 255.7-570 570s255.7 570 570 570 570-255.7 570-570-255.7-570-570-570zm0 1080c-281.21 0-510-228.79-510-510s228.79-510 510-510 510 228.79 510 510-228.79 510-510 510z" />
                      <path d="m890.88 362.79-410.79 410.79-170.98-170.96c-11.719-11.719-30.703-11.719-42.422 0s-11.719 30.715 0 42.422l192.19 192.18c5.8594 5.8594 13.535 8.7891 21.211 8.7891s15.352-2.9297 21.211-8.7891l432-432c11.719-11.719 11.719-30.703 0-42.422s-30.703-11.719-42.422 0z" />
                    </g>
                  </svg>
                </span>
                Cancel anytime
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            {/* Existing 'Grow your business' button */}
            <Button link={AUTH_ROUTES.SIGN_UP} >Grow your business</Button>
            
            {/* New 'Book a Demo' button */}
            <Button 
             onClick={onBookDemoClick}>
              Book a demo today
            </Button>
          </div>
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
