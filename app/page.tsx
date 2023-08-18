import Home from '@/components/home/home'
import { PrismaClient } from '@prisma/client'

export default async function HomePage() {
  const data = await getData()
  return (
    <section className="h-full flex flex-col items-center justify-center gap-4 ">
      <Home {...data} />
    </section>
  )
}

async function getData() {
  const prisma = new PrismaClient()
  const deviceArray = await prisma.ipad.findMany()
  const deviceNotesArray = await prisma.ipad_note.findMany()
  return { deviceArray, deviceNotesArray }
}
