"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../util/prisma"

export default async function FlagLaptopRepair({ laptop }) {
  try {
    await prisma.laptop.update({
      where: {
        laptop_id: laptop.laptop_id,
      },
      data: {
        flag_repair: !laptop.flag_repair,
      },
    })
    revalidatePath("/laptops")
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
