import { useRef, FC, useCallback, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '@/components/Button';
import FormInput from '@/components/FormComponents/FormInput';
import BotAlert from '@/components/BotAlert';
import { uploadFile, updateBot } from '@/modules/bots/services';
import Spinner from '@/components/Spinner';
import { getBotData, getVendorId } from '@/modules/bots/services';


interface ICustomizeProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

const Customize: FC<ICustomizeProps> = ({ onNextStep, onBackStep }) => {
  const form = useFormContext();
  const botFileRef = useRef<HTMLInputElement>(null);
  const userFileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("Bot");
  const [welcomeMessage, setWelcomeMessage] = useState<string>("Hello");
  const [primaryColor, setPrimaryColor] = useState<string>("#3662E3");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFF");
  const [chatHeight, setChatHeight] = useState<number>(44);
  const [fontSize, setFontSize] = useState<number>(16);

  const [botIconFile, setBotIconFile] = useState<File | null>(null);
  const [userIconFile, setUserIconFile] = useState<File | null>(null);
  const [botIcon, setBotIconSrc] = useState('');
  const [userIcon, setUserIconSrc] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
    } catch (e) {
      console.log('e', e)
      setIsLoading(false)
    }
  }

  const init = async () => {
    try {
      const data = await getBotData();

      console.log('data', data)

      if (data.data.status === true) {
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
      }
    } catch (e) {
      console.log('bot-live', e)
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
              <FormInput name="bot_name" placeholder="Bot" value={name} onChange={(e: any) => {
                setName(e.target.value);
              }} />
            </div>
            <div className="section-input flex flex-col items-start gap-[8px]">
              <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                Welcome Message
              </p>
              <FormInput name="welcome_message" placeholder="Hello" value={welcomeMessage} onChange={(e: any) => {
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
              <FormInput name="primary_color" placeholder="#3662E3" value={primaryColor} onChange={(e: any) => {
                setPrimaryColor(e.target.value);
              }} />
            </div>
            <div className="section-input flex flex-col items-start gap-[8px]">
              <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                Background Color
              </p>
              <FormInput name="background_color" placeholder="#FFF" value={backgroundColor} onChange={(e: any) => {
                setBackgroundColor(e.target.value);
              }} />
            </div>
            <div className="flex items-start gap-[26px]">
              <div className="section-input flex flex-col items-start gap-[8px]">
                <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                  Chat Height (in %)
                </p>
                <FormInput name="chat_height" placeholder="46" type="number" onChange={(e: any) => {
                  setChatHeight(e.target.value);
                }} />
              </div>
              <div className="section-input flex flex-col items-start gap-[8px]">
                <p className="text-[13px] text-[#495057] font-inter text-base font-normal leading-4">
                  Font size
                </p>
                <FormInput name="font_size" placeholder="16px" type="number" onChange={(e: any) => {
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
                  <input type="file" accept=".png" onChange={handleBotIconFileChange} ref={botFileRef} className='hidden' />
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
            <div className="flex w-[335px] py-[17.131px] px-[28.551px] justify-between items-center gap-[56.626px] rounded-t-[8.565px]" style={{ backgroundColor: primaryColor }}>
              <div className="flex items-start gap-[8.089px]">
                <div className="flex flex-col items-start gap-[10.469px]">
                  <p className="text-white text-center font-inter text-[13.324px] font-semibold leading-[13.324px]">
                    {name}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-[11.42px]">
                {/* <img className="w-[15.227px] h-[15.227px] cursor-pointer" src="/assets/images/refresh.png" />
                <img className="w-[15.227px] h-[15.227px] cursor-pointer" src="/assets/images/profile.png" />
                <img className="w-[15.227px] h-[15.227px] cursor-pointer" src="/assets/images/sound.png" /> */}
                <img className="w-[15.227px] h-[15.227px] cursor-pointer" src="/assets/images/close.png" />
              </div>
            </div>
            <div className='px-[25.22px] py-[20.54px] relative overflow-hidden' style={{ backgroundColor: backgroundColor, height: chatHeight + 'vh' }}>
              <div className="flex items-start gap-[11.42px] self-stretch">
                <img src={`${botIcon === '' ? '/assets/images/bot-icon.png' : botIcon}`} className="w-[11px] h-[11px]" />
                <div className="flex flex-none py-[4.759px] px-[5.71px] justify-center items-center gap-4.759 rounded-[3.807px] bg-white shadow-box max-w-[167.7px] rounded-md border border-solid border-gray-300 mb-[17.59px]">
                  <p className="text-[#000] font-inter font-normal leading-[9px]" style={{ fontSize: fontSize / 16 * 12 + 'px' }}>
                    {welcomeMessage}
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-end gap-[11.42px] self-stretch">
                <img src={`${userIcon === '' ? '/assets/images/user-icon.png' : userIcon}`} className="w-[11px] h-[11px]" />
                <div className="flex flex-none py-[4.759px] px-[5.71px] justify-center items-center gap-4.759 rounded-[3.807px] shadow-box max-w-[167.7px] rounded-md border border-solid border-gray-300 mb-[17.59px]" style={{ backgroundColor: primaryColor }}>
                  <p className="text-[#FFF] font-inter font-normal leading-[9px]" style={{ fontSize: fontSize / 16 * 12 + 'px' }}>
                    What devices support tank monitoring?
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-[11.42px] self-stretch">
                <img src={`${botIcon === '' ? '/assets/images/bot-icon.png' : botIcon}`} className="w-[11px] h-[11px]" />
                <div className="flex flex-none py-[4.759px] px-[5.71px] justify-center items-center gap-4.759 rounded-[3.807px] bg-white shadow-box max-w-[167.7px] rounded-md border border-solid border-gray-300 mb-[17.59px]">
                  <p className="text-[#000] font-inter font-normal leading-[9px]" style={{ fontSize: fontSize / 16 * 12 + 'px' }}>
                    Sure, here’s a list of devices that are best suited for tank monitoring
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-end gap-[11.42px] self-stretch">
                <img src={`${userIcon === '' ? '/assets/images/user-icon.png' : userIcon}`} className="w-[11px] h-[11px]" />
                <div className="flex flex-none py-[4.759px] px-[5.71px] justify-center items-center gap-4.759 rounded-[3.807px] shadow-box max-w-[167.7px] rounded-md border border-solid border-gray-300 mb-[17.59px]" style={{ backgroundColor: primaryColor }}>
                  <p className="text-[#FFF] font-inter font-normal leading-[9px]" style={{ fontSize: fontSize / 16 * 12 + 'px' }}>
                    What devices support tank monitoring?
                  </p>
                </div>
              </div>
              <div className="flex h-[23.793px] py-[4.759px] px-[5.71px] justify-between items-center self-stretch rounded-[5.71px] bg-white shadow-box backdrop-blur-[7.930870532989502px] w-[289px] absolute bottom-[17px]">
                <div className="flex w-[166.786px] items-center gap-[5.71px]">
                  <img src='/assets/images/bot-icon.png' className="w-[9.51px] h-[9.51px]" />
                  <p className="text-[#ADB5BD] font-inter font-normal leading-[9.517px]" style={{ fontSize: fontSize / 16 * 12 + 'px' }}>
                    Type
                  </p>
                </div>
                <img
                  src="/assets/icons/paper-airplane-icon.svg"
                  width={9.5}
                  height={9.5}
                  alt="submit"
                />
              </div>
            </div>
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
