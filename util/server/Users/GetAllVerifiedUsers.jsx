"use server"
import prisma from "../../util/prisma"

export default async function GetAllVerifiedUsers() {
  try {
    return await prisma.VerifiedUser.findMany()
  } catch (error) {
    console.log("Database fail")
    console.log(error)
    return []
  }
}
