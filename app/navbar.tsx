import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppMenu from './navdrawer';
import Navdrawer from './navdrawer';

export default function Navbar() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Navdrawer />    
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pickup App
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    </Box>
    );
}