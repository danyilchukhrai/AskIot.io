'use client';

import { FC } from 'react';

interface IHomeProps {}

const Home: FC<IHomeProps> = (props) => {
  return (
    <div className="w-full flex items-center justify-between p-8">
      <p>Hi</p>
    </div>
  );
};

export default Home;
