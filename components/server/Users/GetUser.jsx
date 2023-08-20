"use server"
import prisma from "../../util/prisma"

export default async function GetUser(id) {
  const user = await prisma.User.findFirst({
    where: { id: { equals: id } },
  })
  return user
}
