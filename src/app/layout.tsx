import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SupplySide Flooring - Chicago\'s Most Reliable Flooring Installation',
  description: 'Professional flooring installation in Chicago. 80+ years experience. Licensed, insured, family owned. Free quotes: (312) 210-0606',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}