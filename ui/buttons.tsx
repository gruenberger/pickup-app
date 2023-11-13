'use client';

import IconButton from "@mui/material/IconButton";
import { signIn, signOut, useSession } from "next-auth/react";
import { AccountCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
// import Image from "next/image";

export function SignInButton() {
    const {data: session, status} = useSession();
    console.log(session, status);

    if (status === 'loading'){
        return <>...Authenticating</>;

    }

    if (status === 'authenticated') {
        return (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
        );
      }

    return <Button color="inherit" onClick={() => signIn()}>Sign In</Button>;
}

export function SignOutButton() {
    return <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>
}