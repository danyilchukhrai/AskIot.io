import clsx from 'clsx';
import { ChangeEvent, FC, useState } from 'react';

interface IUploadFileBoxProps {
  accept?: string;
  onSelectFile?: (file: File) => void;
  errorMessage?: string;
  url?: string;
}

const UploadFileBox: FC<IUploadFileBoxProps> = ({
  accept,
  onSelectFile,
  errorMessage = '',
  url = '',
}) => {
  const [file, setFile] = useState<File>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    setFile(file);
    onSelectFile && onSelectFile(file);
  };

  return (
    <div>
      <input
        className="opacity-0"
        id="upload-file"
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />
      <label
        className={clsx(
          ' text-base flex items-center justify-center h-20 w-full hover:cursor-pointer text-center rounded-lg border border-dashed border-[rgba(0,0,0,0.30)]',
          file?.name || url ? 'text-gray-1000' : 'text-gray-500',
        )}
        htmlFor="upload-file"
      >
        {file?.name ? file?.name : url ? url : 'Upload image here.'}
      </label>
      {errorMessage && <p className="text-red-500 text-s mt-2 error-msg">{errorMessage}</p>}
    </div>
  );
};

export default UploadFileBox;
