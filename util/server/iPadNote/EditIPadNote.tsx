"use server"
import prisma from "@/util/config/prisma"
import { ipad_note } from "@prisma/client"

interface editIPadNoteProps {
  userDeviceNote: ipad_note
  noteId: number
}

export default async function EditIPadNote(props: editIPadNoteProps) {
  try {
    await prisma.ipad_note.update({
      where: {
        note_id: props.noteId,
      },
      data: {
        note_id: props.userDeviceNote.note_id,
        ipad_id: props.userDeviceNote.ipad_id,
        name: props.userDeviceNote.name,
        summary: props.userDeviceNote.summary,
      },
    })
    console.log(`${props.userDeviceNote.name} edited.`)
  } catch (e) {
    console.log(`${props.userDeviceNote.name} Failed to edit.`)
    console.log(e)
  }
}
