"use server"
import { revalidatePath } from "next/cache"
import prisma from "../../util/prisma"
import GetAllUsers from "./GetAllUsers"

export default async function AddVerifiedUser(id) {
  const users = await GetAllUsers()
  const user = users.find((user) => user.id === id)
  try {
    await prisma.VerifiedUser.create({
      data: {
        email: user.email,
        name: user.name,
      },
    })
    revalidatePath("/ipads")
    console.log("Database Success")
  } catch (error) {
    console.log("Database fail")
    console.log(error)
  }
}
