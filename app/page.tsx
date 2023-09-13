import Home from '@/components/pages/home'
import { authOptions } from '@/util/lib/nextAuth/authOptions'
import GetAllVerifiedUsers from '@/util/server/Users/GetAllVerifiedUsers'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import mockIPadData from '../data/ipads.json';
import mockIPadNotesData from '../data/ipad_note.json';
import mockLaptopData from '../data/laptops.json';
import mockLaptopNotesData from '../data/laptop_note.json';
import convertToStringIPadArray from '@/util/function/convert/to-string/convert-to-string-ipad-array'
import convertToStringIPadNoteArray from '@/util/function/convert/to-string/convert-to-string-ipad-note-array'
import convertToStringLaptopArray from '@/util/function/convert/to-string/convert-to-string-laptop-array'
import convertToStringLaptopNoteArray from '@/util/function/convert/to-string/convert-to-string-laptop-note-array'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const verifiedUsers = await GetAllVerifiedUsers()
  const isUserAuth = verifiedUsers.some(
    (user) => user.email === session?.user?.email
  )

  const data = await getData(false);


  return (
    <section className="h-full flex flex-col items-center justify-center gap-4">
      <Home {...data} verifiedUser={isUserAuth} />
    </section>
  )
}

async function getData(isUserAuth: boolean) {
  if (isUserAuth) {
    const prisma = new PrismaClient()
    const iPadArray = await prisma.ipad.findMany()
    const iPadNotesArray = await prisma.ipad_note.findMany()
    const laptopArray = await prisma.laptop.findMany()
    const laptopNotesArray = await prisma.laptop_note.findMany()
    return { iPadArray, iPadNotesArray, laptopArray, laptopNotesArray }
  } else {
    const iPadArray = convertToStringIPadArray(mockIPadData)
    const iPadNotesArray = convertToStringIPadNoteArray(mockIPadNotesData)
    const laptopArray = convertToStringLaptopArray(mockLaptopData)
    const laptopNotesArray = convertToStringLaptopNoteArray(mockLaptopNotesData)
    return { iPadArray, iPadNotesArray, laptopArray, laptopNotesArray }
  }
}