import { FC, useEffect, useState } from 'react';
import QuoteDetail from './components/QuoteDetail';
import Spinner from '@/components/Spinner';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { API_ENDPOINT } from '@/configs/appConfig';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

interface IQuoteDetailContainerProps {}

const QuoteDetailContainer: FC<IQuoteDetailContainerProps> = (props) => {
  const [quotesDetails, setQuoteDetails] = useState<any>(null);
  const [isQuotesDetailsLoading, setIsQuoteDetailsLoading] = useState(true);
  const params = useParams();
  const getQuoteDetails = async () => {
    try {
      const quoteDetailsData = await askIOTApiFetch(`${API_ENDPOINT}/private/quotes/${params?.id}`);
      setQuoteDetails(quoteDetailsData);
      setIsQuoteDetailsLoading(false);
    } catch (error: any) {
      const errorData = await error?.json();
      setIsQuoteDetailsLoading(false);
      toast.error(errorData?.error || 'Failed to get quote details');
    }
  };

  useEffect(() => {
    getQuoteDetails();
  }, []); //eslint-disable-line

  return (
    <>
      {isQuotesDetailsLoading ? (
        <div className="fixed top-[50%] left-[50%] md:left-[60%] -translate-y-2/4 -translate-x-2/4">
          <Spinner />
        </div>
      ) : (
        <QuoteDetail quoteDetails={quotesDetails} />
      )}
    </>
  );
};

export default QuoteDetailContainer;
