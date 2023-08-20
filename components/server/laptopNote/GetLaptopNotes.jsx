"use server"
import prisma from "../../util/prisma"

export default async function GetLaptopNotes() {
  const laptopNotes = await prisma.laptop_note.findMany()
  return laptopNotes
}
