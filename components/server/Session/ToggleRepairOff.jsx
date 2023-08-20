"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../util/prisma"

export default async function ToggleRepairOff(id) {
  const session = await prisma.session.findFirst({
    where: {
      id: id,
    },
  })
  try {
    await prisma.session.update({
      where: {
        id: id,
      },
      data: {
        repair: false,
      },
    })
    revalidatePath("/laptop")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
