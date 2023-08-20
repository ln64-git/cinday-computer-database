"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../util/prisma"

export default async function ToggleRepairOn(id) {
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
        repair: true,
      },
    })
    revalidatePath("/laptop")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
