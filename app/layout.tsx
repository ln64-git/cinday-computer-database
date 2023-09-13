import '@/util/styles/globals.css'
import { Metadata } from 'next'
import { Providers } from './providers'
import { Navbar } from '@/components/interface/navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/util/lib/nextAuth/authOptions'

export const metadata: Metadata = {
  title: {
    default: 'CinDay Computer Database',
    template: `%s - 'CinDay Computer Database'`,
  },
  description: '',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className="font-sans antialiased h-full">
        <Providers session={session} themeProps={{ attribute: 'class', defaultTheme: 'dark' }} >
          <div className="flex flex-col h-screen">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}