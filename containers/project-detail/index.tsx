'use-client';
import Spinner from '@/components/Spinner';
import { API_ENDPOINT } from '@/configs/appConfig';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProjectListings from './components/ProjectListings';

const ProjectDetail: FC = () => {
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [isProjectDetailsLoading, setIsProjectDetailsLoading] = useState(true);
  const params = useParams();
  const getProjectDetails = async () => {
    try {
      const projectDetailsData = await askIOTApiFetch(
        `${API_ENDPOINT}/private/projects/${params?.id}`,
      );
      setProjectDetails(projectDetailsData);
      setIsProjectDetailsLoading(false);
    } catch (error: any) {
      const errorData = await error?.json();
      setIsProjectDetailsLoading(false);
      toast.error(errorData?.error || 'Failed to get quote details');
    }
  };
  useEffect(() => {
    getProjectDetails();
  }, []); //eslint-disable-line
  
  return (
    <>
      {isProjectDetailsLoading ? (
        <div className="fixed top-[50%] left-[50%] md:left-[60%] -translate-y-2/4 -translate-x-2/4">
          <Spinner />
        </div>
      ) : (
        <ProjectListings projectDetails={projectDetails?.[0]} />
      )}
    </>
  );
};

export default ProjectDetail;
