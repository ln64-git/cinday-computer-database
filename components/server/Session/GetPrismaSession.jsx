"use server"
import prisma from "../../util/prisma"

export default async function GetPrismaSession(id) {
  const session = await prisma.session.findFirst()
  return session
}
