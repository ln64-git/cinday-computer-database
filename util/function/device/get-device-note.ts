
import { RootState } from '@/util/lib/redux-toolkit/store';
import { ipad_note, laptop_note } from '@prisma/client';
import { useSelector } from 'react-redux';
import convertToDateIPadData from '../convert/to-date/convert-to-date-ipad-data';

export default function GetDeviceNote(noteId: number, isIPad: boolean) {
  const iPadNoteArray = convertToDateIPadData(useSelector((state: RootState) => state.iPadNoteArray.array))
  const laptopNoteArray = convertToDateIPadData(useSelector((state: RootState) => state.laptopNoteArray.array))
  if (isIPad) {
    const note = iPadNoteArray.find((note: ipad_note) => note.note_id === noteId)
    return { note }
  } else {
    const note = laptopNoteArray.find((note: laptop_note) => note.note_id === noteId)
    return { note }
  }
}
