"use server"
import prisma from "../../util/prisma"

export default async function AddLaptopNote({ note }) {
  try {
    await prisma.laptop_note.create({
      data: {
        note_id: note.note_id,
        laptop_id: note.laptop_id,
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
