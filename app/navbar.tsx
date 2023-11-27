import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Navdrawer from './navdrawer';
import AuthButton from '@/app/ui/AuthButton';
import Link from 'next/link';

export default function Navbar() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Navdrawer />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pickup App
                </Typography>
                <AuthButton />
            </Toolbar>
        </AppBar>
    </Box>
    );
}