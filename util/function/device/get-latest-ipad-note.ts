import { ipad_note } from "@prisma/client"

export default function GetLatestIPadNote(
  notes: any[],
  deviceId: number,
): ipad_note | null {
  const deviceNotes = notes.filter(
    (note: ipad_note) => note.ipad_id === deviceId,
  )
  const latestModifiedNote = deviceNotes.reduce(
    (latestNote: ipad_note | null, currentNote: ipad_note) => {
      if (!latestNote || currentNote.date_modified > latestNote.date_modified) {
        return currentNote
      } else {
        return latestNote
      }
    },
    null,
  )
  return latestModifiedNote
}