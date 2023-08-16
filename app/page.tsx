import Home from "@/components/home"
import Container from "@/components/home"

interface UserData {
  id: number
  name: string
  username: string
  email: string
}

export default async function HomePage() {
  const data = await getData()

  return (
    <section className='h-full flex flex-col items-center justify-center gap-4 '>
      <Home data={data}/>
    </section>
  )
}

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}