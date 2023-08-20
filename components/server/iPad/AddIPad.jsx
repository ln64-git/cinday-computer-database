"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../util/prisma"

export default async function AddIPad({ iPad }) {

  try {
    await prisma.ipad.create({
      data: {
        ipad_id: iPad.ipad_id,
        name: iPad.name,
        software_version: iPad.software_version,
        internal_model_id: iPad.internal_model_id,
        external_model_id: iPad.external_model_id,
        serial_number: iPad.serial_number,
      },
    })
    revalidatePath("/ipads")
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
