
import { RootState } from '@/util/lib/redux-toolkit/store';
import { ipad, laptop } from '@prisma/client';
import { useSelector } from 'react-redux';
import convertToDateIPadData from '../convert/to-date/convert-to-date-ipad-data';
import convertToDateLaptopData from '../convert/to-date/convert-to-date-laptop-data';

export default function GetDevice(deviceId: number, isIPad: boolean) {
  const iPadArray = convertToDateIPadData(useSelector((state: RootState) => state.iPadArray.array))
  const laptopArray = convertToDateLaptopData(useSelector((state: RootState) => state.laptopArray.array));
  if (isIPad)
    return iPadArray.find((ipad: ipad) => ipad.ipad_id === deviceId)
  else {
    return laptopArray.find((laptop: laptop) => laptop.laptop_id === deviceId)
  }
}
