"use server"
import prisma from "@/util/config/prisma"
import { laptop_note } from "@prisma/client"

interface editLaptopNoteProps {
  userDeviceNote: laptop_note
  noteId: number
}

export default async function EditLaptopNote(props: editLaptopNoteProps) {
  try {
    await prisma.laptop_note.update({
      where: {
        note_id: props.noteId,
      },
      data: {
        note_id: props.userDeviceNote.note_id,
        laptop_id: props.userDeviceNote.laptop_id,
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
