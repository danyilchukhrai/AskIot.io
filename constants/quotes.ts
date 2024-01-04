export enum REQUEST_QUOTE_TAB_KEYS {
  Overview,
  Activity,
}

export enum QUOTE_DETAIL_TAB_KEYS {
  Overview,
  Messages,
  Activity,
}

export enum QUOTE_TAB_KEYS {
  All,
  Requested,
  VendorResponded,
  Rejected,
  Accepted,
}

export enum QUOTE_STATUS {
  Requested = 'quote_requested',
  VendorResponded = 'vendor_responded',
  Rejected = 'vendor_rejected',
  Accepted = 'user_accepted',
}

export const colorByStatus = {
  [QUOTE_STATUS.Requested]: 'blue',
  [QUOTE_STATUS.Rejected]: 'red',
  [QUOTE_STATUS.Accepted]: 'green',
  [QUOTE_STATUS.VendorResponded]: 'orange',
};
