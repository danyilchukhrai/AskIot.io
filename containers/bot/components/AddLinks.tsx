import Button from '@/components/Button';
import { ChangeEvent, useRef, FC, useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Table from '@/components/Table';
import Image from 'next/image';
import LoadingIndicator from '@/components/LoadingIndicator';
import clsx from 'clsx';
import { ENTER_KEY } from '@/constants/common';
import { removeLink, addLink, getLinks } from '@/modules/bots/services';
import BotAlert from '@/components/BotAlert';
import AddLinkForm from '@/containers/bot-live/components/AddLinkForm';

interface IAddLinksProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

interface ILink {
  no: number;
  url: string;
}

export enum TABS {
  ADD_NEW_LINK,
  MANAGE_CURRENT_LINKS,
}

const AddLinks: FC<IAddLinksProps> = ({ onNextStep, onBackStep }) => {
  const form = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tab, setTab] = useState(TABS.ADD_NEW_LINK);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onTraining = async () => {
    try {
      if (arrLinks.length > 0) {
        setIsLoading(true);
        let arr = [];
        for (const link of arrLinks) {
          if (link.isChecked) {
            arr.push(link.url);
          }
        }
        await addLink(arr);

        setAlertMessage('Links have been added successfully.');
        setAlert(true);
        setSubmitted(true);
      } else {
        setAlertMessage('Please check the website links.');
        setAlert(true);
      }
    } catch (e) {
      setAlertMessage('Please confirm your network is online.');
      setAlert(true);
    }
    setIsLoading(false);
  };

  const onRemoveLink = async (row: ILink) => {
    setIsLoading(true);

    await removeLink(row.no);
    init();

    setIsLoading(false);
  };

  const [links, setLinks] = useState<ILink[]>([]);
  const [arrLinks, setArrLinks] = useState<any[]>([]);
  const [allLinks, setAllLinks] = useState<ILink[]>([]);
  const [searchLinks, setSearchLinks] = useState<ILink[]>([]);

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const columns = [
    {
      title: 'No',
      key: 'no',
      styles: 'w-[15%]',
      renderNode: (row: any) => {
        return (
          <div className="flex items-center md:flex-row flex-col">
            <div className="md:pt-0">
              <p className="text-base text-gray-1000 font-medium pb-1 text-center md:text-start">
                {row?.no}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Link',
      key: '',
      styles: 'w-[65%]',
      renderNode: (row: any) => {
        return (
          <div className="flex items-center md:flex-row flex-col">
            <div className="md:pt-0">
              <p className="text-base text-gray-1000 font-medium pb-1 text-center md:text-start">
                {row?.url}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: '',
      key: 'url',
      styles: 'w-[10%]',
      renderNode: (row: any) => {
        return (
          <div
            className="flex items-center justify-center md:flex-row flex-col"
            onClick={() => onRemoveLink(row)}
          >
            <Image src="/assets/icons/danger-trash-icon.svg" alt="" width={20} height={20} />
          </div>
        );
      },
    },
  ];

  const onTab = () => {
    if (tab === TABS.ADD_NEW_LINK) {
      setTab(TABS.MANAGE_CURRENT_LINKS);
    } else {
      setTab(TABS.ADD_NEW_LINK);
    }
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (searchValue: string) => {
    if (searchValue !== '') {
      let arr = [];
      for (const link of allLinks) {
        if (link.url.includes(searchValue)) {
          arr.push(link);
        }
      }

      setSearchLinks(arr);
    } else {
      setSearchLinks(allLinks);
    }
  };

  const init = async () => {
    const res: any = await getLinks();
    setAllLinks(res);
    setSearchLinks(res);
  };

  useEffect(() => {
    if (tab === TABS.MANAGE_CURRENT_LINKS) {
      init();
    }
  }, [tab]);

  return (
    <>
      <div className="md:mt-[48px] py-[20px] px-[20px] mt-12 flex flex-col items-center">
        <div className="flex flex-col items-center mx-auto w-full">
          {isLoading && <LoadingIndicator />}
          <div className="flex flex-col items-center">
            <div className="max-w-[100%] flex flex-col items-center mx-auto">
              <p className="text-gray-1000 font-semibold text-[16px] text-left mb-5">
                Add links from your website for training your bot
              </p>

              <div className="flex mb-6">
                <div
                  className={clsx(
                    'cursor-pointer w-[165px] flex py-2 px-3 justify-center items-center gap-2 rounded-l-md border border-blue-500',
                    tab === TABS.ADD_NEW_LINK ? 'bg-[#06F]' : '',
                  )}
                  onClick={onTab}
                >
                  <p
                    className={clsx(
                      'font-inter text-base font-normal leading-6',
                      tab === TABS.ADD_NEW_LINK ? 'text-white' : 'text-black',
                    )}
                  >
                    Add new links
                  </p>
                </div>
                <div
                  className={clsx(
                    'cursor-pointer w-[165px] flex py-2 px-3 justify-center items-center gap-2 rounded-r-md border border-blue-500',
                    tab === TABS.MANAGE_CURRENT_LINKS ? 'bg-[#06F]' : '',
                  )}
                  onClick={onTab}
                >
                  <p
                    className={clsx(
                      'font-inter text-base font-normal leading-6',
                      tab === TABS.MANAGE_CURRENT_LINKS ? 'text-white' : 'text-black',
                    )}
                  >
                    Manage current links
                  </p>
                </div>
              </div>

              {tab === TABS.ADD_NEW_LINK && (
                <AddLinkForm
                  links={links}
                  setLinks={setLinks}
                  arrLinks={arrLinks}
                  setArrLinks={setArrLinks}
                />
              )}
              {tab === TABS.MANAGE_CURRENT_LINKS && (
                <>
                  <div className="w-full flex justify-end mb-6">
                    <div className="flex items-center py-2.5 px-3 bg-white rounded-xl shadow-search-box h-12.5 w-[290px]">
                      <div className="flex items-center flex-1">
                        <Image
                          className="w-5 h-5"
                          src="/assets/icons/search-svgrepo-com.svg"
                          width={20}
                          height={20}
                          alt="AskIoT"
                        />
                        <input
                          ref={inputRef}
                          className={clsx(
                            'flex-1 h-5 text-base placeholder:text-gray-500 placeholder:font-normal outline-none',
                            {
                              'ml-3': true,
                            },
                          )}
                          value={value}
                          onChange={handleChangeSearch}
                          placeholder="Search URL"
                          onKeyDown={(e) => {
                            if (e.key === ENTER_KEY) {
                              handleSearch(value);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Table
                    rows={searchLinks}
                    columns={columns}
                    pagination
                    noFoundMsg="No link found"
                  />
                </>
              )}

              <Button
                className="mt-4"
                onClick={onTraining}
                disabled={arrLinks.length === 0} // disables button if arrLinks array is empty
              >
                Upload Links
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start w-full mt-5">
          <Button className="bg-gray" variant="secondary" onClick={onBackStep}>
            Previous
          </Button>
          <div className={`flex items-center justify-between w-[120px]`}>
            <Button className="bg-gray" variant="secondary" onClick={form.handleSubmit(onNextStep)}>
              Skip
            </Button>
            <Button
              onClick={() => {
                if (submitted === true) {
                  onNextStep();
                } else {
                  setAlertMessage('If you choose not to add links at this time, please select Skip. Otherwise, please select links and click the Upload Links button');
                  setAlert(true);
                }
              }}
            >
              Next
            </Button>
          </div>
        </div>
        <BotAlert message={alertMessage} show={alert} setShow={setAlert} />
      </div>
    </>
  );
};

export default AddLinks;
