'use client';
import Button from '@/components/Button';
import { useQuoteSnippetContext } from '@/providers/QuotesSnippetsProvider';
import { useUserContext } from '@/providers/UserProvider';
import { FC } from 'react';

interface IRequestQuoteButton {
  requestQuoteHandler: () => void;
  product: any;
}

const RequestQuoteButton: FC<IRequestQuoteButton> = ({ requestQuoteHandler, product }) => {
  const { isQuoteRequested, quotesSnippetsLoading, isQuoteRequestedLoading } =
    useQuoteSnippetContext();
  const { askIOTUserDetails } = useUserContext();
  const productId = product?.product_id || product?.id;

  return (
    <>
      {isQuoteRequested?.[productId] ? (
        <Button disabled>Quote Requested</Button>
      ) : (
        <>
          {askIOTUserDetails && (
            <>
              {quotesSnippetsLoading || isQuoteRequestedLoading ? (
                <Button className="h-fit" disabled>
                  Please wait...
                </Button>
              ) : (
                <Button className="h-fit" onClick={() => requestQuoteHandler()}>
                  Request Quote
                </Button>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default RequestQuoteButton;
