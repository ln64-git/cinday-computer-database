"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../../util/config/prisma"

export default async function DeleteIPad({ iPadId }) {
  try {
    await prisma.ipad.delete({
      where: { ipad_id: iPadId },
    })
    revalidatePath("/ipads")
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
