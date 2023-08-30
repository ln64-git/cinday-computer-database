import { setUserDevice } from '@/util/lib/redux-toolkit/reducers/user-device-slice';
import { Checkbox, Input } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface DeviceInfoProps {
  device?: any;
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
    <>
      <div>
        <div className="flex justify-center mt-6 mb-10 text-2xl font-bold">
          {props.editFlag ? (
            <div className='flex flex-col justify-center items-center w-full'>
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
            <div className="flex justify-between items-center my-2 text-2xl ">
              <p className="text-left truncate">Software Version:</p>
              {props.editFlag ? (
                <Input
                  type="text"
                  name="software_version"
                  value={userDeviceState.software_version}
                  variant='flat'
                  onChange={handleInputChange}
                  classNames={{ base: ["w-1/2"], input: ["text-right"] }}
                />
              ) : (
                <p>{props.device?.software_version}</p>
              )}
            </div>
            <div className="flex justify-between items-center my-2 text-2xl ">
              <p className="text-left truncate">Internal Model ID:</p>
              {props.editFlag ? (
                <Input
                  type="text"
                  name="internal_model_id"
                  value={userDeviceState.internal_model_id}
                  variant='flat'
                  onChange={handleInputChange}
                  classNames={{ base: ["w-1/2"], input: ["text-right"] }}
                />
              ) : (
                <p>{props.device?.internal_model_id}</p>
              )}
            </div>
            <div className="flex justify-between items-center my-2 text-2xl ">
              <p className="text-left truncate">External Model ID:</p>
              {props.editFlag ? (
                <Input
                  type="text"
                  name="external_model_id"
                  value={userDeviceState.external_model_id}
                  variant='flat'
                  onChange={handleInputChange}
                  classNames={{ base: ["w-1/2"], input: ["text-right"] }}
                />
              ) : (
                <p>{props.device?.external_model_id}</p>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center my-2 text-2xl ">
          <p className="text-left truncate">Serial Number:</p>
          {props.editFlag ? (
            <Input
              type="text"
              name="serial_number"
              value={userDeviceState.serial_number}
              variant='flat'
              onChange={handleInputChange}
              classNames={{ base: ["w-1/2"], input: ["text-right"] }}
            />
          ) : (
            <p>{props.device?.serial_number}</p>
          )}
        </div>
        {!props.isIPad && (
          <div>
            <div className="flex justify-between items-center my-2 text-2xl ">
              <p className="text-left truncate">Springboro Tag ID:</p>
              {props.editFlag ? (
                <Input
                  type="text"
                  name="springboro_tag_id"
                  value={userDeviceState.springboro_tag_id}
                  variant='flat'
                  onChange={handleInputChange}
                  classNames={{ base: ["w-1/2"], input: ["text-right"] }}
                />
              ) : (
                <p>{props.device?.springboro_tag_id}</p>
              )}
            </div>
            <div className="flex justify-between items-center my-2 text-2xl ">
              <p className="text-left truncate">Aux Funds PO ID:</p>
              {props.editFlag ? (
                <Input
                  type="text"
                  name="aux_funds_po_id"
                  value={userDeviceState.aux_funds_po_id}
                  variant='flat'
                  onChange={handleInputChange}
                  classNames={{ base: ["w-1/2"], input: ["text-right"] }}
                />
              ) : (
                <p>{props.device?.aux_funds_po_id}</p>
              )}
            </div>
            <div className="flex justify-between items-center my-2 text-2xl ">
              <p className="text-left truncate">Cinday ID:</p>
              {props.editFlag ? (
                <Input
                  type="text"
                  name="cinday_id"
                  value={userDeviceState.cinday_id}
                  variant='flat'
                  onChange={handleInputChange}
                  classNames={{ base: ["w-1/2"], input: ["text-right"] }}
                />
              ) : (
                <p>{props.device?.cinday_id}</p>
              )}
            </div>
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
