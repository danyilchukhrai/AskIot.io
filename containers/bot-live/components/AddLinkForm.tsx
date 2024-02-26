import Button from '@/components/Button';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import {} from '@/modules/bots/services';
import clsx from 'clsx';
import Input from '@/components/Input';
import FormCheckBox from './FormCheckbox';
import { fetchLinks } from '@/modules/bots/services';
import Spinner from '@/components/Spinner';

interface ILink {
  no: number;
  url: string;
}

interface IArrLink {
  no: number;
  url: string;
  isChecked: boolean;
}

interface IAddLinkFormProps {
  setLinks: (link: any[]) => void;
  links: ILink[];
  arrLinks: IArrLink[];
  setArrLinks: (link: any[]) => void;
}

export enum SITE {
  WEBSITE,
  SITEMAP,
}

const AddLinkForm: FC<IAddLinkFormProps> = ({ links, setLinks, arrLinks, setArrLinks }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [siteType, setSiteType] = useState(SITE.WEBSITE);
  const [url, setUrl] = useState('');
  // New state variables for the checkboxes
  const [isLeadGeneration, setIsLeadGeneration] = useState(false);
  const [isForCustomerSupport, setIsForCustomerSupport] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const numberOfPage = 10;

  const [page, setPage] = useState(0);
  const totalPages = Math.floor(links?.length / numberOfPage) + 1;

  const onNextPagination = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const onPreviewPagination = () => {
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  };

  const getLastNumber = () => {
    if (page === totalPages - 1) {
      return links?.length;
    } else {
      return (page + 1) * numberOfPage;
    }
  };

  // Modify the onSelectType function to accept a site type parameter
  const onSelectType = (type: SITE) => {
    setSiteType(type);
  };

  const onGetLinks = async () => {
    setIsLoading(true);

    if (url !== '') {
      const links: any = await fetchLinks(url, siteType);
      setLinks(links);
    }

    setIsLoading(false);
  };

  const toggle = (toggleItem: IArrLink) => {
    const arr: any = [];
    for (const link of arrLinks) {
      if (link.no === toggleItem.no && link.url === toggleItem.url) {
        arr.push({
          no: link.no,
          url: link.url,
          isChecked: !toggleItem.isChecked,
        });
      } else {
        arr.push(link);
      }
    }

    setArrLinks(arr);
  };

  useEffect(() => {
    const arr: any = [];
    for (const link of links) {
      arr.push({
        no: link.no,
        url: link.url,
        isChecked: false,
      });
    }

    setArrLinks(arr);
  }, [links]);

  useEffect(() => {
    const arr: any = [];
    for (const link of links) {
      arr.push({
        no: link.no,
        url: link.url,
        isChecked: checkAll,
      });
    }

    setArrLinks(arr);
  }, [checkAll]);

  return (
    <>
      <div className="md:mt-[28px] flex flex-col items-center w-[1000px]">
        <div className="flex flex-col mx-auto w-full">
          <p className="text-gray-1000 text-l text-left w-full mb-5">Choose your data type:</p>
          <div className="flex items-start gap-4">
            <div
              className={clsx(
                'flex items-center py-3 w-[115px] rounded-xl justify-center cursor-pointer transition-all',
                siteType === SITE.WEBSITE
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-200 hover:border-blue-500',
              )}
              onClick={() => onSelectType(SITE.WEBSITE)}
            >
              <img src="/assets/icons/website_icon.svg" alt="icon" width="24" height="24" />
              <p className="ml-2 text-sm">Website</p>
            </div>
            <div
              className={clsx(
                'flex items-center py-3 w-[115px] rounded-xl justify-center cursor-pointer transition-all',
                siteType === SITE.SITEMAP
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-200 hover:border-blue-500',
              )}
              onClick={() => onSelectType(SITE.SITEMAP)}
            >
              <img src="/assets/icons/sitemaps_icon.svg" alt="icon" width="24" height="24" />
              <p className="ml-2 text-sm">Sitemap</p>
            </div>
          </div>

          <p className="text-495057 text-13 font-inter text-xs mt-12 font-normal leading-4 mb-2 md:w-[343px] w-full">
            Website URL
          </p>

          <div className="flex items-start gap-4 mb-4">
            <Input
              name="Website URL"
              className="md:w-[343px] w-full"
              placeholder=""
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUrl(e.target.value);
              }}
            />
            <Button className="" onClick={onGetLinks}>
              Fetch Links
            </Button>
          </div>

          {/* Title for the new checkboxes */}
          <div className="mb-2">
            <p className="text-495057 text-sm font-inter font-normal leading-4 md:w-[343px] w-full">
              I am adding links for the AI to be trained on:
            </p>
          </div>

          {/* New Checkboxes for Lead Generation and For Customer Support */}
          <div className="mb-4">
            <FormCheckBox
              name="LeadGeneration"
              className="mb-2"
              type="checkbox"
              onChange={() => setIsLeadGeneration(!isLeadGeneration)}
              checked={isLeadGeneration}
              label="Lead Generation"
            />
            <FormCheckBox
              name="ForCustomerSupport"
              className="mb-2"
              type="checkbox"
              onChange={() => setIsForCustomerSupport(!isForCustomerSupport)}
              checked={isForCustomerSupport}
              label="Customer Support"
            />
          </div>

          <div className="header border-b border-gray-200 px-[20px] py-[10px]">
            <FormCheckBox
              name="AA"
              className={clsx('toggle-input sr-only')}
              type="checkbox"
              onChange={(e) => {
                setCheckAll(!checkAll);
              }}
              onClick={() => {
                setCheckAll(!checkAll);
              }}
              value="check-all"
              label="URL"
              checked={checkAll}
            />
          </div>
          {isLoading && <Spinner className="w-full mt-6" />}
          {!isLoading &&
            arrLinks.map((link: any, index: number) => {
              if (index >= page * numberOfPage && index < getLastNumber()) {
                return (
                  <div key={index} className="px-[20px] py-[10px]">
                    <FormCheckBox
                      name={`${link.no}`}
                      className={clsx('toggle-input sr-only')}
                      type="checkbox"
                      onChange={(e) => {
                        toggle(link);
                      }}
                      onClick={() => {
                        toggle(link);
                      }}
                      value={`${link.no}`}
                      label={`${link.url}`}
                      checked={link.isChecked}
                    />
                  </div>
                );
              }
            })}
          <div
            className={clsx(
              'pagination flex justify-between items-center md:pt-5 pt-2.5 ',
              links?.length > 0 ? '' : 'invisible',
            )}
          >
            <p className="text-s md:text-base text-gray-700 px-3 py-2.5">
              Viewing {page * numberOfPage + 1}-{getLastNumber()} of {links?.length} results
            </p>
            <div className="flex">
              {page !== 0 && (
                <Button
                  className="mr-3 text-xs md:text-base"
                  variant="secondary"
                  onClick={onPreviewPagination}
                >
                  Prev
                </Button>
              )}
              {page + 1 < totalPages && (
                <Button
                  className="text-xs md:text-base"
                  variant="secondary"
                  onClick={onNextPagination}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLinkForm;
