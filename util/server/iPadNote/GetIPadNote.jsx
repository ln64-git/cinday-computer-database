"use server"
import prisma from "../../util/prisma"

export default async function GetIPadNote(noteId) {
  return await prisma.ipad_note.findFirst({
    where: { note_id: { equals: noteId } },
  })
}
