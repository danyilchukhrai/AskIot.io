import LoadingIndicator from '@/components/LoadingIndicator';
import * as React from 'react';

interface ILoadingProps {}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  return <LoadingIndicator />;
};

export default Loading;
