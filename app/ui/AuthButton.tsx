'use client';

import IconButton from "@mui/material/IconButton";
import { signIn, signOut, useSession } from "next-auth/react";
import { AccountCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
// import Image from "next/image";

export default function AuthButton() {
    const {data: session, status} = useSession();
    console.log(session, status);

    if (status === 'loading'){
        return <CircularProgress />;

    }

    if (status === 'authenticated') {
        return (
          <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>
          </Box>
        );
      }

    return <Button color="inherit" onClick={() => signIn()}>Sign In</Button>;
}