import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import { FC, useEffect, useState } from 'react';
import { trainBot } from '@/modules/bots/services';
import FileUpload from '@/containers/bot/components/FileUpload';
import Table from './Table';
import { getTrainedData, removeTrainedData } from '@/modules/bots/services';
import BackButton from '@/components/BackButton';
import { ITrainData } from '@/modules/bots/types';

interface ITrainBotProps {
}

const TrainBot: FC<ITrainBotProps> = ({ }) => {
  const fileTypes = ["PDF", "pdf"];
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [trainedList, setTrainedList] = useState<ITrainData[]>([]);

  const onHandleNext = async () => {
    setIsLoading(true);
    const response: any = await trainBot(files);
    setTrainedList(response.data);
    setIsLoading(false);
  }

  const initialize = async () => {
    setIsLoading(true);
    const response: any = await getTrainedData('accsesToken');
    setTrainedList(response);
    setIsLoading(false);
  }

  const removeFile = async (data: ITrainData) => {
    setIsLoading(true);

    const newTrainData: ITrainData[] = [];
    for (const trainData of trainedList) {
      if (data.uri !== trainData.uri) {
        newTrainData.push(trainData);
        // Back-end call to remove the train data.
        await removeTrainedData('accessToken', data.uri);
        // ********* //
      }
    }
    setTrainedList(newTrainData);
  
    setIsLoading(false);
  }

  const onUpload = async () => {
    setIsLoading(true);

    const result: any = await trainBot(files);
    console.log('onUpload', result)

    for(const data of result.data) {
      trainedList.push(data);
    }

    setFiles([]);

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
