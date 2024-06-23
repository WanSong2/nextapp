import './globals.css'
import { Disclosure } from '@headlessui/react'
import ReactQueryProviders from '../hooks/useReactQuery'
import Link from 'next/link';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800"></Disclosure>
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                <Link href="/">Home</Link>
              </button>
              <button className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                <Link href="/"><Link href="/schdule">Schdule</Link></Link>
              </button>
              <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                <Link href="/"><Link href="/dashboard">Dashboard</Link></Link>
              </button>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <ReactQueryProviders>{children}</ReactQueryProviders>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}