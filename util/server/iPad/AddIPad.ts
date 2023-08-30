'use server'
import prisma from '@/util/config/prisma'
import { ipad } from '@prisma/client'

export default async function AddIPad(newIPad: ipad) {
  try {
    const inputData: ipad = {
      ipad_id: newIPad.ipad_id,
      name: newIPad.name,
      software_version: newIPad.software_version,
      internal_model_id: newIPad.internal_model_id,
      external_model_id: newIPad.external_model_id,
      serial_number: newIPad.serial_number,
      date_created: new Date(),
      date_modified: new Date(),
      flag_repair: false
    }
    await prisma.ipad.create({
      data: inputData,
    })
    console.log(`${inputData.name} Added to ipad database.`)
  } catch (error) {
    console.log(`${newIPad} Failed to add to ipad database.`)
    console.log(error)
  }
}
