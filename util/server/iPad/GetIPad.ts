"use server"
import prisma from "../../../util/config/prisma"

export default async function GetIPad(id) {
  const ipad = await prisma.ipad.findFirst({
    where: { ipad_id: { equals: id } },
  })
  return ipad
}
