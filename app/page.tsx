import Home from '@/components/pages/home'
import { authOptions } from '@/util/lib/nextAuth/authOptions'
import GetAllVerifiedUsers from '@/util/server/Users/GetAllVerifiedUsers'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const verifiedUsers = await GetAllVerifiedUsers()
  const isUserAuth = verifiedUsers.some(
    (user) => user.email === session?.user?.email
  )

  console.log(isUserAuth)

  const data = await getData() ;


  return (
    <section className="h-full flex flex-col items-center justify-center gap-4">
      <Home {...data} verifiedUser={isUserAuth} />
    </section>
  )
}

async function getData() {
  const prisma = new PrismaClient()
  const iPadArray = await prisma.ipad.findMany()
  const iPadNotesArray = await prisma.ipad_note.findMany()
  const laptopArray = await prisma.laptop.findMany()
  const laptopNotesArray = await prisma.laptop_note.findMany()
  return { iPadArray, iPadNotesArray, laptopArray, laptopNotesArray }
}
