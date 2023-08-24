"use server"
import prisma from "../../util/prisma"

export default async function GetLaptopNote(noteId) {
  return await prisma.laptop_note.findFirst({
    where: { note_id: { equals: noteId } },
  })
}
