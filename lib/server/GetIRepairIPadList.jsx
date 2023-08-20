"use server"
import prisma from "../../util/prisma"

export default async function GetRepairIPadList() {
  try {
    return await prisma.ipad.findMany({
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
