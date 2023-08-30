"use server"
import prisma from "@/util/config/prisma"
import { revalidatePath } from "next/cache"

export default async function DeleteLaptop(laptopId: number) {
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
