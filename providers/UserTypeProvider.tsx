'use client';

import { USER_TYPE, routeConfig } from '@/configs/routeConfig';
import { handleShowError } from '@/helpers/common';
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

// Temporary
const HARDCORE_VENDOR_SLUG = 'test-company-extraordinaire';

const UserTypeContext = createContext<{
  currentUserType?: USER_TYPE;
  setCurrentUserType: Dispatch<SetStateAction<USER_TYPE | undefined>>;
  allowedUserTypes?: USER_TYPE[];
  vendorId?: string | number;
  isVendor: boolean;
}>({
  currentUserType: USER_TYPE.USER,
  setCurrentUserType: () => {},
  allowedUserTypes: [USER_TYPE.USER],
  vendorId: undefined,
  isVendor: false,
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
  const [allowedUserTypes, setAllowedUserTypes] = useState<USER_TYPE[]>();
  const [vendorId, setVendorId] = useState<string | number>();
  const { mutateAsync: getProviderStatus } = useGetProviderStatus();
  const { user, isFetching } = useAuthContext();

  useEffect(() => {
    if (isFetching) return;
    if (user) {
      handleSetAllowedUserTypes();
    } else {
      setAllowedUserTypes([]);
    }
  }, [user, isFetching]);

  useEffect(() => {
    // Set user type when route change
    if (allowedUserTypes) handleSetUserTypeByPathname(pathname, allowedUserTypes);
  }, [pathname, allowedUserTypes]);

  const handleSetAllowedUserTypes = () => {
    getProviderStatus('', {
      onSuccess: (data) => {
        const { status, vendorid, vendorslug = '' } = data || {};
        if (status) {
          const vendorSlug = vendorslug || HARDCORE_VENDOR_SLUG;
          (vendorid || vendorSlug) && setVendorId(vendorSlug || vendorid);
          setAllowedUserTypes([USER_TYPE.USER, USER_TYPE.PROVIDER]);
        } else if (status === null) {
          setAllowedUserTypes([USER_TYPE.USER, USER_TYPE.PROVIDER_ONBOARDING]);
        } else {
          setAllowedUserTypes([USER_TYPE.USER]);
        }
      },
      onError: (data) => {
        handleShowError(data);
        setAllowedUserTypes([USER_TYPE.USER]);
        handleSetUserTypeByPathname(pathname, [USER_TYPE.USER]);
      },
    });
  };

  const handleSetUserTypeByPathname = (pathname: string, allowedUserTypes: USER_TYPE[]) => {
    let userType = USER_TYPE.USER;
    userType = Object.entries(routeConfig).find(([key, value]) =>
      Object.values(value).some((it) => pathname?.includes(it)),
    )?.[0] as USER_TYPE;

    if (userType && allowedUserTypes.includes(userType)) {
      setCurrentUserType(userType);
    } else if (!userType && !currentUserType) {
      setCurrentUserType(USER_TYPE.USER);
    } else if (!allowedUserTypes.includes(userType)) {
      setCurrentUserType(USER_TYPE.USER);
    }
  };

  return (
    <UserTypeContext.Provider
      value={{
        currentUserType,
        setCurrentUserType,
        allowedUserTypes,
        vendorId,
        isVendor: currentUserType === USER_TYPE.PROVIDER,
      }}
    >
      {children}
    </UserTypeContext.Provider>
  );
};

export default UserTypeProvider;
