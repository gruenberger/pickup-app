import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Navdrawer from './navdrawer';
import AuthButton from '@/app/ui/AuthButton';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Navbar() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Navdrawer />
                <Button href="/" variant="text">
                    <Typography variant="h6" component="div" sx={{ textTransform: "none", color: "white"}}>
                        PickupApp
                    </Typography>
                </Button>
                <Box sx={{flexGrow:1}} />
                <AuthButton />
            </Toolbar>
        </AppBar>
    </Box>
    );
}