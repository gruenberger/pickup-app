import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Navdrawer from './navdrawer';
import { SignInButton, SignOutButton } from '@/ui/buttons';
import AuthCheck from '@/ui/AuthCheck';

export default function Navbar() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Navdrawer />    
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pickup App
                </Typography>
                <SignInButton />
                <AuthCheck>
                    <SignOutButton />
                </AuthCheck>
            </Toolbar>
        </AppBar>
    </Box>
    );
}