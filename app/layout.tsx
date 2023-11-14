import type { Metadata } from 'next'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './navbar';
import AuthProvider from './components/SessionProvider';

import SessionProvider from './components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';

export const metadata: Metadata = {
  title: 'Pickup App',
  description: 'Find a group to play sports and games!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
      <html lang="en">
        <body >
          <SessionProvider session={session}>
            <Navbar />
            {children}
          </SessionProvider>
        </body>
      </html>
  )
}
