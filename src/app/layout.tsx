import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/registry'
import './globals.css'

export const metadata: Metadata = {
  title: 'dictionary',
  description: 'A dictionary of words and their definitions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
