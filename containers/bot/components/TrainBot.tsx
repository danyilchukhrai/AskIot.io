import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { trainBot, uploadFiles, processUploads } from '@/modules/bots/services';
import FileUpload from '@/containers/bot/components/FileUpload';
import Table from '@/containers/bot/components/Table';
import { IFile } from '@/modules/bots/types';

interface ITrainBotProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

enum CHILD_STEP {
  UPLOAD_FILES,
  REVIEW_TRAIN,
}

const TrainBot: FC<ITrainBotProps> = ({ onBackStep, onNextStep }) => {
  const fileTypes = ["PDF", "pdf"];
  const [childStep, setChildStep] = useState(CHILD_STEP.UPLOAD_FILES);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [trainedResult, setTrainedResult] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const form = useFormContext();

  const vendorName = form.getValues('vendorname');

  useEffect(() => {
    if(isDisabled == false && childStep === CHILD_STEP.UPLOAD_FILES) {
      onNextStep();
    }
  }, [isDisabled])

  const onHandleNext = async () => {
    setIsLoading(true);
    if (childStep === CHILD_STEP.UPLOAD_FILES) {
      if (files.length > 0) {
        const data: IFile[] = await uploadFiles(files);
        // setTrainedResult(response.data);
        // setChildStep(CHILD_STEP.REVIEW_TRAIN);

        const result = await processUploads(data);
        setIsDisabled(false);
      }
    } else if (childStep === CHILD_STEP.REVIEW_TRAIN) {
      onNextStep();
    }
    setIsLoading(false);
  }

  const onHandleBack = () => {
    if (childStep === CHILD_STEP.UPLOAD_FILES) {
      onBackStep();
    } else {
      setFiles([]);
      setChildStep(CHILD_STEP.UPLOAD_FILES);
    }
  }

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      <div className="md:mt-[48px] mt-12 flex flex-col items-center">
        <div className="flex flex-col items-center mx-auto">
          <p className="text-gray-1000 text-l text-center mb-5">
            Train the Bot
          </p>
          {childStep === CHILD_STEP.UPLOAD_FILES && <FileUpload files={files} setFiles={setFiles} type={fileTypes} />}
          {childStep === CHILD_STEP.REVIEW_TRAIN && <Table rows={trainedResult} />}
        </div>

        <div className={`flex items-center justify-between mt-6 ${childStep === CHILD_STEP.UPLOAD_FILES ? 'w-[260px]' : 'w-[710px]'}`}>
          <Button className="bg-gray" variant="secondary" onClick={onHandleBack}>
            Previous
          </Button>
          <Button onClick={onHandleNext} >{childStep === CHILD_STEP.UPLOAD_FILES ? "Upload" : "Next"}</Button>
        </div>
      </div>
    </>
  );
};

export default TrainBot;
