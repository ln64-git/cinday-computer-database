'use server'
import prisma from '@/util/config/prisma'
import { getNextDeviceId } from '@/util/function/get-next-id'
import { ipad_note } from '@prisma/client'

export default async function AddIPadNote(newIPadNote: ipad_note, deviceId: number) {
  const inputData: ipad_note = {
    note_id: await getNextDeviceId({ deviceArray: await prisma.ipad_note.findMany(), deviceType: "note" }),
    ipad_id: deviceId,
    name: newIPadNote.name,
    summary: newIPadNote.summary,
    date_created: new Date(),
    date_modified: new Date(),
  }

  try {
    await prisma.ipad_note.create({
      data: inputData,
    })
    console.log(`${newIPadNote.name} Added to iPad database.`)
  } catch (error) {
    console.log(`${newIPadNote.name} Failed to add to iPad database.`)
    console.log(error)
  }
}
