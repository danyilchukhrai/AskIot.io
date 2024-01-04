import { NUMBER_REGEX } from '@/constants/regex';
import { IChatQueryRecommendation, IRecommendationInfo } from '@/modules/iot-gpt/type';
import { get } from 'lodash';
import { toast } from 'react-toastify';

export const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

export const sortArray = (
  array: any[],
  options?: { sortBy?: string; isAscending?: boolean; isSortByDate?: boolean },
) => {
  const { sortBy = '', isAscending = true, isSortByDate = false } = options || {};

  return array.sort((a: any, b: any) => {
    if (!sortBy) {
      return isAscending ? a - b : b - a;
    }

    if (isSortByDate) {
      return isAscending
        ? new Date(get(a, sortBy)).getTime() - new Date(get(b, sortBy)).getTime()
        : new Date(get(b, sortBy)).getTime() - new Date(get(a, sortBy)).getTime();
    }

    return isAscending ? get(a, sortBy) - get(b, sortBy) : get(b, sortBy) - get(a, sortBy);
  });
};

export const generateProductsFromRecommendations = (recommendations?: IChatQueryRecommendation) => {
  if (!recommendations) return [];
  let result: IRecommendationInfo[] = [];
  Object.entries(recommendations).forEach(([key, value]) => {
    const products = value?.map((it) => ({
      ...it,
      recommendationType: key,
    }));

    result = [...result, ...products];
  });

  return result;
};

export const serializeObject = (object: any) => {
  const newObject: any = {};
  Object.entries(object).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      newObject[key] = value.map((item: any) => {
        if (Array.isArray(item) || item instanceof Object) {
          return serializeObject(item);
        }
        return item;
      });
    } else if (value instanceof Object) {
      newObject[key] = serializeObject(value);
    } else if (!!value || typeof value === 'boolean' || typeof value === 'number') {
      newObject[key] = value;
    }
  });
  return newObject;
};

export const handleShowError = (error: any) => {
  toast.error(error?.data?.error || 'Please try again.');
};

export const formatPhoneNumber = (value: string): string => {
  const originalValue = value.replace(/[^\d]/g, '');
  if (!value.length || !NUMBER_REGEX.test(originalValue)) return '';

  if (originalValue.length < 4) {
    return originalValue;
  } else if (originalValue.length < 7) {
    return `${originalValue.slice(0, 3)}-${originalValue.slice(3)}`;
  }

  return `${originalValue.slice(0, 3)}-${originalValue.slice(3, 6)}-${originalValue.slice(6, 10)}`;
};

export const generateSpecificationIconPath = (iconName?: string) => {
  return `/assets/icons/${iconName}.svg`;
};

export const getArrayValueFromTags = (value: string) => {
  if (!value) return [];
  try {
    return (JSON.parse(value) || [])?.map((it: any) => it?.value);
  } catch (error) {
    return value.split(', ');
  }
};

export const getMultipleValue = (array: any) => {
  return array?.map((it: any) => it?.value);
};

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = (reader?.result as string) || '';
      return resolve(result?.replace('data:', '')?.replace(/^.+,/, ''));
    };

    reader.onerror = reject;
  });
