import { useRef, FC, ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import BotAlert from '@/components/BotAlert';
import {
  getBotData,
  getVendorId,
  getTokenByVendorId,
  getDashboardScore,
  listPersonas,
  addPersona,
} from '@/modules/bots/services';
import { uploadFile, updateBot } from '@/modules/bots/services';
import { IDashboardScore } from '@/modules/bots/types';
import Spinner from '@/components/Spinner';
interface ICustomLivePageProps {}
import { Persona } from '@/modules/bots/types';

const CustomLivePage: FC<ICustomLivePageProps> = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('customize'); // New state for managing active tab
  // Function to handle tab change
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Add new state variables for form inputs
  const [newPersonaTitle, setNewPersonaTitle] = useState('');
  const [newPersonaDescription, setNewPersonaDescription] = useState('');

  const handleFormSubmit = async (e:React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Call the addPersona service function with separate arguments
      // Construct the payload including the chatToken
    
      console.log("The token is", token)
      const addedPersona = await addPersona(newPersonaTitle, newPersonaDescription, token);
  
      if (addedPersona) {
        // Update the personas state with the new persona
        setPersonas((prevPersonas) => [...prevPersonas, addedPersona]);
  
        // Clear the form fields
        setNewPersonaTitle('');
        setNewPersonaDescription('');
        // If you have a state for instructions, clear it as well
  
        // Optionally close the form
        setAddPersonaFormOpen(false);
      }
    } catch (error) {
      console.error('Error adding new persona:', error);
      // Handle the error in the UI as needed
    }
  };
  
  

  const [personas, setPersonas] = useState<Persona[]>([]);
  const [token, setToken] = useState(''); // Assuming the token is a string

  

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  


  const [isAddPersonaFormOpen, setAddPersonaFormOpen] = useState(false);

  // Function to handle opening the Add Persona Form
  const handleAddPersonaClick = () => {
    setAddPersonaFormOpen(!isAddPersonaFormOpen);
  };

  const botFileRef = useRef<HTMLInputElement>(null);
  const userFileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>('Bot');
  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    'Welcome! &#128075; What can I help you with today?',
  );
  const [primaryColor, setPrimaryColor] = useState<string>('#3662E3');
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFF');
  const [chatHeight, setChatHeight] = useState<number>(587);
  const [fontSize, setFontSize] = useState<number>(16);

  const [botIconFile, setBotIconFile] = useState<File | null>(null);
  const [userIconFile, setUserIconFile] = useState<File | null>(null);
  const [botIcon, setBotIconSrc] = useState('');
  const [userIcon, setUserIconSrc] = useState('');
  const [uri, setUri] = useState<string>('');

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [demoUrl, setDemoUrl] = useState(process.env.NEXT_PUBLIC_CHATBOT_URL);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(0);

  const [dashboardScore, setScore] = useState<IDashboardScore>({
    total_conversations: 0,
    avg_messages: 0,
    positive_feedback: 0,
    negative_feedback: 0,
    no_feedback: 0,
    positive_feedback_percentage: 0.0,
    negative_feedback_percentage: 0.0,
  });

  const [inputPrompts, setInputPrompts] = useState([{ id: 1, value: '' }]);
  const maxInputs = 3;

  const handleAddInput = () => {
    if (inputPrompts.length < maxInputs) {
      const newId = inputPrompts[inputPrompts.length - 1].id + 1;
      setInputPrompts([...inputPrompts, { id: newId, value: '' }]);
    }
  };

  const handleInputChange = (id: number, value: any) => {
    const updatedInputs = inputPrompts.map((input) =>
      input.id === id ? { ...input, value } : input,
    );
    setInputPrompts(updatedInputs);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(uri);
      setAlertMessage('Your text is now successfully copied to the clipboard!');
      setAlert(true);
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  };

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
      setAlertMessage('Please select a valid PNG file.');
      setAlert(true);
    }
  };

  // icon change event
  const handleUserIconFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file && file.type === 'image/png') {
      const reader = new FileReader();

      reader.onload = function (event: any) {
        setUserIconSrc(event.target.result);
        setUserIconFile(file);
      };

      reader.readAsDataURL(file);
    } else {
      setAlertMessage('Please select a valid PNG file.');
      setAlert(true);
    }
  };

  

  const onParseInputPrompts = () => {
    let arr = [];

    for (const prompt of inputPrompts) {
      if (prompt.value !== '') {
        arr.push(prompt);
      }
    }

    return arr;
  };

  const onHandleSave = async () => {
    setIsLoading(true);
    try {
      let data = {
        name,
        welcomeMessage,
        primaryColor,
        backgroundColor,
        chatHeight,
        fontSize,
        botIcon: '',
        userIcon: '',
        inputPrompts: onParseInputPrompts(),
      };

      if (botIconFile !== null || botIconFile !== undefined) {
        const botIconFileObj: any = await uploadFile(
          botIconFile === null ? new File([], '') : botIconFile,
          'icon',
        );
        data.botIcon = botIconFileObj.url;
      }

      if (userIconFile !== null || userIconFile !== undefined) {
        const userIconFileObj: any = await uploadFile(
          userIconFile === null ? new File([], '') : userIconFile,
          'icon',
        );
        data.userIcon = userIconFileObj.url;
      }

      await updateBot(data);
      setIsLoading(false);
      setAlertMessage('The bot configuration information has been successfully saved!');
      setAlert(true);

      setIsLoad(isLoad === 0 ? 1 : 0);

      await getVendorId();
    } catch (e) {
      console.log('e', e);
      setIsLoading(false);
    }
  };

  const init = async () => {
    try {
      const vendorId = await getVendorId();
      if (!vendorId) {
        throw new Error('Failed to retrieve vendor ID');
      }
      console.log('the vendorid is ', vendorId);

      // Fetch token by vendorId
      const token = await getTokenByVendorId(vendorId);
      if (!token) {
        throw new Error('Failed to retrieve token for vendor');
      }
      console.log('🚀 ~ init ~ token:', token);
      setToken(token); // Save the token to state here


      console.log('Fetching personas...');

      // Retrieve personas using the new token
      const fetchedPersonas = await listPersonas(token);


      console.log('Fetched personas:', fetchedPersonas);

      setPersonas(fetchedPersonas);

      // Set the demoUrl with the retrieved token
      setDemoUrl(`${process.env.NEXT_PUBLIC_CHATBOT_URL}?token=${token}`);

      // Set the script URI for the chatbot
      setUri(
        `<script type="text/javascript">(function () { d = document; s = d.createElement("script"); s.src = "https://www.askiot.ai/api/${vendorId}.js"; s.async = 1; d.getElementsByTagName("head")[0].appendChild(s); })();</script>`,
      );

      // Retrieve bot data using the new token
      const data = await getBotData(token);

      if (data.data.status === true) {
        if (data.data.customizationdata.hasOwnProperty('name')) {
          setName(data.data.customizationdata.name);
        }

        if (data.data.customizationdata.hasOwnProperty('welcomeMessage')) {
          setWelcomeMessage(data.data.customizationdata.welcomeMessage);
        }

        if (data.data.customizationdata.hasOwnProperty('primaryColor')) {
          setPrimaryColor(data.data.customizationdata.primaryColor);
        }

        if (data.data.customizationdata.hasOwnProperty('backgroundColor')) {
          setBackgroundColor(data.data.customizationdata.backgroundColor);
        }

        if (data.data.customizationdata.hasOwnProperty('chatHeight')) {
          setChatHeight(data.data.customizationdata.chatHeight);
        }

        if (data.data.customizationdata.hasOwnProperty('fontSize')) {
          setFontSize(data.data.customizationdata.fontSize);
        }

        if (data.data.customizationdata.hasOwnProperty('botIcon')) {
          setBotIconSrc(data.data.customizationdata.botIcon);
        }

        if (data.data.customizationdata.hasOwnProperty('userIcon')) {
          setUserIconSrc(data.data.customizationdata.userIcon);
        }

        if (data.data.customizationdata.hasOwnProperty('inputPrompts')) {
          setInputPrompts(data.data.customizationdata.inputPrompts);
        }
      }

      const score: any = await getDashboardScore(vendorId);
      setScore(score);

      
    } catch (e) {
      console.log('bot-live', e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <section className="vendor-onboarding-section relative min-h-screen p-8 flex justify-center items-center">
        <div className="md:mt-[48px] mt-6 flex flex-col items-center">
          <div className="w-full flex flex-col gap-5 mb-7">
            <p className="text-gray-1000 text-[18px] text-left font-medium">Dashboard</p>
            <div className="w-full flex justify-between gap-5">
              <div className="w-1/2 shadow-lg border rounded-md p-[14px] flex gap-5 bg-[#F8F9FA]">
                <img src="/assets/icons/conversations-icon.svg" alt="icon" className="w-6 h-6" />
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] text-black font-inter font-normal leading-6">
                    Total Conversations
                  </p>
                  <p className="text-[26px] text-black font-inter font-bold leading-6">
                    {dashboardScore?.total_conversations}
                  </p>
                </div>
              </div>
              <div className="w-1/2 shadow-lg border rounded-md p-[14px] flex gap-5 bg-[#F8F9FA]">
                <img
                  src="/assets/icons/dashboard-messages-icon.svg"
                  alt="icon"
                  className="w-6 h-6"
                />
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] text-black font-inter font-normal leading-6">
                    Avg. Messages / Conversation
                  </p>
                  <p className="text-[26px] text-black font-inter font-bold leading-6">
                    {dashboardScore?.avg_messages}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between gap-5">
              <div className="w-1/2 shadow-lg border rounded-md p-[14px] flex gap-5 bg-[#F8F9FA]">
                <img
                  src="/assets/icons/positive-feedback-icon.svg"
                  alt="icon"
                  className="w-6 h-6"
                />
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] text-black font-inter font-normal leading-6">
                    Positive Feedback
                  </p>
                  <p className="text-[26px] text-black font-inter font-bold leading-6">
                    {dashboardScore?.positive_feedback_percentage}%
                  </p>
                </div>
              </div>
              <div className="w-1/2 shadow-lg border rounded-md p-[14px] flex gap-5 bg-[#F8F9FA]">
                <img
                  src="/assets/icons/negative-feedback-icon.svg"
                  alt="icon"
                  className="w-6 h-6"
                />
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] text-black font-inter font-normal leading-6">
                    Negative Feedback
                  </p>
                  <p className="text-[26px] text-black font-inter font-bold leading-6">
                    {dashboardScore?.negative_feedback_percentage}%
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[100%] flex flex-col gap-5 items-center mx-auto">
            <div className="w-full flex flex-col gap-5 mb-7">
              {/* Section Title */}
              <div className="section-title">
                <p className="text-gray-1000 text-[18px] text-left font-medium">Chatbot</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-5 py-[20px] px-[10px] items-start rounded-[8px] border border-solid border-gray-300 bg-[#f8f9fa] shadow-md">
              <p className="text-black font-inter text-[16px] font-semibold leading-[20px]">
                🚀 Your chatbot is ready now!
              </p>
              <p className="text-black font-inter text-[15px] font-normal leading-[18px]">
                Your chatbot is published now and ready to be shared with the world! Copy this link
                to share your chatbot on social media, messaging apps, or via email.
              </p>
              <div
                className=" ml-[12px] cursor-pointer text-s md:text-base font-medium rounded-lg shadow-s text-white bg-gray-1000 hover:bg-black focus:ring-2 focus:ring-gray-300 focus:bg-black disabled:bg-gray-600 disabled:text-gray-400 px-3 py-2.5 w-fit"
                onClick={() => {
                  window.open(demoUrl, '_blank');
                }}
              >
                Try Demo
              </div>
              <div className="section-embeded w-full">
                <p className="text-[#ADB5BD] text-[14px] font-inter font-normal leading-6 mb-[6px] w-full">
                  Embed the chatbot on your site
                </p>
                <div className="mt-[11px] flex">
                  <Input
                    name="liveUri"
                    className="md:w-[343px] w-full"
                    placeholder="This is the bot install code"
                    value={uri}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                  />
                  <div
                    className=" ml-[12px] cursor-pointer text-s md:text-base font-medium rounded-lg shadow-s text-white bg-gray-1000 hover:bg-black focus:ring-2 focus:ring-gray-300 focus:bg-black disabled:bg-gray-600 disabled:text-gray-400 px-3 py-2.5 w-fit"
                    onClick={handleCopyClick}
                  >
                    Copy
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Section Title for "Customize your Bot" */}
          <div className="section-title mb-7 mt-7">
            <p className="text-gray-1000 text-[24px] text-left font-bold"></p>
          </div>

          <div className="flex justify-between items-start gap-[26px] w-full">
            <div className="flex flex-col items-start gap-[26px] flex-grow">
              {/* Content Fields */}
              <div className="section-title flex flex-col items-start gap-[6px]">
                <div className="section-title">
                  <p className="text-gray-1000 text-[18px] text-left font-medium">
                    Customize your AI Agent
                  </p>
                  {/* Tab buttons */}
                  <div className="flex mb-4">
                    <button
                      className={`mr-4 py-2 px-4 font-medium ${
                        activeTab === 'customize'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600'
                      }`}
                      onClick={() => handleTabChange('customize')}
                    >
                      Customize
                    </button>
                    <button
                      className={`py-2 px-4 font-medium ${
                        activeTab === 'persona'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600'
                      }`}
                      onClick={() => handleTabChange('persona')}
                    >
                      Persona
                    </button>
                  </div>
                </div>
              </div>
              {activeTab === 'customize' && (
                <div>
                  <div className="section-input flex flex-col items-start gap-3 mb-6">
                    <p className="text-[#495057] font-inter font-medium leading-4 text-[13px] shadow-sm">
                      Chatbot Name *
                    </p>
                    <Input
                      name="bot_name"
                      placeholder="Bot"
                      value={name}
                      onChange={(e: any) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="section-input flex flex-col items-start gap-3 mb-6">
                    <p className="text-gray-700 font-inter font-medium leading-4 text-[13px] shadow-sm">
                      Welcome Message
                    </p>
                    <Input
                      name="welcome_message"
                      placeholder="Hello"
                      value={welcomeMessage}
                      onChange={(e: any) => {
                        setWelcomeMessage(e.target.value);
                      }}
                      className="mt-1"
                    />
                    <p className="text-[14px] text-gray-600 font-inter text-xs font-normal leading-4">
                      The first message that the users will see in the chatbot
                    </p>
                  </div>

                  {/* Chat Interface */}

                  <div className="section-input flex flex-col items-start gap-3 mb-6">
                    <p className="text-gray-700 font-inter font-medium leading-4 text-[13px] shadow-sm">
                      Primary Color
                    </p>
                    <Input
                      name="primary_color"
                      placeholder="#3662E3"
                      value={primaryColor}
                      onChange={(e: any) => {
                        setPrimaryColor(e.target.value);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div className="section-input flex flex-col items-start gap-3 mb-6">
                    <p className="text-[#495057] font-inter font-medium leading-4 text-[13px] shadow-sm">
                      Background Color
                    </p>
                    <Input
                      name="background_color"
                      placeholder="#FFF"
                      value={backgroundColor}
                      onChange={(e: any) => {
                        setBackgroundColor(e.target.value);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-start gap-[26px]">
                    <div className="section-input flex flex-col items-start gap-3 mb-6">
                      <p className="text-[#495057] font-inter font-medium leading-4 text-[13px] shadow-sm">
                        {' '}
                        Chat Height (in px)
                      </p>
                      <Input
                        name="chat_height"
                        placeholder="587"
                        type="number"
                        value={chatHeight}
                        onChange={(e: any) => {
                          setChatHeight(e.target.value);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div className="section-input flex flex-col items-start gap-3 mb-6">
                      <p className="text-[#495057] font-inter font-medium leading-4 text-[13px] shadow-sm">
                        {' '}
                        Font size
                      </p>
                      <Input
                        name="font_size"
                        placeholder="16px"
                        type="number"
                        value={fontSize}
                        onChange={(e: any) => {
                          setFontSize(e.target.value);
                        }}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="section-input flex flex-col items-start gap-3 mb-6">
                    <p className="text-[#495057] font-inter font-medium leading-4 text-[13px] shadow-sm">
                      Select bot icon
                    </p>
                    <div className="flex justify-center items-center gap-5">
                      {botIcon === '' && (
                        <div className="w-[43px] h-[43px] bg-[#D9D9D9] rounded-[43px]"></div>
                      )}
                      {botIcon !== '' && (
                        <img src={botIcon} className="w-[43px] h-[43px] rounded-[43px]" />
                      )}
                      <div className="flex items-center">
                        <input
                          type="file"
                          accept="*/*"
                          onChange={handleBotIconFileChange}
                          ref={botFileRef}
                          className="hidden"
                        />
                        <div
                          className="flex py-2 px-5 justify-center items-center gap-2 rounded-l-2xl bg-gray-200"
                          onClick={() => botFileRef?.current?.click()}
                        >
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
                  <div className="section-input flex flex-col items-start gap-3 mb-6">
                    <p className="text-[#495057] font-inter font-medium leading-4 text-[13px] shadow-sm">
                      {' '}
                      Select user icon
                    </p>
                    <div className="flex justify-center items-center gap-5">
                      {userIcon === '' && (
                        <div className="w-[43px] h-[43px] bg-[#D9D9D9] rounded-[43px]"></div>
                      )}
                      {userIcon !== '' && (
                        <img src={userIcon} className="w-[43px] h-[43px] rounded-[43px]" />
                      )}
                      <div className="flex items-center">
                        <input
                          type="file"
                          accept="*/*"
                          onChange={handleUserIconFileChange}
                          ref={userFileRef}
                          className="hidden"
                        />
                        <div
                          className="flex py-2 px-5 justify-center items-center gap-2 rounded-l-2xl bg-gray-200"
                          onClick={() => userFileRef?.current?.click()}
                        >
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
                  <div className="section-input flex flex-col items-start gap-3 mb-6">
                    <p className="text-[#495057] font-inter font-medium leading-4 text-[13px] shadow-sm">
                      {' '}
                      Starter Prompts (These are prompts for customers to start the conversation)
                    </p>
                    <div>
                      {inputPrompts.map((input, index) => (
                        <div key={input.id} className="flex mb-[10px]">
                          <Input
                            name={`${index}-prompt`}
                            placeholder="Please input the prompt here."
                            type="text"
                            value={input.value}
                            className="md:w-[343px] w-full"
                            onChange={(e: any) => handleInputChange(input.id, e.target.value)}
                          />

                          {index !== maxInputs - 1 && ( // Render the "+" button for all inputs except the last one
                            <div
                              className=" ml-[12px] cursor-pointer text-s md:text-base font-medium rounded-lg shadow-s text-white bg-gray-1000 hover:bg-black focus:ring-2 focus:ring-gray-300 focus:bg-black disabled:bg-gray-600 disabled:text-gray-400 px-3 py-2.5 w-fit"
                              onClick={handleAddInput}
                            >
                              +
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-start w-full mt-5">
                    {!isLoading && <Button onClick={onHandleSave}>Save Changes</Button>}
                    {isLoading && <Spinner />}
                  </div>
                </div>
              )}
              {activeTab === 'persona' && (
                <div className="w-full">
                  <div className="space-y-8">
                    {/* Neutral Option */}

                    {personas.map((persona) => (
                      <div
                        key={persona.persona_id} // Use persona_id as the key
                        className="bg-white shadow rounded p-4 w-full flex items-center justify-between"
                      >
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="personaOption"
                            value={persona.persona_id} // Use persona_id as the value
                            checked={selectedOption === persona.persona_id}
                            onChange={() => setSelectedOption(persona.persona_id)} // Assuming setSelectedOption now expects a number
                            className="form-radio h-5 w-5 text-blue-600"
                          />
                          <span className="font-semibold text-md">{persona.name}</span>
                        </label>
                        <p className="text-gray-800 text-sm">{persona.description}</p>
                      </div>
                    ))}

                    <div className="my-4">
                      <h2 className="text-xl font-bold mb-3">Custom Personas</h2>
                      <button
                        className="py-2 px-4 bg-black text-white rounded hover:bg-blue-700 transition duration-300"
                        onClick={handleAddPersonaClick}
                      >
                        {isAddPersonaFormOpen ? 'Close Form' : 'Add New Persona'}
                      </button>
                    </div>

                    {isAddPersonaFormOpen && (
                      <div className="bg-white shadow rounded p-4 mt-4">
                        <form onSubmit={handleFormSubmit}>
  <div className="mb-3">
    <label htmlFor="personaTitle" className="block mb-2 text-sm font-medium text-gray-800">
      Title *
    </label>
    <input
      type="text"
      id="personaTitle"
      value={newPersonaTitle}
      onChange={(e) => setNewPersonaTitle(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="personaDescription" className="block mb-2 text-sm font-medium text-gray-800">
      Description
    </label>
    <textarea
      id="personaDescription"
      rows={4}
      value={newPersonaDescription}
      onChange={(e) => setNewPersonaDescription(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5"
    ></textarea>
  </div>
  <div className="mb-3">
    <label htmlFor="personaInstructions" className="block mb-2 text-sm font-medium text-gray-800">
      Instructions *
    </label>
    
  </div>
  <button
    type="submit"
    className="py-2 px-4 bg-black text-white rounded hover:bg-blue-700 transition duration-300"
  >
    Add Persona
  </button>
  <button
    type="button"
    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300 ml-2"
    onClick={() => setAddPersonaFormOpen(false)}
  >
    Discard
  </button>
</form>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {activeTab === 'customize' && (
              <section className="chatbot">
              <iframe
                id="askiot-bot-ui"
                key={isLoad}
                src={demoUrl}
                style={{
                  border: 'none',
                  width: '424px',
                  height: chatHeight + 'px',
                  borderRadius: '0.75rem',
                  boxShadow:
                    'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
                  display: 'block',
                }}
              ></iframe>
            </section>
            )}
          </div>

          <BotAlert message={alertMessage} show={alert} setShow={setAlert} />
        </div>
      </section>
    </>
  );
};

export default CustomLivePage;
