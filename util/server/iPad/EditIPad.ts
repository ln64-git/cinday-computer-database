"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../../util/config/prisma"
import { ipad } from "@prisma/client"

interface editIPadProps { 
  userDevice: ipad
  deviceId: number
}

export default async function EditIPad(props: editIPadProps ) {
  try {
    await prisma.ipad.update({
      where: {
        ipad_id: props.deviceId,
      },
      data: {
        name: props.userDevice.name,
        software_version: props.userDevice.software_version,
        internal_model_id: props.userDevice.internal_model_id,
        external_model_id: props.userDevice.external_model_id,
        serial_number: props.userDevice.serial_number,
      },
    })
    revalidatePath("/ipads")
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
