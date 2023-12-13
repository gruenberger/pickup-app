"use client";

import React, { useState, useEffect } from 'react';
// Material UI imports
import { Box, CircularProgress, Grid, MenuItem, Modal, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

// Until I have a better way, MUI-X DateTimePicker
import dayjs, { Dayjs } from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';

import 'dayjs/locale/en'; // import locale
import type { Event, User } from '@prisma/client';

// Action to handle Prisma database call
import { createEvent } from './createEventAction';

// Map Stuff
import { useGeolocated } from "react-geolocated";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';

dayjs.extend(isLeapYear) // use plugin
dayjs.locale('en') // use locale

// Should mimick db Event Model
export interface CreateEventFormData  {
  name: string;
  description: string;
  owner: string;
  activity: string;
  attendance: [];
  lat: number;
  lng: number;
  createdAt: Date;
  startTime: Date;
  endTime: Date;
}

// Passes in db model of User from parent
interface EventFormProps {
    user: User;
}

// Activity Interface
interface Activity {
    name: string;
    value: string;
}

// location Interface
interface LatLngLoc {
    lat: number;
    lng: number;
}

// Activities
const activities: Activity[] = [
    {name: "Soccer", value: "soccer"},
    {name: "Basketball", value: "basketball"},
    {name: "Football", value: "football"},
    {name: "Baseball", value: "baseball"},
    {name: "Volleyball", value: "volleyball"},
    {name: "Lacrosse", value: "lacrosse"},
    {name: "Ultimate Frisbee", value: "ultimatefrisbee"},
    {name: "Skateboarding", value: "skateboarding"},
    {name: "Running", value: "running"},
    {name: "Tennis", value: "tennis"},
    {name: "Cricket", value: "cricket"},
    {name: "Field Hockey", value: "fieldhockey"},
    {name: "Badminton", value: "badminton"},
    {name: "Table Tennis", value: "tabletennis"},
    {name: "Chess", value: "chess"},
    {name: "Checkers", value: "checkers"},
    {name: "Magic The Gathering", value: "magic"},
    {name: "Warhammer", value: "warhammer"},
    {name: "Video Game (See Desc)", value: "videogame"},
    {name: "Other (See Desc)", value: "other"},
];

// Modal Style
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function EventForm({ user }: EventFormProps) {
    const router = useRouter();
    const { coords,
            isGeolocationAvailable,
            isGeolocationEnabled
         } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
            watchLocationPermissionChange: true,
            watchPosition: true,
        });

    // Form values and their useState declarations
    const [name, setName ] = useState<string>('');
    const [description, setDescription ] = useState<string>('');
    const [activity, setActivity ] = useState<Activity>({name:"Soccer", value:"soccer"});
    const [latLng, setLatLng] = useState<LatLngLoc>({lat:user.homeCenter[0], lng:user.homeCenter[1]});
    const [startTime, setStartTime] = useState<Dayjs>(dayjs().add(1,'hour'));
    const [endTime, setEndTime] = useState<Dayjs>(dayjs().add(2,'hour'));

    // Modal State and handlers
    const [open, setOpen] = useState(false);
    const [id, setId] = useState<number>(0);
    const [eventName, setEventName ] = useState<string>('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        router.push('/');
    };

    
    // Field Handlers
    const handleNameChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setName(event.target.value);        
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setDescription(event.target.value);        
    };

    const handleActivityChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setActivity({name: event.target.name, value:event.target.value});        
    };    

    const handleStartTimeChange = (date: Dayjs | null) => {
        if (date) {
        setStartTime(date);
        }
    };

    const handleEndTimeChange = (date: Dayjs | null) => {
        if (date) {
        setEndTime(date);
        }
    };

    const handleMapClick = (event: any) => {
        const {lat, lng } = event.detail.latLng;
        setLatLng({lat:lat,lng:lng});
    }

    const handleSubmit = () => {
        
        //create event
        const newEvent: CreateEventFormData = {
            // id is autogenerated
            //id:Date.now(),
            name: name,
            description: description,
            lat: latLng?.lat as number,
            lng: latLng?.lng as number,
            owner: user.id,
            activity: activity.value,
            attendance: [],
            createdAt: new Date(),
            startTime: startTime.toDate(),
            endTime: endTime.toDate()
        }

        createEvent(newEvent).then((event) =>{
            setId(event.id);
            setEventName(event.name);
            console.log(`Returned Promise for: \n ${event}`);
            handleOpen();
        });
        

    };

    return (!isGeolocationAvailable || !isGeolocationEnabled) ? (
            <Typography variant="h3">
                Please enable location!
            </Typography>
            ): 
        
        coords ? (
            <div>
            <Grid container  spacing={2}>            
                <Grid container item xs={6}>
                    <Paper sx={{flexGrow: 1}} elevation={6}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>
                                Enter Event Information
                            </Typography>
                        </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                            margin="normal"
                            helperText="Name your activity"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="activitySelect"
                            name="activity"
                            select
                            margin="normal"
                            onChange={handleActivityChange}
                            required
                            label="Activity"
                            helperText="Please select the activity"
                            value={activity.value}
                        >
                            {activities.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            helperText="Describe the activity with a few details"
                            value={description}
                            onChange={handleDescriptionChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Latitude"
                            name="lat"
                            type="number"
                            helperText="Latitude of the activity location"
                            fullWidth
                            required
                            value={latLng.lat}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                readOnly: true,
                              }}
                            
                        />
                        <TextField
                            label="Longitude"
                            name="lng"
                            type="number"
                            helperText="Longitude of the activity location"
                            value={latLng.lng}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12}>
                        <MobileDateTimePicker
                            label="Start Time"
                            value={startTime}
                            disablePast
                            formatDensity='spacious'
                            onChange={(date) => handleStartTimeChange(date)}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: null,
                            }}
                            sx={{marginTop: "16px", marginBottom: "8px"}}                 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MobileDateTimePicker
                            label="End Time"
                            value={endTime}
                            disablePast
                            formatDensity='spacious'
                            onChange={(date) => handleEndTimeChange(date)}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: null,
                            }}
                            sx={{marginTop: "16px", marginBottom: "8px"}}
                        />
                    </Grid>
                    </LocalizationProvider>
                        <Grid item xs={12}>
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                Create Event
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>            
                
                <Grid item xs={6}>
                    <Paper elevation={6}>                    
                        <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY as string}>
                            <div style={{height: '100vh', width: '100%'}}> 
                            <Map onClick={handleMapClick} zoom={15} center={latLng} 
                                mapId={process.env.NEXT_PUBLIC_GMAPS_MAP_ID}>
                                { latLng && 
                                    <AdvancedMarker position={latLng}>
                                        <Pin />
                                    </AdvancedMarker> 
                                }
                            </Map>
                            </div>
                        </APIProvider>
                    </Paper>
                </Grid>            
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Creation Complete
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Your Event,{eventName} was created with id, {id}. Thank you for using the application.
                    </Typography>
                </Box>
            </Modal>
            </div>
             
        ): <CircularProgress />;
    
}
