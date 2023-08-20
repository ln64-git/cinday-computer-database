"use server"
import prisma from "../../util/prisma"

export default async function EditLaptopNote({ note }) {
  const id = parseInt(note.note_id, 10)
  try {
    await prisma.laptop_note.update({
      where: {
        note_id: id,
      },
      data: {
        note_id: parseInt(note.note_id, 10),
        laptop_id: parseInt(note.laptop_id, 10),
        name: note.name,
        summary: note.summary,
      },
    })
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
