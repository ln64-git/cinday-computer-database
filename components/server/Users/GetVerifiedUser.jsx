"use server"
import prisma from "../../util/prisma"

export default async function GetVerifiedUser(id) {
  const user = await prisma.VerifiedUser.findFirst({
    where: { id: { equals: id } },
  })
  return user
}
