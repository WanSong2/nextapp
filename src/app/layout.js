import './globals.css'
import { Disclosure } from '@headlessui/react'
import ReactQueryProviders from '../hooks/useReactQuery'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800"></Disclosure>
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 ">
                스케줄 조회
              </h1>
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