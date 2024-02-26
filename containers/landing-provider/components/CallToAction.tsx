import React from "react";
import Button from '@/components/Button';
import { AUTH_ROUTES } from '@/constants/routes';


const CallToAction = () => {
    return (
      <section className="bg-white py-8 dark:bg-gray-100 lg:py-12">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-1/4 px-4 text-black">
            <span className="mb-4 block text-base font-medium">
              Leads right where you need them
            </span>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              <span className="block">Get started Today</span>
            </h2>
            {/* Center the button on all screen sizes */}
            <div className="mt-4 flex justify-center lg:justify-start">
              <Button link={AUTH_ROUTES.SIGN_UP}>Start Today</Button>
            </div>
          </div>
          <div className="w-full lg:w-3/4 px-4">
            <img 
              src="/assets/images/askiot-integrations-providers-homepage.png" 
              alt="Integration options" 
              className="w-full h-auto"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </section>
    );
  };
  
export default CallToAction;

