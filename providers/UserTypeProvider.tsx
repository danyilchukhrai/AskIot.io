'use client';

import { USER_TYPE, routeConfig } from '@/configs/routeConfig';
import { useGetProviderStatus } from '@/modules/user/hooks';
import { usePathname } from 'next/navigation';
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuthContext } from './AuthProvider';

const UserTypeContext = createContext<{
  currentUserType?: USER_TYPE;
  setCurrentUserType: Dispatch<SetStateAction<USER_TYPE | undefined>>;
  allowedUserTypes: USER_TYPE[];
  vendorId?: string | number;
  isCheckingProviderStatus: boolean;
}>({
  currentUserType: USER_TYPE.USER,
  setCurrentUserType: () => {},
  allowedUserTypes: [USER_TYPE.USER],
  vendorId: undefined,
  isCheckingProviderStatus: true,
});

export const useUserTypeContext = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error('UserTypeContext must be used within provider!');
  }
  return context;
};

interface IUserTypeProvider {
  children: React.ReactNode;
}

const UserTypeProvider: FC<IUserTypeProvider> = ({ children }) => {
  const pathname = usePathname();
  const [currentUserType, setCurrentUserType] = useState<USER_TYPE>();
  const [allowedUserTypes, setAllowedUserTypes] = useState([
    USER_TYPE.USER,
    USER_TYPE.PROVIDER_ONBOARDING,
  ]);
  const [vendorId, setVendorId] = useState<string | number>();
  const [isCheckingProviderStatus, setIsCheckingProviderStatus] = useState(true);
  const { mutateAsync: getProviderStatus } = useGetProviderStatus();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      handleSetAllowedUserTypes();
    } else {
      setIsCheckingProviderStatus(false);
    }
  }, [user]);

  const handleSetAllowedUserTypes = async () => {
    setIsCheckingProviderStatus(true);
    await getProviderStatus('', {
      onSuccess: (data) => {
        const { status, vendorid } = data || {};
        if (status) {
          vendorid && setVendorId(vendorid);
          setAllowedUserTypes([USER_TYPE.USER, USER_TYPE.PROVIDER]);
          handleSetUserTypeByPathname(pathname, [USER_TYPE.USER, USER_TYPE.PROVIDER]);
        } else if (status === null) {
          setAllowedUserTypes([USER_TYPE.USER, USER_TYPE.PROVIDER_ONBOARDING]);
          handleSetUserTypeByPathname(pathname, [USER_TYPE.USER, USER_TYPE.PROVIDER_ONBOARDING]);
        } else {
          setAllowedUserTypes([USER_TYPE.USER]);
          handleSetUserTypeByPathname(pathname, [USER_TYPE.USER]);
        }
      },
      onSettled: () => {
        setIsCheckingProviderStatus(false);
      },
    });
  };

  const handleSetUserTypeByPathname = (pathname: string, allowedUserTypes: USER_TYPE[]) => {
    let userType = USER_TYPE.USER;
    userType = Object.entries(routeConfig).find(([key, value]) =>
      Object.values(value).includes(pathname),
    )?.[0] as USER_TYPE;

    if (allowedUserTypes.includes(userType)) setCurrentUserType(userType);
  };

  return (
    <UserTypeContext.Provider
      value={{
        currentUserType,
        setCurrentUserType,
        allowedUserTypes,
        vendorId,
        isCheckingProviderStatus,
      }}
    >
      {children}
    </UserTypeContext.Provider>
  );
};

export default UserTypeProvider;
