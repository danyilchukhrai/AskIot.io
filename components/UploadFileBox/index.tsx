import { toBase64 } from '@/helpers/common';
import clsx from 'clsx';
import { ChangeEvent, FC, useState } from 'react';
import { CustomImg } from '../CustomImage';

interface IUploadFileBoxProps {
  accept?: string;
  onSelectFile?: (file: File) => void;
  errorMessage?: string;
  url?: string;
  onRemoveImage?: () => void;
}

const UploadFileBox: FC<IUploadFileBoxProps> = ({
  accept,
  onSelectFile,
  errorMessage = '',
  url = '',
  onRemoveImage,
}) => {
  const [localUrl, setLocalUrl] = useState('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    const baseUrl = await toBase64(file);
    onSelectFile && onSelectFile(file);
    setLocalUrl(baseUrl);
  };

  const handleRemoveImage = () => {
    localUrl && setLocalUrl('');
    onRemoveImage && onRemoveImage();
  };

  return (
    <div>
      {url || localUrl ? (
        <div className="rounded-lg border border-dashed border-[rgba(0,0,0,0.30)] p-4 flex items-center justify-center">
          <div className="relative w-fit">
            <CustomImg className="max-w-60 max-h-60" src={url || localUrl} />
            <div
              className="rounded-full w-5 h-5 bg-black flex items-center justify-center text-white text-s cursor-pointer absolute top-2 right-2"
              onClick={handleRemoveImage}
            >
              &#x2715;
            </div>
          </div>
        </div>
      ) : (
        <>
          <input
            className="opacity-0"
            id="upload-file"
            type="file"
            accept={accept}
            onChange={handleFileChange}
          />
          <label
            className={clsx(
              'text-base flex items-center justify-center h-20 w-full hover:cursor-pointer text-center rounded-lg border border-dashed border-[rgba(0,0,0,0.30)] text-gray-500',
            )}
            htmlFor="upload-file"
          >
            Upload image here.
          </label>
          {errorMessage && <p className="text-red-500 text-s mt-2 error-msg">{errorMessage}</p>}
        </>
      )}
    </div>
  );
};

export default UploadFileBox;
