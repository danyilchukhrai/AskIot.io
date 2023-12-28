import Button from '@/components/Button';
import LoadingIndicator from '@/components/LoadingIndicator';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { trainBot } from '@/services/bot';
import FileUpload from '@/containers/bot/components/FileUpload';
import Table from '@/containers/bot/components/Table';

interface ITrainBotProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

enum CHILD_STEP {
  UPLOAD_FILES,
  REVIEW_TRAIN,
}

const TrainBot: FC<ITrainBotProps> = ({ onBackStep, onNextStep }) => {
  const fileTypes = ["TXT", "MB", "JSON"];
  const [childStep, setChildStep] = useState(CHILD_STEP.UPLOAD_FILES);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [trainedResult, setTrainedResult] = useState<any[]>([]);

  const form = useFormContext();

  const vendorName = form.getValues('vendorname');

  const onHandleNext = async () => {
    setIsLoading(true);
    if (childStep === CHILD_STEP.UPLOAD_FILES) {
      if (files.length > 0) {
        const response: any = await trainBot(files);
        setTrainedResult(response.data);
        setChildStep(CHILD_STEP.REVIEW_TRAIN);
      }
    } else if (childStep === CHILD_STEP.REVIEW_TRAIN) {
      onNextStep();
    }
    setIsLoading(false);
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

        <div className="flex items-center justify-between mt-6">
          <Button onClick={onHandleNext}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default TrainBot;
