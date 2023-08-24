import { laptop_note } from "@prisma/client"

export default function GetLatestLaptopNote(notes: any[]): laptop_note | null {
  const latestModifiedNote = notes.reduce(
    (latestNote: laptop_note | null, currentNote: laptop_note) => {
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