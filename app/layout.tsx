import '@/util/styles/globals.css'
import { Metadata } from 'next'
import { siteConfig } from '@/util/config/site'
import { Providers } from './providers'
import { Navbar } from '@/components/interface/navbar'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
  return (
    <html lang="en">
      <body className="font-sans antialiased h-full">
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }} >
          <div className="flex flex-col h-screen">
            {/* Include the Navbar component */}
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}


{
  /* <footer className="w-full flex items-center justify-center py-3">
    <Link
      isExternal
      className="flex items-center gap-1 text-current"
      href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
      title="nextui.org homepage"
    >
      <span className="text-default-600">Powered by</span>
      <p className="text-primary">NextUI</p>
    </Link>
  </footer> */
}
