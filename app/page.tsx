import Home from '@/components/pages/home'
// import { authOptions } from '@/util/lib/nextAuth/authOptions'
// import GetAllVerifiedUsers from '@/util/server/Users/GetAllVerifiedUsers'
// import { getServerSession } from 'next-auth'
// import GreetingOverlay from '@/components/pages/overlay/greeting-overlay'
import { getData } from '@/util/server/get-data'

export default async function HomePage() {
  // const session = await getServerSession(authOptions)
  // const verifiedUsers = await GetAllVerifiedUsers()
  // const isUserAuth = verifiedUsers.some(
  //   (user) => user.email === session?.user?.email
  // )

  // const data = isUserAuth ? await getData(true) : null;
  // const data = await getData(true);
  const mockData = await getData(false);
  // const overlay = true;

  // if (overlay) {
  //   return (
  //     <GreetingOverlay {...mockData} />
  //   )
  // } else {
  return (
    <section className="h-full flex flex-col items-center justify-center gap-4">
      <Home {...mockData} verifiedUser={true} />
    </section>
  )
}
// }

