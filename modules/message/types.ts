import { IProduct } from '../iot-gpt/type';

export interface IFirstPanelMessage {
  message_id: number;
  messagecontent: string;
  timestamp: string;
  isread: boolean;
  quote_id: number;
  sender_first_name: null | string;
  sender_last_name: null | string;
  receiver_first_name: string;
  receiver_last_name: string;
  vendorlogo: string;
  senderid: string;
  receiverid: string;
  sendername: string;
  vendorname: string;
}

export interface ISecondPanelMessage {
  message_id: number;
  messagecontent: string;
  timestamp: string;
  isread: boolean;
  quote_id: number;
  sender_first_name: string;
  sender_last_name: string;
  receiver_first_name: null | string;
  receiver_last_name: null | string;
  sender_id: string;
  receiver_id: string;
  vendorname: string;
  vendorlogo: string;
  logo: string;
}

export interface IThirdPanelMessage {
  quote_id: number;
  requestor_user_id: string;
  vendor_user_id: string;
  product_id: number;
  type: string;
  vendorid: number;
  quantity: number;
  offered_price: string;
  alternative_product_id: null | string;
  alternative_price: null | string;
  status: string;
  created_at: string;
  updated_at: string;
  requested_by_date: string;
  message_content: string;
  productDetails: {
    vendorid: number;
    product_name: string;
    product_description: string;
    product_details: string[];
    product_image: null | string;
    slug: string;
    category: string;
    Product: IProduct[];
  };
}

export interface IGetAllMessagesResponse {
  firstPanel: IFirstPanelMessage[];
  secondPanel: ISecondPanelMessage[];
  thirdPanel: IThirdPanelMessage;
}

export interface INewMessageBody {
  senderId: string;
  receiverId: string;
  messageContent: string;
  quoteId: number;
}
