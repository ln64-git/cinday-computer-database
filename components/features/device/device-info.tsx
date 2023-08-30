import { setUserDevice } from '@/util/lib/redux-toolkit/reducers/user-device-slice';
import { Checkbox, Input } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface DeviceInfoProps {
  device?: any,
  isIPad: boolean,
  editFlag: boolean
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

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserDevice(userDeviceState))
  }, [userDeviceState, dispatch])


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDeviceState((prevUserDevice) => ({
      ...prevUserDevice,
      [name]: value,
    }));
  };


  return (
    <>
      <div>
        <div className="flex justify-center mt-6 mb-10 text-2xl font-bold">
          {props.editFlag ? (
            <div className='flex flex-col justify-center items-center w-full'>
              {/* <span className="font-bold">Name</span> */}
              <Input
                name="name"
                placeholder='name'
                value={userDeviceState.name}
                onChange={handleInputChange}
                variant='flat'
                classNames={{ base: ["w-1/2 mt-4"], input: ["text-center"] }}
              />
            </div>
          ) : (
            <p>{props.device?.name}</p>
          )}
        </div>
        {props.isIPad && (
          <div>
            <InputField
              label="Software Version:"
              value={userDeviceState.software_version}
              name="software_version"
              editFlag={props.editFlag}
              handleInputChange={handleInputChange}
            />
            <InputField
              label="Internal Model ID:"
              value={userDeviceState.internal_model_id}
              name="internal_model_id"
              editFlag={props.editFlag}
              handleInputChange={handleInputChange}
            />
            <InputField
              label="External Model ID:"
              value={userDeviceState.external_model_id}
              name="external_model_id"
              editFlag={props.editFlag}
              handleInputChange={handleInputChange}
            />
          </div>
        )}
        <InputField
          label="Serial Number:"
          value={userDeviceState.serial_number}
          name="serial_number"
          editFlag={props.editFlag}
          handleInputChange={handleInputChange}
        />
        {!props.isIPad && (
          <div>
            <InputField
              label="Springboro Tag ID:"
              value={userDeviceState.springboro_tag_id}
              name="springboro_tag_id"
              editFlag={props.editFlag}
              handleInputChange={handleInputChange}
            />
            <InputField
              label="Aux Funds PO ID:"
              value={userDeviceState.aux_funds_po_id}
              name="aux_funds_po_id"
              editFlag={props.editFlag}
              handleInputChange={handleInputChange}
            />
            <InputField
              label="Cinday ID:"
              value={userDeviceState.cinday_id}
              name="cinday_id"
              editFlag={props.editFlag}
              handleInputChange={handleInputChange}
            />
          </div>
        )}
        <div className='flex justofy-center items-center w-full'>
          {props.editFlag && (
            <div className="flex justify-between items-center text-2xl mt-8 w-full">
              <p className="text-center truncate w-1/2">Repair flag?</p>
              <div className='w-1/2  text-center'>
                <Checkbox size='lg' />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


interface InputFieldProps {
  label: string,
  value: string,
  name: string,
  editFlag: boolean,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  name,
  editFlag,
  handleInputChange
}) => {
  return (
    <div className="flex justify-between items-center my-2 text-2xl ">
      <p className="text-left truncate">{label}</p>
      {editFlag ? (
        <Input
          type="text"
          name={name}
          value={value}
          variant='flat'
          onChange={handleInputChange}
          classNames={{ base: ["w-1/2"], input: ["text-right"] }}
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
};
