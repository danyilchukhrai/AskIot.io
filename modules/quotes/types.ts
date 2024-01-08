export interface IRequestQuoteForm {
  quantity: number;
  notes?: string;
  productId?: number;
  vendorId?: number;
  type?: string;
  requestedByDate: Date;
}

export interface IQuoteVerificationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website?: string;
}

export interface ICreateQuotesBody {
  item: IRequestQuoteForm;
}

export interface ICreateQuotesSuccess {
  message: string;
  quoteId: number;
}
