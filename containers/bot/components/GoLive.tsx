import Button from '@/components/Button';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import {RESTRICTED_APP_ROUTES } from '@/constants/routes';
import BotAlert from '@/components/BotAlert';

interface IGoLiveProps {
  onBackStep: () => void;
}

const GoLive: FC<IGoLiveProps> = ({ onBackStep }) => {
  const router = useRouter();

  const [uri, setUri] = useState<string>("https://ask-iot-chatbot.vercel.app?api_key=Inljc3NlY2pmbW9heWpob211Z2JpIiwicm9sZSI6ImFub");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(uri);

      setAlertMessage('Successfully copies text to clipboard!');
      setAlert(true);
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('uri', uri);
    router.push(`${RESTRICTED_APP_ROUTES.BOT_LIVE}`);
  }

  return (
    <>
      <div className="md:mt-[48px] mt-12 flex flex-col items-center">
        <div className="md:max-w-[669px] max-w-[100%] flex flex-col gap-5 items-center mx-auto">
          <p className="text-gray-1000 text-l text-center">
            Embed chatbot
          </p>
          <div className="flex w-full flex-col gap-5 py-[20px] px-[10px] items-start rounded-[8px] border border-solid border-green-200 bg-green-100">
            <p className="text-[#37B24D] font-inter text-[13px] font-normal leading-[16px]">
              Your chatbot is ready now
            </p>
            <p className="text-[#37B24D] font-inter text-[13px] font-normal leading-[16px]">
              Your chatbot is published now and ready to be shared with the world! Copy this link to share your chatbot
              on social media, messaging app or via email.
            </p>
            <p className="text-[#000] font-inter text-[13px] font-normal leading-[16px] cursor-pointer">
              Try Demo
            </p>
          </div>

          <div className='section-embeded w-full'>
            <p className='text-[#000] text-[16px] font-inter font-normal leading-6 w-full'>Embed your chatbot on website</p>
            <p className='text-[#ADB5BD] text-[14px] font-inter font-normal leading-6 mb-[6px] w-full'>Embed your chatbot on website</p>
            <div className='mt-[11px] flex'>
              <Input
                name="liveUri"
                className="md:w-[343px] w-full"
                placeholder="This is live Uri"
                value={uri}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                }}
              />
              <div className="flex py-[10px] px-[12px] justify-center items-center rounded-[8px] bg-blue-600 shadow-box cursor-pointer ml-[12px]" onClick={handleCopyClick}>
                <p className="text-[#F8F9FA] font-inter text-[14px] leading-[20px]">
                  Copy
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex items-center justify-between w-[670px] mt-5`}>
          <Button className="bg-gray" variant="secondary" onClick={onBackStep}>
            Previous
          </Button>
          <Button onClick={() => { handleFinish() }} >Finish</Button>
        </div>
        <BotAlert message={alertMessage} show={alert} setShow={setAlert} />
      </div>
    </>
  );
};

export default GoLive;
