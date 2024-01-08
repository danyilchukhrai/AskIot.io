import { COMMON_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';

export const uploadFile = async ({ file, type }: { file: File; type: string }) => {
  const sasResponse = await getSASToken(type);
  const { uri, sasToken } = sasResponse || {};
  const url = `${uri}?${sasToken}`;
  // const base64File: any = await toBase64(file);

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': file.type,
    },
    body: file,
  });

  // Temp
  return uri;
};

export const getSASToken = async (type: string): Promise<{ uri: string; sasToken: string }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data: {
      type,
    },
    url: COMMON_API.getSASToken.api,
  });

  return result.data;
};
