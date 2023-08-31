
import { ipad_note, laptop_note } from '@prisma/client';
import { useSelector } from 'react-redux';

export default function GetDeviceNoteArray(deviceId: number, isIPad: boolean) {
  const iPadNoteArray = useSelector((state: any) => state.iPadNoteArray.array);
  const laptopNoteArray = useSelector((state: any) => state.laptopNoteArray.array);
  if (isIPad) {
    return iPadNoteArray.filter((note: ipad_note) => note.ipad_id === deviceId)
  } else {
    return laptopNoteArray.filter((note: laptop_note) => note.laptop_id === deviceId)
  }
}
