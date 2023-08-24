"use server"
import prisma from "../../util/prisma"

export default async function GetIPadNotes() {
  const iPadNotes = await prisma.ipad_note.findMany()
  return iPadNotes
}
