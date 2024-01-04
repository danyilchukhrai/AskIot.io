import FormCheckBox from '@/components/FormComponents/FormCheckbox';
import FormInput from '@/components/FormComponents/FormInput';
import FormMultipleSelect from '@/components/FormComponents/FormMultipleSelect';
import FormSelect from '@/components/FormComponents/FormSelect';
import FormTextarea from '@/components/FormComponents/FormTextarea';
import UploadFileBox from '@/components/UploadFileBox';
import { IMAGE_ACCEPT_INPUT } from '@/constants/common';
import {
  createVendorProductCheckboxes,
  deviceTypeOptions,
  dualSimTypeOptions,
  emsOptions,
  fotaClientTypeOptions,
  industries,
  lteCategoryOptions,
  mmsOptions,
  natOptions,
  networkTechnologyOptions,
  operatingSystemOptions,
  securityLevelOptions,
  securityProtocolOptions,
  simTypeOptions,
  supportedGlobalMarkets,
  vnpSupportOptions,
} from '@/constants/vendor-product-form';
import { capitalize } from 'lodash';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface IDeviceFormProps {
  onSelectFile: (file: File) => void;
}

const DeviceForm: FC<IDeviceFormProps> = ({ onSelectFile }) => {
  const form = useFormContext();
  const generateGroupData = (array: any[]) =>
    array?.map((it: any) => ({
      label: it.group,
      options: it.items.map((it: any) => ({
        label: it,
        value: it,
      })),
    }));

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <div className="flex items-center gap-3">
        <p className="text-black text-l font-semibold">General Details</p>
        <img className="w-6 h-6" src="/assets/icons/arrow-down-circle-icon.svg" alt="icon" />
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
        <FormInput name="product_url" label="Url" placeholder="Enter url" />
        <FormInput name="product_name" label="Name" placeholder="Enter name" />
      </div>
      <FormTextarea
        name="key_features"
        label="Key Features (Please add a comma for multiple values)"
        placeholder="Enter key features"
        isShowTags
        rows={3}
      />
      <div className="flex items-center gap-3">
        <p className="text-black text-l font-semibold">Device Details</p>
        <img className="w-6 h-6" src="/assets/icons/arrow-down-circle-icon.svg" alt="icon" />
      </div>
      <FormTextarea
        name="product_description"
        label="Product description"
        placeholder="Enter product description"
        rows={3}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-x-15 gap-y-4">
        <FormSelect
          name="device_type"
          label="Device type"
          placeholder="Device type"
          options={deviceTypeOptions}
        />
        <FormSelect
          name="specifications.network_technology"
          label="Network technology"
          placeholder="Network technology"
          options={networkTechnologyOptions}
        />
        <FormSelect
          name="specifications.lte_category_support"
          label="LTE Category support"
          placeholder="LTE Category support"
          options={lteCategoryOptions}
        />
        <FormSelect
          name="specifications.sim_type"
          label="Sim type"
          placeholder="Sim type"
          options={simTypeOptions}
        />
        <FormSelect
          name="specifications.security_level"
          label="Security level"
          placeholder="Security level"
          options={securityLevelOptions}
        />
        <FormSelect name="specifications.ems" label="Ems" placeholder="Ems" options={emsOptions} />
        <FormSelect name="specifications.mms" label="MMS" placeholder="MMS" options={mmsOptions} />
        <FormSelect
          name="specifications.fota_client_type"
          label="Fota client type"
          placeholder="Fota client type"
          options={fotaClientTypeOptions}
        />
        <FormSelect
          name="specifications.operating_system"
          label="Operating system"
          placeholder="Operating system"
          options={operatingSystemOptions}
        />
        <FormSelect
          name="specifications.dual_sim_type"
          label="Dual sim type"
          placeholder="Dual sim type"
          options={dualSimTypeOptions}
        />
        <FormMultipleSelect
          name="specifications.nat"
          label="NAT"
          placeholder="NAT"
          options={natOptions.map((it) => ({
            label: it,
            value: it,
          }))}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-15 gap-y-4">
        {createVendorProductCheckboxes.map((it, index) => (
          <FormCheckBox
            isToggle
            key={index}
            name={`specifications.${it}`}
            label={capitalize(it.split('_').join(' '))}
          />
        ))}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-x-15 gap-y-4">
        <FormInput
          type="number"
          name="specifications.antenna"
          label="Antenna"
          placeholder="Enter antenna"
        />
        <FormInput
          type="number"
          name="specifications.battery"
          label="Battery"
          placeholder="Enter battery"
        />
        <FormInput
          name="specifications.display_resolution"
          label="Display Resolution"
          placeholder="Enter display resolution"
        />
        <FormInput
          type="number"
          name="specifications.ethernet_ports"
          label="Ethernet ports"
          placeholder="Enter ethernet ports"
        />
        <FormInput
          type="number"
          name="specifications.usb_ports"
          label="Usb ports"
          placeholder="Enter usb ports"
        />
        <FormInput
          type="number"
          name="specifications.weight"
          label="Weight"
          placeholder="Enter weight"
          endAdornment={<span className="text-base text-gray-1000">Kg</span>}
        />
        <FormInput
          name="specifications.operating_temperature"
          label="Operating temperature"
          placeholder="Enter operating temperature"
        />
        <FormInput
          type="number"
          name="specifications.storage_temperature"
          label="Storage temperature"
          placeholder="Enter storage temperature"
        />
        <FormInput
          type="number"
          name="specifications.relative_humidity"
          label="Relative humidity"
          placeholder="Enter relative humidity"
        />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-x-15 gap-y-4">
        <FormMultipleSelect
          name="specifications.supported_global_markets"
          label="Supported Global markets"
          options={generateGroupData(supportedGlobalMarkets)}
          placeholder="Supported Global markets"
        />
        <FormMultipleSelect
          name="industries"
          label="Industries"
          options={generateGroupData(industries)}
          placeholder="Industries"
        />
        <FormMultipleSelect
          name="specifications.security_protocol"
          label="Security Protocol"
          options={securityProtocolOptions}
          placeholder="Security Protocol"
        />
        <FormMultipleSelect
          name="specifications.vpn_support"
          label="Vpn support"
          options={vnpSupportOptions}
          placeholder="Vpn support"
        />
      </div>
      <div className="grid grid-cols-1">
        <UploadFileBox
          accept={IMAGE_ACCEPT_INPUT}
          onSelectFile={onSelectFile}
          errorMessage={form.formState.errors?.file?.message as string}
          url={form.getValues('product_image')}
        />
      </div>
    </div>
  );
};

export default DeviceForm;
