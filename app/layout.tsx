import type { Metadata } from 'next'
//import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './navbar';
import AuthProvider from './AuthProvider';

export const metadata: Metadata = {
  title: 'Pickup App',
  description: 'Find a group to play sports and games!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body >
          <AuthProvider>
            <Navbar />
              {children}
          </AuthProvider>
        </body>
      </html>
  )
}
