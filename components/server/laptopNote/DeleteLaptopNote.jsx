"use server"
import { PrismaClient } from "@prisma/client"

export default async function DeleteLaptopNote({ noteId }) {
  const prisma = new PrismaClient()
  const id = parseInt(noteId, 10)
  try {
    await prisma.laptop_note.delete({
      where: { note_id: id },
    })
    console.log("Database Success")
  } catch (error) {
    console.log(noteId)
    console.log("Database fail")
    console.log(error)
  }
}
