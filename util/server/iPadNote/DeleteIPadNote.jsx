"use server"
import prisma from "../../util/prisma"

export default async function DeleteIPadNote({ noteId }) {
  await prisma.ipad_note.delete({
    where: { note_id: noteId },
  })
}
