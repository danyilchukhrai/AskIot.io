import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import CloseButtonMobile from '@/components/CloseButtonMobile';
import DropdownButton from '@/components/DropdownButton';
import LoadingIndicator from '@/components/LoadingIndicator';
import { USER_TYPE } from '@/configs/routeConfig';
import { AUTH_ENDPOINTS } from '@/constants/api-endpoints';
import { COOKIES_STORAGE_KEYS } from '@/constants/common';
import { AUTH_ROUTES, RESTRICTED_APP_ROUTES } from '@/constants/routes';
import { handleShowError } from '@/helpers/common';
import { destroy } from '@/helpers/storage';
import { useGetProviderStatus } from '@/modules/user/hooks';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import Menu from '../Menu';

interface ISidebarProps {
  onCloseSidebar?: () => void;
}

const Sidebar: FC<ISidebarProps> = (props) => {
  const { onCloseSidebar } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUserType, currentUserType } = useUserTypeContext();
  const { user } = useAuthContext();
  const { mutate: getProviderStatus, isPending: isGettingProviderStatus } = useGetProviderStatus();

  const handleLogout = async () => {
    setIsLoading(true);
    await fetch(AUTH_ENDPOINTS.LOGOUT, {
      method: 'POST',
    });
    setIsLoading(false);
    destroy(COOKIES_STORAGE_KEYS.ACCESS_TOKEN);
    window.location.href = AUTH_ROUTES.LOGIN;
  };

  const handleSwitchToProvider = () => {
    getProviderStatus('', {
      onSuccess: (data) => {
        const { status, response } = data || {};
        if (status) {
          setCurrentUserType(USER_TYPE.PROVIDER);
          router.push(`${RESTRICTED_APP_ROUTES.MY_COMPANY}`);
        } else if (status === null) {
          setCurrentUserType(USER_TYPE.PROVIDER_ONBOARDING);
          router.push(RESTRICTED_APP_ROUTES.VENDOR_ONBOARDING);
        } else {
          toast.info(response);
        }
      },
      onError: handleShowError,
    });
  };

  return (
    <>
      {isGettingProviderStatus && <LoadingIndicator />}
      <aside className="fixed left-0 top-0 bottom-0 h-screen w-full md:w-65 bg-white border-r border-gray-100 z-20">
        <div className="h-full flex flex-col justify-between">
          <div className="flex-1 relative">
            <div className="flex items-center justify-between md:px-10 px-4 pt-6 md:pt-6">
              <div className="flex items-center">
                <Link href="/app">
                  <Image
                    className="md:w-10 md:h-10 w-8 h-8"
                    src="/assets/logo/logo.svg"
                    width={40}
                    height={40}
                    alt="AskIoT"
                  />
                </Link>
                <h1 className="md:text-4xl text-3xl font-medium leading-normal font-['Maven_Pro'] md:ml-3.5 ml-2.5 text-black">
                  askIoT
                </h1>
              </div>
              <CloseButtonMobile onClick={onCloseSidebar} />
            </div>
            <div className="md:pt-12 md:pl-12 pt-6 pl-6">
              <Menu {...props} />
              {currentUserType === USER_TYPE.USER ? (
                <Button className="flex items-center md:text-s !px-0 !py-0 mt-6" variant="inline">
                  <img src="/assets/icons/ep-right-icon.svg" alt="icon" />
                  <span className="inline-block ml-3" onClick={handleSwitchToProvider}>
                    Switch to Provider
                  </span>
                </Button>
              ) : (
                <Button
                  className="flex items-center md:text-s !px-0 !py-0 mt-6"
                  variant="inline"
                  onClick={() => {
                    setCurrentUserType(USER_TYPE.USER);
                    router.push(RESTRICTED_APP_ROUTES.IOTGPT);
                  }}
                >
                  <img src="/assets/icons/ep-right-icon.svg" alt="icon" />
                  <span className="inline-block ml-3 break-all">Switch to Builders</span>
                </Button>
              )}
            </div>
          </div>
          <div className="px-4 py-6 md:px-10 md:py-8 flex items-center justify-between border-t border-gray-100">
            <div className="user-info flex flex-col items-end">
              <div className="flex items-center">
                <Avatar src="/assets/images/avatar-default.png" />
                <div className="ml-3.5">
                  <p className="text-base font-medium text-gray-1000 break-all mb-0.5 line-clamp-1">
                    {user?.email || user?.phone}
                  </p>
                </div>
              </div>
            </div>
            <DropdownButton
              dropdownMenu={[
                {
                  label: 'Logout',
                  onAction: handleLogout,
                },
              ]}
              menuPlacement="top"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
