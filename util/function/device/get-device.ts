
import { ipad, laptop } from '@prisma/client';
import { useSelector } from 'react-redux';

export default function GetDevice(deviceId: number, isIPad: boolean) {
  const iPadArray = useSelector((state: any) => state.iPadArray.array);
  const laptopArray = useSelector((state: any) => state.laptopArray.array);
  if (isIPad)
    return iPadArray.find((ipad: ipad) => ipad.ipad_id === deviceId)
  else {
    return laptopArray.find((laptop: laptop) => laptop.laptop_id === deviceId)
  }
}
