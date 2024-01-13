'use client';

import TextField from "@mui/material/TextField";
import Switch from '@mui/material/Switch';
import { User } from "@prisma/client";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Box, Button, InputLabel, Snackbar, Typography } from "@mui/material";

export interface SettingsComponentProps {
    user: User
    changeHandler: Function
}

export interface Settings {
    distance: number
    notifications: boolean
}

export default function SettingsComponent({user, changeHandler}: SettingsComponentProps){
    const [dist, changeDist] = useState<number>(user.distance);
    const [checked, setChecked] = useState(user.notifications);
    const [isDiff, setIsDiff ] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        changeDist(Number.parseInt(event.target.value));
    }

    useEffect(() =>{
        const updateIsDiff = () => {
            setIsDiff( !(user.distance === dist && user.notifications === checked));
        }
        updateIsDiff();

    },[dist, checked, isDiff]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleSave = () => {
        if(user.distance === dist && user.notifications === checked){

        } else {
            changeHandler({distance: dist,notifications: checked});
            setOpen(true);
        }
    }

    

    return (
        <>
        <Typography variant="h6">User Settings</Typography>
        <TextField margin="normal"
            type="number"
            value={dist}
            onChange={handleChange}
            label="Distance"
            helperText="Set the radius from your home center in miles"
        />
        <Box>
        <InputLabel>Enable Notifications?</InputLabel>
        <Switch checked={checked} onChange={handleSwitchChange}/>
        </Box>
        <Box>
        <Button disabled={!isDiff} variant="contained" onClick={handleSave}>Save Changes</Button>
        </Box>
        <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="User Settings Saved"
            />
        </>
    )
}