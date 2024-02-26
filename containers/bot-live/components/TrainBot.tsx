import { useEffect, useState } from 'react';
import FileUpload from '@/containers/bot/components/FileUpload';
import Table from './Table';
import { getTrainedData, removeTrainedData, uploadFiles, processUploads } from '@/modules/bots/services';
import BackButton from '@/components/BackButton';
import { ITrainData } from '@/modules/bots/types';
import { IFile } from '@/modules/bots/types';
import { toast } from 'react-toastify';

import LoadingIndicator from '@/components/LoadingIndicator';
import Button from '@/components/Button';

const TrainBot = () => {
  const fileTypes = ["PDF", "pdf"];
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [trainedList, setTrainedList] = useState<ITrainData[]>([]);

  const initialize = async () => {
    setIsLoading(true);
    const response = await getTrainedData();
    setTrainedList(response);
    setIsLoading(false);
  };

  const removeFile = async (data: ITrainData) => {
    setIsLoading(true);
    try {
      const result = await removeTrainedData(data.file_id);
      
      // Check if result is not null before accessing message property
      if (result && result.message) {
        const successMessage = result.message;
        toast.success(successMessage);
      } else {
        // If result is null, you can either throw an error or show a default success message
        toast.success('File removed successfully.');
      }
  
      const response = await getTrainedData();
      setTrainedList(response);
    } catch (e) {
      console.error('removeFile error : ', e);
      toast.error('Failed to remove the file.'); // Show error toast if something goes wrong
    }
    setIsLoading(false);
  };
  

  const onUpload = async () => {
    setIsLoading(true);
    try {
      const data = await uploadFiles(files);
      await processUploads(data);
      const response = await getTrainedData();
      setTrainedList(response);
      setFiles([]);
    } catch (e) {
      console.error('onUpload error', e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="container mx-auto p-12 pt-16">
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload your files for training </h1>
      <FileUpload files={files} setFiles={setFiles} type={fileTypes} />
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onUpload}>
        Upload
      </Button>
      <Table rows={trainedList} removeFile={removeFile} />
    </div>
  );
};

export default TrainBot;

