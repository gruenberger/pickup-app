"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People'
import Link from 'next/link';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const LINKS = [
  {href: 'map', icon: <MapIcon />, text: 'Map'},
  {href: 'create-event', icon: <EventIcon />, text: 'Create Event'},
  {href: 'profile', icon: <PersonIcon />, text: 'Profile'},
  {href: 'add-friend', icon: <PeopleIcon />, text: 'Add Friend'},
  {href: 'settings', icon: <SettingsIcon />, text: 'Settings'}
]



export default function Navdrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
  
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor: Anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {LINKS.map(({ href, icon, text}) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} href={href}>
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    

    return(
        <div>      
          <IconButton 
            onClick={toggleDrawer('left', true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
              <MenuIcon />
          </IconButton>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
    </div>
  );
}