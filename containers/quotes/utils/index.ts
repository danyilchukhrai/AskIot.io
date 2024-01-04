export const quoteTypes = [
  { key: 'quote_requested', value: 'Requested' },
  { key: 'vendor_responded', value: 'Vendor Responded' },
  { key: 'vendor_rejected', value: 'Rejected' },
  { key: 'user_accepted', value: 'User Accepted' },
];

export const getQuoteStatus = (statusKey: string) => {
  return quoteTypes?.find((item) => item?.key === statusKey)?.value;
};
