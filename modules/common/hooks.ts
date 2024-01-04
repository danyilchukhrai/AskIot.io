import { useMutation } from '@tanstack/react-query';
import { uploadFile } from './services';

export const useUploadFile = () =>
  useMutation({
    mutationFn: uploadFile,
  });
