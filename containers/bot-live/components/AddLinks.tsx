import Button from '@/components/Button';
import { ChangeEvent, useRef, FC, useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Table from '@/components/Table';
import Image from 'next/image';
import { removeLink, addLink } from '@/modules/bots/services';
import LoadingIndicator from '@/components/LoadingIndicator';
import BackButton from '@/components/BackButton';
import clsx from 'clsx';
import { ENTER_KEY } from '@/constants/common';
import { getLinks } from '@/modules/bots/services';
import BotAlert from '@/components/BotAlert';
import Badge, { ColorType } from '@/components/Badge';
import AddLinkForm from './AddLinkForm';

interface IAddLinksProps {
}

interface ILink {
  no: number;
  url: string;
}

export enum TABS {
  ADD_NEW_LINK,
  MANAGE_CURRENT_LINKS,
}

const AddLinks: FC<IAddLinksProps> = ({ }) => {
  const form = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(TABS.ADD_NEW_LINK);

  const onTraining = async () => {
    // Check if any links are selected for training
    const selectedLinks = arrLinks.filter(link => link.isChecked);
  
    if (selectedLinks.length === 0) {
      // No links selected, show an alert message
      setAlertMessage('Please select at least one link for training.');
      setAlert(true);
      return; // Exit the function early as there's nothing more to do
    }
  
    // Proceed with training since at least one link is selected
    try {
      setIsLoading(true);
      let arr = selectedLinks.map(link => link.url);
      await addLink(arr);
      setAlertMessage('Links have been added successfully.');
      setAlert(true);
    } catch (e) {
      setAlertMessage('Please confirm your network is online.');
      setAlert(true);
    } finally {
      setIsLoading(false);
    }
  }

  const onRemoveLink = async (row: ILink) => {
    setIsLoading(true);
  
    try {
      await removeLink(row.no);
      // Remove the link from allLinks and searchLinks states
      setAllLinks(prevLinks => prevLinks.filter(link => link.no !== row.no));
      setSearchLinks(prevLinks => prevLinks.filter(link => link.no !== row.no));
    } catch (error) {
      console.error('Failed to remove link:', error);
      // Optionally set an alert to show the error message
      setAlertMessage('Failed to remove link. Please try again.');
      setAlert(true);
    }
  
    setIsLoading(false);
  }

  const [links, setLinks] = useState<ILink[]>([]);
  const [arrLinks, setArrLinks] = useState<any[]>([]);
  const [allLinks, setAllLinks] = useState<ILink[]>([]);
  const [searchLinks, setSearchLinks] = useState<ILink[]>([]);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const columns = [
    
    {
      title: 'Link',
      key: '',
      styles: 'w-[50%]',
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
      title: 'Added on',
      key: '',
      styles: 'w-[10%]',
      renderNode: (row: any) => {
        return (
          <p className="text-black-700 font-medium text-s mt-1.5">
              <span>{row?.created_at?.split('T')[0]}</span>
            </p>
        );
      },
    },
    {
      title: 'Training Status',
      key: '',
      styles: 'w-[10%]',
      renderNode: (row: any) => {
        return (
          <Badge
              label={row.processed === true ? "Trained" : "Processing"}
              color={row.processed === true ? "blue" : "red"}
            />
        );
      },
    },
    {
      title: '',
      key: 'url',
      styles: 'w-[5%]',
      renderNode: (row: any) => {
        return (
          <div className="flex items-center justify-center md:flex-row flex-col" onClick={() => onRemoveLink(row)}>
            <Image src="/assets/icons/danger-trash-icon.svg" alt="" width={20} height={20} />
          </div>
        );
      },
    }
  ]

  const onTab = () => {
    if (tab === TABS.ADD_NEW_LINK) {
      setTab(TABS.MANAGE_CURRENT_LINKS);
    } else {
      setTab(TABS.ADD_NEW_LINK);
    }
  }

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
    console.log("Links from backend:", res); 

    setAllLinks(res);
    setSearchLinks(res);
  }

  useEffect(() => {
    if (tab === TABS.MANAGE_CURRENT_LINKS) {
      init();
    }
  }, [tab])

  console.log('searchLinks', searchLinks)

  return (
    <>
      <div className="md:mt-[48px] py-[20px] px-12 mt-12 flex flex-col items-center">
        <div className="header flex items-center justify-between mb-5 w-full">
          <BackButton />
        </div>
        <div className="flex flex-col items-center mx-auto w-full">
          {isLoading && <LoadingIndicator />}
          <div className="flex flex-col items-center">
            <div className="max-w-[100%] flex flex-col items-center mx-auto">
              <p className="text-gray-1000 font-semibold text-[16px] text-left mb-5">
                Add additional links for training your bot
              </p>

              <div className='flex mb-6'>
                <div className={clsx("cursor-pointer w-[165px] flex py-2 px-3 justify-center items-center gap-2 rounded-l-md border border-blue-500", tab === TABS.ADD_NEW_LINK ? "bg-[#06F]" : "")} onClick={onTab}>
                  <p className={clsx("font-inter text-base font-normal leading-6", tab === TABS.ADD_NEW_LINK ? "text-white" : "text-black")}>
                    Add new links
                  </p>
                </div>
                <div className={clsx("cursor-pointer w-[165px] flex py-2 px-3 justify-center items-center gap-2 rounded-r-md border border-blue-500", tab === TABS.MANAGE_CURRENT_LINKS ? "bg-[#06F]" : "")} onClick={onTab}>
                  <p className={clsx("font-inter text-base font-normal leading-6", tab === TABS.MANAGE_CURRENT_LINKS ? "text-white" : "text-black")}>
                    Manage current links
                  </p>
                </div>
              </div>
              {tab === TABS.ADD_NEW_LINK && (
                <>
                  <AddLinkForm links={links} setLinks={setLinks} arrLinks={arrLinks} setArrLinks={setArrLinks} />
                  <Button className='mt-4' onClick={onTraining}>Start Training</Button>
                </>
              )}

              {tab === TABS.MANAGE_CURRENT_LINKS && (
                <>
                  <div className='w-full flex justify-end mb-6'>
                    <div className="flex items-center py-2.5 px-3 bg-white rounded-xl shadow-search-box h-12.5 w-[290px]">
                      <div className="flex items-center flex-1">
                        <Image
                          className="w-5 h-5"
                          src="/assets/icons/search-svgrepo-com.svg"
                          width={20}
                          height={20}
                          alt="Search"
                        />
                        <input
                          ref={inputRef}
                          className='flex-1 h-5 text-base placeholder:text-gray-500 placeholder:font-normal outline-none ml-3'
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
                  <Table rows={searchLinks} columns={columns} pagination noFoundMsg="No link found"/>
                  {/* Notice there is no "Start Training" button here */}
                </>
              )}

              <BotAlert message={alertMessage} show={alert} setShow={setAlert} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLinks;
