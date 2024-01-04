'use client';

import { API_ENDPOINT } from '@/configs/appConfig';
import { COOKIES_STORAGE_KEYS } from '@/constants/common';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import { getValue } from '@/helpers/storage';
import { IUserQuoteSnippets } from '@/types/user';
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

interface IQuoteSnippetsProps {
  children: ReactNode;
}

interface IQuoteSnippetsContext {
  quotesSnippetsLoading: boolean;
  setGetQuotesSnippetsIsValid: Dispatch<SetStateAction<boolean>>;
  quotesSnippets: IUserQuoteSnippets[] | null;
  isQuoteRequested: { [key: number]: boolean };
  setIsQuoteRequested: Dispatch<
    SetStateAction<{
      [key: number]: boolean;
    }>
  >;
  isQuoteRequestedLoading: boolean;
  setIsQuoteRequestedLoading: Dispatch<SetStateAction<boolean>>;
}

const QuoteSnippetsContext = createContext<IQuoteSnippetsContext>({} as IQuoteSnippetsContext);

export const useQuoteSnippetContext = () => {
  const context = useContext(QuoteSnippetsContext);
  if (!context) {
    throw new Error('AuthContext must be used within provider!');
  }
  return context;
};

const QuoteSnippetProvider: FC<IQuoteSnippetsProps> = (props) => {
  const [quotesSnippets, setQuotesSnippets] = useState<IUserQuoteSnippets[] | null>(null);
  const [quotesSnippetsLoading, setQuotesSnippetsLoading] = useState(true);
  const [getQuotesSnippetsIsValid, setGetQuotesSnippetsIsValid] = useState(true);
  const [isQuoteRequested, setIsQuoteRequested] = useState<{ [key: number]: boolean }>({});
  const [isQuoteRequestedLoading, setIsQuoteRequestedLoading] = useState(true);

  const getUserQuotesSnippets = async () => {
    const accessToken = getValue(COOKIES_STORAGE_KEYS.ACCESS_TOKEN);
    if (!accessToken) return;
    try {
      const snippetsData = await askIOTApiFetch(
        `${API_ENDPOINT}/private/quotes/user/quotes/snippet`,
      );
      setQuotesSnippets(snippetsData);
      setQuotesSnippetsLoading(false);
    } catch (error: any) {
      const errorData = await error?.json();
      setQuotesSnippetsLoading(false);
      toast.error(errorData?.message || 'Failed, to get snippets.');
    }
  };

  useEffect(() => {
    if (getQuotesSnippetsIsValid) {
      getUserQuotesSnippets();
      setGetQuotesSnippetsIsValid(false);
    }
  }, [getQuotesSnippetsIsValid]);

  return (
    <QuoteSnippetsContext.Provider
      value={{
        quotesSnippetsLoading,
        setGetQuotesSnippetsIsValid,
        quotesSnippets,
        isQuoteRequested,
        setIsQuoteRequested,
        isQuoteRequestedLoading,
        setIsQuoteRequestedLoading,
      }}
    >
      {props.children}
    </QuoteSnippetsContext.Provider>
  );
};

export default QuoteSnippetProvider;
