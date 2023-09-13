import { ipad_note, laptop_note } from "@prisma/client";
import { useSelector } from "react-redux";

export default function GetLatestDeviceNote(deviceId: number, isIPad: boolean) {
  const noteArray = useSelector((state: any) =>
    isIPad ? state.iPadNoteArray.array : state.laptopNoteArray.array
  );
  const deviceNoteArray = noteArray.filter((note: ipad_note) => note.ipad_id === deviceId)


  const latestModifiedNote = deviceNoteArray.reduce(
    (latestNote: laptop_note | ipad_note, currentNote: laptop_note | ipad_note) =>
      !latestNote || currentNote.date_modified > latestNote.date_modified
        ? currentNote
        : latestNote,
    null
  );

  return latestModifiedNote;
}
