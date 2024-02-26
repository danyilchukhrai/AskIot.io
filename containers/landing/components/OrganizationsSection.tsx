import Image from 'next/image';
import { FC } from 'react';

interface IOrganizationsSectionProps {}

const OrganizationsSection: FC<IOrganizationsSectionProps> = (props) => {
  return (
    <section className="organizations-section md:pt-[117px] pt-15">
      <div className="container flex flex-col justify-center">
        <p className="text-gray-500 text-3xl pb-[57px] text-center">
          Trusted by builders from 
        </p>
        <div className="ml-30"> {/* Adjust ml-10 to whatever margin you want */}
  <Image
    src="/assets/images/builders.png"
    width={902}
    height={126}
    alt="Organizations"
  />
</div>
      </div>
    </section>
  );
};

export default OrganizationsSection;
