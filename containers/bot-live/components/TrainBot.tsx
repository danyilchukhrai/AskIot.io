import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import { FC, useEffect, useState } from 'react';
import FileUpload from '@/containers/bot/components/FileUpload';
import Table from './Table';
import { getTrainedData, removeTrainedData, uploadFiles, processUploads } from '@/modules/bots/services';
import BackButton from '@/components/BackButton';
import { ITrainData } from '@/modules/bots/types';
import { IFile } from '@/modules/bots/types';

interface ITrainBotProps {
}

const TrainBot: FC<ITrainBotProps> = ({ }) => {
  const fileTypes = ["PDF", "pdf"];
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [trainedList, setTrainedList] = useState<ITrainData[]>([]);


  const initialize = async () => {
    setIsLoading(true);
    const response: any = await getTrainedData();
    setTrainedList(response);
    setIsLoading(false);
  }

  const removeFile = async (data: ITrainData) => {
    setIsLoading(true);

    try {
      await removeTrainedData(data.file_id);

      const response: any = await getTrainedData();
      setTrainedList(response);
    } catch (e) {
      console.log('removeFile error : ', e)
    }

    setIsLoading(false);
  }

  const onUpload = async () => {
    setIsLoading(true);

    try {
      const data: IFile[] = await uploadFiles(files);
      await processUploads(data);

      const response: any = await getTrainedData();
      setTrainedList(response);

      setFiles([]);
    } catch (e) {
      console.log('onUpload error', e);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    initialize();
  }, [])

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      <div className="md:mt-[48px] p-12 mt-12 flex flex-col items-center">
        <div className="header flex items-center justify-between mb-5 w-full">
          <BackButton />
        </div>
        <div className="flex flex-col items-center mx-auto w-full">
          <p className="text-gray-1000 text-l text-center mb-5">
            Train the Bot
          </p>
          <Table rows={trainedList} removeFile={removeFile} />
          <div className='class="flex flex-col items-center mx-auto'>
            <FileUpload files={files} setFiles={setFiles} type={fileTypes} />
          </div>
          <Button className='mt-5' onClick={() => { onUpload() }}>Upload</Button>
        </div>
      </div>
    </>
  );
};

export default TrainBot;
