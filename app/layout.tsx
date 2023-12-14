import type { Metadata } from 'next'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './navbar';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import SessionProvider from './components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import Box from '@mui/material/Box';

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
        <body style={{backgroundColor:"#F3F6F9" }}>
          <SessionProvider session={session}>
            <Box sx={{ flexGrow: 1}}>
              <Grid container spacing={2}>
                <Grid xs={12} >
                  <Navbar />
                </Grid>
                <Grid xs={12}>    
                  {children}
                </Grid>
              </Grid>
            </Box>
          </SessionProvider>
        </body>
      </html>
  )
}
