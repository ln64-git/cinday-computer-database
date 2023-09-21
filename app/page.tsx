import Home from '@/components/pages/home'
import { authOptions } from '@/util/lib/nextAuth/authOptions'
import GetAllVerifiedUsers from '@/util/server/Users/GetAllVerifiedUsers'
import { getData } from '@/util/server/get-data'
import { getServerSession } from 'next-auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const verifiedUsers = await GetAllVerifiedUsers()
  const isUserAuth = verifiedUsers.some(
    (user) => user.email === session?.user?.email
  )
  try {
    const data = isUserAuth ? await getData(true) : await getData(false);
    return (
      <section className="h-full flex flex-col items-center justify-center gap-4">
        <Home {...data} verifiedUser={isUserAuth} />
      </section>
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return (
      <section className="h-full flex flex-col items-center justify-center gap-4">
        <h1 className='text-2xl text-center'>Oops! Something went wrong...</h1>
        <h1 className='text-2xl text-center'>might have been an issue browser compatibility.</h1>
        <h1 className='text-2xl'>{error}</h1>
      </section>
    );
  }
}
