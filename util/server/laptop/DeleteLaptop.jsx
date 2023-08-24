"use server"
import prisma from "../../util/prisma"
import { revalidatePath } from "next/cache"

export default async function DeleteLaptop({ laptopId }) {
  try {
    await prisma.laptop.delete({
      where: { laptop_id: laptopId },
    })
    revalidatePath("/laptop")
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
