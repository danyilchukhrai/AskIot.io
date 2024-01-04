'use client';

import { USER_TYPE } from '@/configs/routeConfig';
import { withAuth } from '@/helpers/withAuth';
import dynamic from 'next/dynamic';

const ProjectDetail = dynamic(() => import('@/containers/project-detail'));

const ProjectsPage = () => {
  return <ProjectDetail />;
};

export default withAuth(ProjectsPage)([USER_TYPE.USER]);
