import {
  DUMMY_CHANNEL_MESSAGES,
  DUMMY_PRODUCT_LIST,
  DUMMY_QUOTES,
  DUMMY_VENDORS,
} from '@/constants/dummy';
import { IMessage, IProduct } from '@/interfaces/products';
import { IVendor } from '@/interfaces/vendor';
import { get } from 'lodash';
import { getLocalStorage, setLocalStorage } from './local-storage';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { IThreadInteraction } from '@/modules/iot-gpt/type';

export const AIResponse = (id: number, content: string): Promise<IThreadInteraction> => {
  const defaultContent = 'Sure, here’s a list of devices that are best suited for tank monitoring';

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id,
        ai: defaultContent,
        user: content,
        keywords: content,
      });
    }, 2000);
  });
};

export const getProductList = (): Promise<IProduct[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(DUMMY_PRODUCT_LIST);
    }, 0);
  });
};

export const getProductById = (id: string): Promise<IProduct> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = DUMMY_PRODUCT_LIST.find((item) => item.id === id);
      if (product) {
        resolve(product);
      } else {
        reject('Not found!');
      }
    }, 0);
  });
};

export const getQuotes = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(DUMMY_QUOTES);
    });
  });
};

export const getMessagesByChannelId = (channelId: string): Promise<IMessage[] | undefined> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const channelMessage = DUMMY_CHANNEL_MESSAGES.find((item) => item.channelId === channelId);
      resolve(channelMessage?.data);
    }, 0);
  });
};

export const getVendor = (params: { id?: string; name?: string }): Promise<IVendor> => {
  const { id = '', name = '' } = params || {};
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const vendor = DUMMY_VENDORS.find(
        (item) => item?.id === id || item?.name?.toLowerCase() === name?.toLocaleLowerCase(),
      );
      if (vendor) {
        resolve(vendor);
      } else {
        reject('Not found!');
      }
    }, 0);
  });
};

export const getProjects = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const projects = getLocalStorage(LOCAL_STORAGE_KEYS.PROJECTS);
      resolve(projects || []);
    }, 0);
  });
};

export const createProject = async (name: string) => {
  const projects = await getProjects();
  if (!projects?.map((it) => it?.toLowerCase()).includes(name)) {
    projects.push(name);
  }

  setLocalStorage(LOCAL_STORAGE_KEYS.PROJECTS, projects);
};
