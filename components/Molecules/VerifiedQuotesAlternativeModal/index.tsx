import Modal, { IModalElement } from '@/components/Modal';
import { handleShowError } from '@/helpers/common';
import { useCreateQuotes } from '@/modules/quotes/hooks';
import { IRequestQuoteForm } from '@/modules/quotes/types';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import ProductQuotes from './ProductQuotes';

interface IVerifiedQuotesAlternativeModalProps {
  products?: any;
  onSuccess?: (quoteId?: number) => void;
  onClose?: () => void;
  requestedQuoteFormData?: IRequestQuoteForm;
}

export interface IVerifiedQuotesAlternativeModalElement {
  open: () => void;
  close: () => void;
}

const VerifiedQuotesAlternativeModal = forwardRef<
  IVerifiedQuotesAlternativeModalElement,
  IVerifiedQuotesAlternativeModalProps
>(({ products = [], onSuccess, onClose, requestedQuoteFormData }, ref) => {
  const modalRef = useRef<IModalElement>(null);
  const { mutate: createQuotes, isPending } = useCreateQuotes();
  const [requestedIds, setRequestedIds] = useState<number[]>([]);

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current?.open();
    },
    close: () => {
      modalRef.current?.close();
    },
  }));

  const handleRequestQuote = (product: any) => {
    if (requestedQuoteFormData) {
      createQuotes(
        {
          item: {
            ...requestedQuoteFormData,
            productId: product?.product_id,
            type: product?.type,
            vendorId: product?.vendorid,
          },
        },
        {
          onSuccess: () => {
            setRequestedIds((prev) => [...prev, product?.product_id]);
          },
          onError: handleShowError,
        },
      );
    }
  };

  return (
    <>
      <Modal ref={modalRef} primaryButtonLabel="Request Quote" onClose={onClose} hideButtons>
        <ProductQuotes
          products={products}
          onRequestQuote={handleRequestQuote}
          isLoading={isPending}
          requestedIds={requestedIds}
        />
      </Modal>
    </>
  );
});

export default VerifiedQuotesAlternativeModal;
