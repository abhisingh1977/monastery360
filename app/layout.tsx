import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import GlobalChatbot from "@/components/global-chatbot"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Monastery360 - Digital Heritage Platform for Sikkim's Monasteries",
  description:
    "Experience Sikkim's monasteries through immersive virtual tours, AI-powered guides, and digital archives. Preserving sacred heritage through technology.",
  generator: "Monastery360",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <GlobalChatbot />
        <Analytics />
      </body>
    </html>
  )
}
