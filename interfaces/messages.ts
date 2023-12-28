import { IMessage } from './products';

export interface IChatChannel {
  id: string;
  image: string;
  title: string;
  lastMessage: IMessage;
  isUnread: boolean;
  description?: string;
}
