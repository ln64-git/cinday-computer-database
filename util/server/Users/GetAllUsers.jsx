"use server"
import prisma from "../../util/prisma"

export default async function GetAllUsers() {
  try {
    console.log(prisma.User.findMany())
    return await prisma.User.findMany()
  } catch (error) {
    console.log("Database fail")
    console.log(error)
    return []
  }
}
