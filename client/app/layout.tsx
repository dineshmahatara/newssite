import Footer from './Footer'
import Header from './Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head/>
      <body className="bg-gray-100  transition-all duration-700">
        <Header/>
        <div className="max-w-6xl mx-auto">
           {children} 
        </div>
        <Footer/>
      </body>
    </html>
  )
}
