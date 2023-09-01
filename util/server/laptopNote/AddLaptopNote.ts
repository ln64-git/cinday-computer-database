'use server'
import prisma from '@/util/config/prisma'
import { laptop_note } from '@prisma/client'

export default async function AddLaptopNote(newLaptopNote: laptop_note, deviceId: number) {
  try {
    const inputData: laptop_note = {
      note_id: newLaptopNote.note_id,
      laptop_id: deviceId,
      name: newLaptopNote.name,
      summary: newLaptopNote.summary,
      date_created: newLaptopNote.date_created,
      date_modified: newLaptopNote.date_modified,
    }

    await prisma.laptop_note.create({
      data: inputData,
    })
    console.log(`${newLaptopNote.name} Added to iPad database.`)
  } catch (error) {
    console.log(`${newLaptopNote.name} Failed to add to iPad database.`)
    console.log(error)
  }
}
