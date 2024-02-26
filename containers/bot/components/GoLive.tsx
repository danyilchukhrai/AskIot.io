import Button from '@/components/Button';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
import BotAlert from '@/components/BotAlert';
import { liveBot, getVendorId, getTokenByVendorId } from '@/modules/bots/services';
import { useBotContext } from '@/providers/BotProvider';
interface IGoLiveProps {
  onBackStep: () => void;
}

const GoLive: FC<IGoLiveProps> = ({ onBackStep }) => {
  const router = useRouter();

  const [uri, setUri] = useState<string>("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { setGoLive } = useBotContext();

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(uri);

      setAlertMessage('Your text is now copied to clipboard. Paste away!');
      setAlert(true);
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  };

  const handleFinish = async () => {
    localStorage.setItem('uri', uri);
    await liveBot();
    router.push(`${RESTRICTED_APP_ROUTES.BOT_LIVE}`);
    setGoLive(true);
  }

  const [demoUrl, setDemoUrl] = useState(process.env.NEXT_PUBLIC_CHATBOT_URL);

  const init = async () => {
    const vendorId = await getVendorId();
    setUri(`<script type="text/javascript">(function () { d = document; s = d.createElement("script"); s.src = "https://www.askiot.ai/api/${vendorId}.js"; s.async = 1; d.getElementsByTagName("head")[0].appendChild(s); })();</script>`);
    if (!vendorId) {
      throw new Error('Failed to retrieve vendor ID');
    }
    console.log("the vendorid is ", vendorId);

    // Fetch token by vendorId
    const token = await getTokenByVendorId(vendorId);
    console.log("🚀 ~ init ~ token:", token)
    if (!token) {
      throw new Error('Failed to retrieve token for vendor');
    }

    setDemoUrl(`${process.env.NEXT_PUBLIC_CHATBOT_URL}?token=${token}`);

  }

  useEffect(() => {
    init();
  }, [])

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
            <div className="cursor-pointer text-s md:text-base font-medium rounded-lg shadow-s text-white bg-gray-1000 hover:bg-black focus:ring-2 focus:ring-gray-300 focus:bg-black disabled:bg-gray-600 disabled:text-gray-400 px-3 py-2.5 w-fit"
              onClick={() => {
                window.open(demoUrl, '_blank');
              }}
            >
              Try Demo
            </div>
          </div>

          <div className='section-embeded w-full'>
            <p className='text-[#ADB5BD] text-[14px] font-inter font-normal leading-6 mb-[6px] w-full'>Embed your chatbot on website</p>
            <div className='mt-[11px] flex'>
              <Input
                name="liveUri"
                className="md:w-[343px] w-full"
                placeholder="This is the bot install code"
                value={uri}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                }}
              />
              <div className=" ml-[12px] cursor-pointer text-s md:text-base font-medium rounded-lg shadow-s text-white bg-gray-1000 hover:bg-black focus:ring-2 focus:ring-gray-300 focus:bg-black disabled:bg-gray-600 disabled:text-gray-400 px-3 py-2.5 w-fit"
                onClick={handleCopyClick}
              >
                Copy
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
