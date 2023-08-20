"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../util/prisma"

export default async function EditLaptop({ laptop }) {
  const laptopId = parseInt(laptop.laptop_id, 10)
  try {
    await prisma.laptop.update({
      where: {
        laptop_id: laptopId,
      },
      data: {
        laptop_id: laptop.laptop_id,
        model: laptop.model,
        serial_number: laptop.serial_number,
        springboro_tag_id: laptop.springboro_tag_id,
        aux_funds_po_id: laptop.aux_funds_po_id,
        cinday_id: laptop.cinday_id,
      },
    })
    revalidatePath("/laptop")
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
