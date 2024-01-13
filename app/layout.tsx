import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

import Navbar from './navbar';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import Providers from './providers';
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
  return (
      <html lang="en" className={inter.className}>
        <body style={{backgroundColor:"#F3F6F9" }}>
          <Providers>
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
          </Providers>
        </body>
      </html>
  )
}
