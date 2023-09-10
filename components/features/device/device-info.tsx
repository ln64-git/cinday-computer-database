import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox, Input } from '@nextui-org/react';
import { setUserDevice } from '@/util/lib/redux-toolkit/reducers/user-device-slice';
import { device } from '@/util/types/device';

interface DeviceInfoProps {
  device?: device;
  isIPad: boolean;
  editFlag: boolean;
}

export default function DeviceInfo(props: DeviceInfoProps) {
  const [userDeviceState, setUserDeviceState] = useState({
    name: props.device?.name || '',
    software_version: props.device?.software_version || '',
    internal_model_id: props.device?.internal_model_id || '',
    external_model_id: props.device?.external_model_id || '',
    serial_number: props.device?.serial_number || '',
    springboro_tag_id: props.device?.springboro_tag_id || '',
    aux_funds_po_id: props.device?.aux_funds_po_id || '',
    cinday_id: props.device?.cinday_id || '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserDevice(userDeviceState));
  }, [userDeviceState, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDeviceState((prevUserDevice) => ({
      ...prevUserDevice,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="flex justify-center mt-6 mb-10 text-2xl font-bold">
        {props.editFlag ? (
          <div className="flex flex-col justify-center items-center w-full">
            <Input
              name="name"
              placeholder="Name"
              value={userDeviceState.name}
              onChange={handleInputChange}
              variant="flat"
              classNames={{ base: ["w-2/3 mt-4"], input: ["text-center"] }}
            />
          </div>
        ) : (
          <p>{props.device?.name}</p>
        )}
      </div>
      {props.isIPad ? (
        <IPadFields userDeviceState={userDeviceState} editFlag={props.editFlag} onChange={handleInputChange} />
      ) : (
        <NonIPadFields userDeviceState={userDeviceState} editFlag={props.editFlag} onChange={handleInputChange} />
      )}
      <div className="flex justify-center items-center w-full">
        {props.editFlag && (
          <div className="flex justify-between items-center text-2xl mt-8 w-full">
            <p className="text-center truncate w-1/2">Repair flag?</p>
            <div className="w-1/2 text-center">
              <Checkbox size="lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface FieldsProps {
  userDeviceState: typeof initialState;
  editFlag: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function IPadFields(props: FieldsProps) {
  return (
    <div>
      <DeviceInfoField
        label="Software Version:"
        name="software_version"
        value={props.userDeviceState.software_version}
        editFlag={props.editFlag}
        onChange={props.onChange}
      />
      <DeviceInfoField
        label="Internal Model ID:"
        name="internal_model_id"
        value={props.userDeviceState.internal_model_id}
        editFlag={props.editFlag}
        onChange={props.onChange}
      />
      <DeviceInfoField
        label="External Model ID:"
        name="external_model_id"
        value={props.userDeviceState.external_model_id}
        editFlag={props.editFlag}
        onChange={props.onChange}
      />
      <DeviceInfoField
        label="Serial Number"
        name="serial_number"
        value={props.userDeviceState.serial_number}
        editFlag={props.editFlag}
        onChange={props.onChange}
      />
    </div>
  );
}

function NonIPadFields(props: FieldsProps) {
  return (
    <div>
      <DeviceInfoField
        label="Serial Number:"
        name="serial_number"
        value={props.userDeviceState.serial_number}
        editFlag={props.editFlag}
        onChange={props.onChange}
      />
      <DeviceInfoField
        label="Springboro Tag ID:"
        name="springboro_tag_id"
        value={props.userDeviceState.springboro_tag_id}
        editFlag={props.editFlag}
        onChange={props.onChange}
      />
      <DeviceInfoField
        label="Aux Funds PO ID:"
        name="aux_funds_po_id"
        value={props.userDeviceState.aux_funds_po_id}
        editFlag={props.editFlag}
        onChange={props.onChange}
      />
      <DeviceInfoField
        label="Cinday ID:"
        name="cinday_id"
        value={props.userDeviceState.cinday_id}
        editFlag={props.editFlag}
        onChange={props.onChange}
      />
    </div>
  );
}

interface DeviceInfoFieldProps {
  label: string;
  name: string;
  value: string;
  editFlag: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function DeviceInfoField(props: DeviceInfoFieldProps) {
  return (
    <div className="flex justify-between items-center my-2 text-2xl">
      <p className="text-left truncate">{props.label}</p>
      {props.editFlag ? (
        <Input
          type="text"
          name={props.name}
          value={props.value}
          variant="flat"
          onChange={props.onChange}
          classNames={{ base: ["w-1/2"], input: ["text-right"] }}
        />
      ) : (
        <p>{props.value}</p>
      )}
    </div>
  );
}

const initialState = {
  name: '',
  software_version: '',
  internal_model_id: '',
  external_model_id: '',
  serial_number: '',
  springboro_tag_id: '',
  aux_funds_po_id: '',
  cinday_id: '',
};
