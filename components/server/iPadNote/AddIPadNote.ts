'use server'
import prisma from '@/util/prisma'
import { ipad_note } from '@prisma/client'

export default async function AddIPadNote(newIPadNote: ipad_note) {
  try {
    const inputData: ipad_note = {
      note_id: newIPadNote.note_id,
      ipad_id: newIPadNote.ipad_id,
      name: newIPadNote.name,
      summary: newIPadNote.summary,
      date_created: newIPadNote.date_created,
      date_modified: newIPadNote.date_modified,
    }

    await prisma.ipad_note.create({
      data: inputData,
    })
    console.log(`${newIPadNote.name} Added to iPad database.`)
  } catch (error) {
    console.log(`${newIPadNote.name} Failed to add to iPad database.`)
    console.log(error)
  }
}
