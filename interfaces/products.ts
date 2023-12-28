export interface IMessage {
  isCurrentUser: boolean;
  createdAt: number;
  content: string;
  senderImage?: string;
  products?: IProduct[];
}

export interface ISearchItem {
  id?: string;
  title?: string;
  createdAt?: string;
  messages?: IMessage[];
  firstMessage?: string;
}

export interface IMessageData {
  searchId: string;
  data: IMessage[];
}

export interface IProduct {
  id: string;
  name: string;
  ref: string;
  description: string;
  manufacturer: {
    id: string;
    name: string;
    image: string;
    overview: string;
  };
  image: string;
  overview: string;
  technicalSpecification: {
    color: string;
    width: string;
    height: string;
    voltage: string;
  };
  quantity?: number;
  unitPrice?: number;
  noteFromVendor?: string;
  isSuggested?: boolean;
}
