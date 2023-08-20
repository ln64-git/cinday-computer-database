"use server"
import prisma from "../../util/prisma"

export default async function GetLaptopList() {
  try {
    return await prisma.laptop.findMany()
  } catch (error) {
    console.log("Database fail")
    console.log(error)
    return []
  }
}
