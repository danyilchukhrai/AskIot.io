import { FC } from 'react';
import Alert from '../Alert';
import { useRouter } from 'next/navigation';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import clsx from 'clsx';
import { IQuoteDetails } from '@/interfaces/quotes';

interface IQuoteRequestedAlert {
  drawerIsValid?: boolean;
  quote_id: number | undefined;
}

const QuoteRequestedAlert: FC<IQuoteRequestedAlert> = ({ drawerIsValid = false, quote_id }) => {
  const router = useRouter();
  const handleOpenQuote = () => {
    router.push(`${RESTRICTED_APP_ROUTES.QUOTES}/${quote_id}`);
  };
  return (
    <div
      className={clsx(
        'fixed z-[100] md:right-8 right-4',
        drawerIsValid ? 'bottom-[75px]' : ' bottom-8 ',
      )}
    >
      <Alert
        label={
          <span className="flex items-center md:text-base text-s">
            Quote has been requested
            <span className="inline-block w-[1px] bg-green-400 mx-4 h-5" />
            <span
              className="font-medium cursor-pointer md:text-base text-s"
              onClick={handleOpenQuote}
            >
              Open Quote
            </span>
          </span>
        }
      />
    </div>
  );
};

export default QuoteRequestedAlert;
