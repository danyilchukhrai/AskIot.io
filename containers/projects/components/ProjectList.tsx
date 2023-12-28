import LoadingIndicator from '@/components/LoadingIndicator';
import { useGetAllProjects } from '@/modules/projects/hooks';
import { get } from 'lodash';
import * as React from 'react';

import colors from 'tailwindcss/colors';

interface IProjectListProps extends React.HTMLProps<HTMLDivElement> {}

const ProjectList: React.FunctionComponent<IProjectListProps> = (props) => {
  const { data: projects = [], isLoading } = useGetAllProjects();
  const randomColors = Object.values(colors)
    .map((it) => get(it, 500))
    .filter((it) => !!it);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div {...props}>
      {projects.length ? (
        <ul className="flex flex-wrap gap-4">
          {projects.map((it, index) => {
            const randomNumber = Math.ceil(Math.random() * randomColors.length);
            return (
              <li className="w-[227px]" key={it.project_id}>
                <div
                  className="random-cover w-full h-[218px] object-cover rounded-xl"
                  style={{
                    background: randomColors[randomNumber],
                  }}
                />
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
