import './globals.css'
import { Nav } from '@/components/nav'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Ecommerce',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body className={`${inter.className} mx-3 md:mx-24 lg:mx-48`}>
        <Nav session={session} />
        {children}
      </body>
    </html>
  )
}
