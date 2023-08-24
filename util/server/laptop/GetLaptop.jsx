"use server"
import prisma from "../../util/prisma"

export default async function GetLaptop(id) {
  const laptop = await prisma.laptop.findFirst({
    where: { laptop_id: { equals: id } },
  })
  return laptop
}
