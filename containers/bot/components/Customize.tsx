import { useRef, FC, useCallback, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import BotAlert from '@/components/BotAlert';
import { uploadFile, updateBot } from '@/modules/bots/services';
import Spinner from '@/components/Spinner';
import { getBotData, getVendorId, getTokenByVendorId } from '@/modules/bots/services';

interface ICustomizeProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

const Customize: FC<ICustomizeProps> = ({ onNextStep, onBackStep }) => {
  const form = useFormContext();
  const botFileRef = useRef<HTMLInputElement>(null);
  const userFileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("Bot");
  const [welcomeMessage, setWelcomeMessage] = useState<string>("Welcome! &#128075; What can I help you with today?");
  const [primaryColor, setPrimaryColor] = useState<string>("#3662E3");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFF");
  const [chatHeight, setChatHeight] = useState<number>(587);
  const [fontSize, setFontSize] = useState<number>(16);

  const [botIconFile, setBotIconFile] = useState<File | null>(null);
  const [userIconFile, setUserIconFile] = useState<File | null>(null);
  const [botIcon, setBotIconSrc] = useState('');
  const [userIcon, setUserIconSrc] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [isLoad, setIsLoad] = useState(0);

  const [chatToken, setChatToken] = useState('');

  const handleBotIconFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file && file.type === 'image/png') {
      const reader = new FileReader();

      reader.onload = function (event: any) {
        setBotIconSrc(event.target.result);
        setBotIconFile(file);
      };

      reader.readAsDataURL(file);
    } else {
      setAlertMessage('Please select a valid PNG file!');
      setAlert(true);
    }
  };

  const handleUserIconFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event: any) {
        setUserIconSrc(event.target.result);
        setUserIconFile(file);
      };

      reader.readAsDataURL(file);
    } else {
      setAlertMessage('Please select a valid PNG file!');
      setAlert(true);
    }
  };

  const onHandleSave = async () => {
    setIsLoading(true)
    try {
      let data = {
        name,
        welcomeMessage,
        primaryColor,
        backgroundColor,
        chatHeight,
        fontSize,
        botIcon: '',
        userIcon: ''
      }

      if (botIconFile !== null || botIconFile !== undefined) {
        const botIconFileObj: any = await uploadFile(botIconFile === null ? new File([], '') : botIconFile, "icon");
        data.botIcon = botIconFileObj.url;
      }

      if (userIconFile !== null || userIconFile !== undefined) {
        const userIconFileObj: any = await uploadFile(userIconFile === null ? new File([], '') : userIconFile, "icon");
        data.userIcon = userIconFileObj.url;
      }

      await updateBot(data);
      setIsLoading(false)
      setAlertMessage('The configuration information has been successfully saved!');
      setAlert(true);

      setIsLoad(isLoad === 0 ? 1 : 0);
    } catch (e) {
      setIsLoading(false)
    }
  }

  const init = async () => {
    try {
      const vendorId = await getVendorId();
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

      const data = await getBotData(token);

      setChatToken(token);

      if (data.data.customizationdata
        .hasOwnProperty("name")) {
        setName(data.data.customizationdata.name);
      }

      if (data.data.customizationdata
        .hasOwnProperty("welcomeMessage")) {
        setWelcomeMessage(data.data.customizationdata.welcomeMessage);
      }

      if (data.data.customizationdata
        .hasOwnProperty("primaryColor")) {
        setPrimaryColor(data.data.customizationdata.primaryColor);
      }


      if (data.data.customizationdata
        .hasOwnProperty("backgroundColor")) {
        setBackgroundColor(data.data.customizationdata.backgroundColor);
      }

      if (data.data.customizationdata
        .hasOwnProperty("chatHeight")) {
        setChatHeight(data.data.customizationdata.chatHeight);
      }

      if (data.data.customizationdata
        .hasOwnProperty("fontSize")) {
        setFontSize(data.data.customizationdata.fontSize);
      }

      if (data.data.customizationdata
        .hasOwnProperty("botIcon")) {
        setBotIconSrc(data.data.customizationdata.botIcon);
      }

      if (data.data.customizationdata
        .hasOwnProperty("userIcon")) {
        setUserIconSrc(data.data.customizationdata.userIcon);
      }
    } catch (e) {
      console.log('bot-live error', e)
    }
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <>
      <div className="md:mt-[48px] mt-12 flex flex-col items-center">
        <p className="text-gray-1000 text-l text-center mb-5">
          Customize your Bot
        </p>
        <div className="flex justify-between items-start gap-[26px] w-full">
          <div className="flex flex-col items-start gap-[26px] w-[calc(100% - 335px)]">
            {/* Content Fields */}
            <div className="section-title flex flex-col items-start gap-[6px]">
              <p className="text-[16px] text-black font-inter text-base font-normal leading-6">
                Content
              </p>
              <p className="text-[14px] text-gray-500 font-inter text-base font-normal leading-6">
                Customize your chatbot
              </p>
            </div>
            <div className="section-input flex flex-col items-start gap-[8px]">
              <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                Chatbot Name *
              </p>
              <Input name="bot_name" placeholder="Bot" value={name} onChange={(e: any) => {
                setName(e.target.value);
              }} />
            </div>
            <div className="section-input flex flex-col items-start gap-[8px]">
              <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                Welcome Message
              </p>
              <Input name="welcome_message" placeholder="Hello" value={welcomeMessage} onChange={(e: any) => {
                setWelcomeMessage(e.target.value);
              }} />
              <p className="text-[14px] text-[#868E96] font-inter text-xs font-normal leading-4">
                The first message that the users will see in the chatbot
              </p>
            </div>

            {/* Chat Interface */}
            <div className="section-title flex flex-col items-start gap-[6px]">
              <p className="text-[16px] text-black font-inter text-base font-normal leading-6">
                Chat Interface
              </p>
              <p className="text-[14px] text-gray-500 font-inter text-base font-normal leading-6">
                This will be applied when embedded on a website
              </p>
            </div>
            <div className="section-input flex flex-col items-start gap-[8px]">
              <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                Primary Color
              </p>
              <Input name="primary_color" placeholder="#3662E3" value={primaryColor} onChange={(e: any) => {
                setPrimaryColor(e.target.value);
              }} />
            </div>
            <div className="section-input flex flex-col items-start gap-[8px]">
              <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                Background Color
              </p>
              <Input name="background_color" placeholder="#FFF" value={backgroundColor} onChange={(e: any) => {
                setBackgroundColor(e.target.value);
              }} />
            </div>
            <div className="flex items-start gap-[26px]">
              <div className="section-input flex flex-col items-start gap-[8px]">
                <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                  Chat Height (in px)
                </p>
                <Input name="chat_height" placeholder="587" type="number" onChange={(e: any) => {
                  setChatHeight(e.target.value);
                }} />
              </div>
              <div className="section-input flex flex-col items-start gap-[8px]">
                <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                  Font size
                </p>
                <Input name="font_size" placeholder="16px" type="number" onChange={(e: any) => {
                  setFontSize(e.target.value);
                }} />
              </div>
            </div>
            <div className="section-input flex flex-col items-start gap-[8px]">
              <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                Select bot icon
              </p>
              <div className="flex justify-center items-center gap-5">
                {botIcon === '' && <div className="w-[43px] h-[43px] bg-[#D9D9D9] rounded-[43px]"></div>}
                {botIcon !== '' && <img src={botIcon} className="w-[43px] h-[43px] rounded-[43px]" />}
                <div className="flex items-center">
                  <input type="file" accept=".jpg" onChange={handleBotIconFileChange} ref={botFileRef} className='hidden' />
                  <div className="flex py-2 px-5 justify-center items-center gap-2 rounded-l-2xl bg-gray-200" onClick={() => botFileRef?.current?.click()}>
                    <p className="text-black font-inter text-[12px] font-normal leading-5 cursor-pointer">
                      Choose file
                    </p>
                  </div>
                  <p className="text-black font-inter text-[12px] font-normal leading-5 py-2 px-5">
                    {botIconFile?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="section-input flex flex-col items-start gap-[8px]">
              <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                Select user icon
              </p>
              <div className="flex justify-center items-center gap-5">
                {userIcon === '' && <div className="w-[43px] h-[43px] bg-[#D9D9D9] rounded-[43px]"></div>}
                {userIcon !== '' && <img src={userIcon} className="w-[43px] h-[43px] rounded-[43px]" />}
                <div className="flex items-center">
                  <input type="file" accept=".png" onChange={handleUserIconFileChange} ref={userFileRef} className='hidden' />
                  <div className="flex py-2 px-5 justify-center items-center gap-2 rounded-l-2xl bg-gray-200" onClick={() => userFileRef?.current?.click()}>
                    <p className="text-black font-inter text-[12px] font-normal leading-5 cursor-pointer">
                      Choose file
                    </p>
                  </div>
                  <p className="text-black font-inter text-[12px] font-normal leading-5 py-2 px-5">
                    {userIconFile?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className='chatbot'>
            <iframe id="askiot-bot-ui"
              key={isLoad}
              src={`${process.env.NEXT_PUBLIC_CHATBOT_URL}?token=${chatToken}`}
              style={{
                border: "none",
                width: "448px",
                height: chatHeight + 'px',
                borderRadius: "0.75rem",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px",
                display: "block",
              }}></iframe>
          </section>
        </div>
        <div className='flex justify-between items-start w-full mt-5'>
          {!isLoading && <Button onClick={onHandleSave}>Save Changes</Button>}
          {isLoading && <Spinner />}
          <div className={`flex items-center justify-between w-[160px]`}>
            <Button className="bg-gray" variant="secondary" onClick={onBackStep}>
              Previous
            </Button>
            <Button onClick={form.handleSubmit(onNextStep)}>Next</Button>
          </div>
        </div>
        <BotAlert message={alertMessage} show={alert} setShow={setAlert} />
      </div>
    </>
  );
};

export default Customize;
