'use client'

// style imports
import './globals.css'
// import Loading from './loading'
import { Poppins } from 'next/font/google'

// utils imports
import StoreProvider from '@/StoreProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={poppins.className}>
      <body className="flex flex-row min-w-screen">
        <StoreProvider>
          <div className="bg-base w-full lg:flex lg:justify-center">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
