import LoadingIndicator from '@/components/LoadingIndicator';
import Modal, { IModalElement } from '@/components/Modal';
import { handleShowError } from '@/helpers/common';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useCreateQuotes } from '@/modules/quotes/hooks';
import { IRequestQuoteForm } from '@/modules/quotes/types';
import { requestQuoteSchema } from '@/validations/quotes';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AddToQuote from './AddToQuote';
import AddToQuoteMobile from './AddToQuoteMobile';

interface IRequestQuoteModalProps {
  product?: any;
  onSuccess?: (quoteId?: number) => void;
  onClose?: () => void;
}

export interface IRequestQuoteModalElement {
  open: () => void;
  close: () => void;
}

const RequestQuoteModal = forwardRef<IRequestQuoteModalElement, IRequestQuoteModalProps>(
  ({ product, onSuccess, onClose }, ref) => {
    const modalRef = useRef<IModalElement>(null);
    const [openAddToQuoteMobile, setOpenAddToQuoteMobile] = useState(false);
    const form = useForm<IRequestQuoteForm>({
      defaultValues: {
        notes: '',
      },
      resolver: yupResolver(requestQuoteSchema),
    });
    const { mutate: createQuotes, isPending } = useCreateQuotes();
    const isMobileMatches = useMediaQuery('(max-width: 767px)');

    useEffect(() => {
      if (product) {
        form.setValue('productId', product?.id);
        form.setValue('type', product?.type);
        form.setValue('vendorId', product?.vendorid);
        form?.setValue('type', product?.type);
      }
    }, [product]); //eslint-disable-line

    useEffect(() => {
      if (isMobileMatches) {
        modalRef.current?.close();
      } else {
        openAddToQuoteMobile && setOpenAddToQuoteMobile(false);
      }
    }, [isMobileMatches]); //eslint-disable-line

    useImperativeHandle(ref, () => ({
      open: () => {
        isMobileMatches ? setOpenAddToQuoteMobile(true) : modalRef.current?.open();
      },
      close: () => {
        isMobileMatches ? setOpenAddToQuoteMobile(false) : modalRef.current?.close();
      },
    }));

    const handleAddToQuote = (data: IRequestQuoteForm) => {
      createQuotes(
        { item: data },
        {
          onSuccess: ({ message, quoteId }) => {
            if (onSuccess) {
              onSuccess(quoteId);
            } else {
              toast.success(message);
            }
            isMobileMatches ? setOpenAddToQuoteMobile(false) : modalRef.current?.close();
          },
          onError: handleShowError,
        },
      );
    };

    return (
      <>
        <Modal
          ref={modalRef}
          title="Request quote"
          primaryButtonLabel="Request Quote"
          onSubmit={form.handleSubmit(handleAddToQuote)}
          onClose={onClose}
        >
          <FormProvider {...form}>
            <AddToQuote product={product} />
          </FormProvider>
        </Modal>
        {isPending && <LoadingIndicator />}
        {openAddToQuoteMobile && (
          <FormProvider {...form}>
            <AddToQuoteMobile
              product={product}
              onSubmit={form.handleSubmit(handleAddToQuote)}
              onClose={() => {
                setOpenAddToQuoteMobile(false);
                onClose && onClose();
              }}
            />
          </FormProvider>
        )}
      </>
    );
  },
);

export default RequestQuoteModal;
