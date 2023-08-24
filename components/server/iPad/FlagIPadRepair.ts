"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../../util/config/prisma"

export default async function FlagIPadRepair({ iPad }) {
  try {
    await prisma.ipad.update({
      where: {
        ipad_id: iPad.ipad_id,
      },
      data: {
        flag_repair: !iPad.flag_repair,
      },
    })
    revalidatePath("/ipads")
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
