"use server"
import prisma from "../../util/prisma"

export default async function EditIPadNote({ iPadNote }) {
  const id = parseInt(iPadNote.note_id, 10)
  try {
    await prisma.ipad_note.update({
      where: {
        note_id: id,
      },
      data: {
        note_id: parseInt(iPadNote.note_id, 10),
        ipad_id: parseInt(iPadNote.ipad_id, 10),
        name: iPadNote.name,
        summary: iPadNote.summary,
      },
    })
    console.log("iPad Note Edited")
  } catch (e) {
    console.log("ipad note not edited")
    console.log(e)
  }
}
