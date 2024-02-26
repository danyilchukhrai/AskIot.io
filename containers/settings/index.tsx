import { BILLING_SETTINGS_URL } from '@/configs/appConfig';
import { USER_TYPE } from '@/configs/routeConfig';
import { useUserContext } from '@/providers/UserProvider';
import { useUserTypeContext } from '@/providers/UserTypeProvider';
import Link from 'next/link';
import { FC } from 'react';
import ProviderSettings from './components/ProviderSettingsForm';

interface ISettingsProps {}

const Settings: FC<ISettingsProps> = (props) => {
  const { isNoPaymentStatus } = useUserContext();
  const { allowedUserTypes } = useUserTypeContext();
  return (
    <section className="min-h-screen p-8">
      <div className="lg:w-4/5 mx-auto flex flex-col gap-10">
        {isNoPaymentStatus && !allowedUserTypes?.includes(USER_TYPE.PROVIDER) && (
          <p className="text-gray-1000 text-xl font-medium">Settings</p>
        )}
        {allowedUserTypes?.includes(USER_TYPE.PROVIDER) && (
          <div>
            <p className="text-gray-1000 text-xl font-medium">Provider Settings</p>
            <ProviderSettings />
          </div>
        )}
        {isNoPaymentStatus === false && (
          <div>
            <p className="text-gray-1000 text-xl font-medium">Billing Settings</p>
            <Link
              className="text-primary-500 pt-10 inline-block"
              href={BILLING_SETTINGS_URL as string}
              target="_blank"
            >
              Click here to settings your billing
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Settings;
