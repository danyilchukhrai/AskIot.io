import { FC } from 'react';
import RequestQuote from './components/RequestQuote';

interface IQuotesProps {}

const Quotes: FC<IQuotesProps> = (props) => {
  return <RequestQuote />;
};

export default Quotes;
