import Button from '@/components/Button';
import ProductList from '@/containers/iotgpt/components/ProductList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IProjectListingProps {
  projectDetails: any;
}

const ProjectListings: FC<IProjectListingProps> = ({ projectDetails }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="request-quote-container md:p-8 p-4 min-h-screen flex flex-col">
      <div className="header flex items-center gap-5 mb-6">
        <Button className="flex" variant="secondary" onClick={handleBack}>
          <Image src="/assets/icons/arrow-left-icon.svg" alt="arrow left" width={20} height={20} />
          <span className="ml-2.5">Back</span>
        </Button>
        <p className="text-base font-medium">{projectDetails?.name}</p>
      </div>
      {projectDetails?.products ? (
        <ProductList
          products={projectDetails?.products}
          hideActionButtons
          disabledOnClickProductEvent
        />
      ) : (
        <p className="w-full h-full flex-1 flex justify-center items-center self-center">
          Not found!
        </p>
      )}
    </div>
  );
};

export default ProjectListings;
