"use server"
import prisma from "@/util/config/prisma"

export default async function GetAllVerifiedUsers() {
  try {
    return await prisma.verifiedUser.findMany()
  } catch (error) {
    console.log("Database fail")
    console.log(error)
    return []
  }
}
