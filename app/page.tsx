import Home from '@/components/home/home'
import { PrismaClient } from '@prisma/client'

export default async function HomePage() {
  const data = await getData()

  return (
    <section className="h-full  flex flex-col items-center justify-center gap-4 ">
      <Home {...data} />
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
