'use client';

import { supabaseClient } from '@/configs/supabase';
import { COOKIES_STORAGE_KEYS } from '@/constants/common';
import { getValue } from '@/helpers/storage';
import { User } from '@supabase/supabase-js';
import * as React from 'react';

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<{
  user: User | undefined;
  isFetching: boolean;
}>({
  user: undefined,
  isFetching: true,
});

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext must be used within provider!');
  }
  return context;
};

const AuthProvider: React.FunctionComponent<IAuthProviderProps> = (props) => {
  const [user, setUser] = React.useState<User>();
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    const accessToken = getValue(COOKIES_STORAGE_KEYS.ACCESS_TOKEN);
    if (!accessToken) {
      setIsFetching(false);
    } else handleGetUserInfo();
  }, []);

  const handleGetUserInfo = async () => {
    try {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      setUser(user || undefined);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  return <AuthContext.Provider value={{ user, isFetching }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
