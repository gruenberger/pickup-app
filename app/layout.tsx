import type { Metadata } from 'next'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
  console.log("IN LAYOUT line 23");
  return (
      <html lang="en">
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
