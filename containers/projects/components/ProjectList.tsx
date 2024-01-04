'use-client';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useGetAllProjects } from '@/modules/projects/hooks';
import { get } from 'lodash';
import Image from 'next/image';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';

interface IProjectListProps extends React.HTMLProps<HTMLDivElement> {}

const ProjectList: React.FunctionComponent<IProjectListProps> = (props) => {
  const { data: projects = [], isLoading } = useGetAllProjects();
  const router = useRouter();

  if (isLoading) return <LoadingIndicator />;

  return (
    <div {...props}>
      {projects.length ? (
        <ul className="flex flex-wrap gap-4">
          {projects.map((it, index) => {
            return (
              <li
                className="w-[227px] cursor-pointer"
                key={it.project_id}
                onClick={() => router?.push(`${RESTRICTED_APP_ROUTES.PROJECTS}/${it?.project_id}`)}
              >
                <div className="random-cover w-full h-[218px] object-cover rounded-xl">
                  <Image
                    src={it?.cover_image || '/assets/images/default-vendor.png'}
                    height={218}
                    width={227}
                    alt=""
                    className="object-cover rounded-xl"
                  />
                </div>
                <p className="text-black text-base font-medium mt-3 break-words">{it.name}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600">Empty</p>
      )}
    </div>
  );
};

export default ProjectList;
