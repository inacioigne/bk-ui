import './globals.css' 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// BiblioKeia Providers
import { ProgressProvider } from "src/providers/progress";
// import { BfProvider } from "src/providers/bibframe";
import { AlertProvider } from "src/providers/alert";
import { ModeProvider } from "src/providers/mode"
// import { ParamsAuthorityProvider } from "src/providers/paramsAuthority"
import { ParamsAuthorityProvider } from "src/providers/paramsAuthority"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'bk-ui',
  description: 'BiblioKeia Front End',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ProgressProvider>
        <ModeProvider>
          <AlertProvider>
            <ParamsAuthorityProvider>
            <body className={inter.className}>{children}</body>
            </ParamsAuthorityProvider>
          </AlertProvider>
        </ModeProvider>
      </ProgressProvider>
    </html>
  )
}
