"use server"
import prisma from "../../util/prisma"

export default async function GetRepairLaptopList() {
  try {
    return await prisma.laptop.findMany({
      where: {
        flag_repair: true,
      },
    })
  } catch (error) {
    console.log("Database fail")
    console.log(error)
    return []
  }
}
