
import { ipad_note, laptop_note } from '@prisma/client';
import { useSelector } from 'react-redux';

export default function GetDeviceNote(noteId: number, isIPad: boolean) {
  const iPadNoteArray = useSelector((state: any) => state.iPadNoteArray.array);
  const laptopNoteArray = useSelector((state: any) => state.laptopNoteArray.array);
  if (isIPad) {
    const note = iPadNoteArray.find((note: ipad_note) => note.note_id === noteId)
    return { note }
  } else {
    const note = laptopNoteArray.find((note: laptop_note) => note.note_id === noteId)
    return { note }
  }
}
