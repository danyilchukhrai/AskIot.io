'use client';

import { createAskIotUser, getAskIotUserDetails } from '@/services/user';
import { IAskIOTUserDetails } from '@/types/user';
import * as React from 'react';

interface IUserProviderProps {
  children: React.ReactNode;
}
interface IUserContext {
  askIOTUserDetails: IAskIOTUserDetails | null;
  setAskIOTUserIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = React.createContext<IUserContext>({} as IUserContext);

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('AuthContext must be used within provider!');
  }
  return context;
};

const UserProvider: React.FunctionComponent<IUserProviderProps> = (props) => {
  const [askIOTUserDetails, setAskIOTUserDetails] = React.useState<IAskIOTUserDetails | null>(null);
  const [getAskIOTUserIsValid, setAskIOTUserIsValid] = React.useState(true);

  const userFlow = async () => {
    const userData = await getAskIotUserDetails();
    if (userData === null) {
      const createUser = await createAskIotUser();
      if (createUser) {
        setAskIOTUserDetails(createUser);
      }
    } else {
      setAskIOTUserDetails(userData);
    }
  };

  React.useEffect(() => {
    if (getAskIOTUserIsValid) {
      userFlow();
      setAskIOTUserIsValid(false);
    }
  }, [getAskIOTUserIsValid]); //eslint-disable-line

  return (
    <UserContext.Provider value={{ askIOTUserDetails, setAskIOTUserIsValid }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
