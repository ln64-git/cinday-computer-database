"use server"
import prisma from "@/util/config/prisma"
import { laptop } from "@prisma/client"


interface editIPadProps {
  userDevice: laptop
  deviceId: number
}

export default async function EditLaptop(props: editIPadProps) {
  try {
    await prisma.laptop.update({
      where: {
        laptop_id: props.deviceId,
      },
      data: {
        laptop_id: props.userDevice.laptop_id,
        name: props.userDevice.name,
        serial_number: props.userDevice.serial_number,
        springboro_tag_id: props.userDevice.springboro_tag_id,
        aux_funds_po_id: props.userDevice.aux_funds_po_id,
        cinday_id: props.userDevice.cinday_id,
      },
    })
    console.log(`${props.userDevice.name} edited.`)
  } catch (error) {
    console.log(`${props.userDevice.name} edit failure.`)
    console.log(error)
  }
}
