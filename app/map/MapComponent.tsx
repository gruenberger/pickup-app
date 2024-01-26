"use client";

import  { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { APIProvider, AdvancedMarker, Pin, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { Event, User } from "@prisma/client";
import { getEventById } from "./mapActions";
import { EventMapSumm } from "./mapActions";

// Activity Icon imports
import { Activities, getActivityIcon, getName } from "@/lib/activities";
import JoinButton from "./JoinButton";

export interface MapComponentProps {
    events: EventMapSumm[];
    user: User | undefined;    
}

export function MapComponent({events, user}: MapComponentProps) {
    const [infoWindowEvent, setInfoWindowEvent] = useState<Event | null>();  
    const [infowindowShown, setInfowindowShown] = useState(false);
    const [clientEvents, setEvents] = useState(events);
    const [activityFilter, setActivityFilter] = useState("All");

    const center: google.maps.LatLngLiteral = user? {lat:user.homeCenter[0], lng:user.homeCenter[1]}: {lat: 0, lng: 0};
    
    
    const closeInfoWindow = () => setInfowindowShown(false);

    // When the info window opens, fetch the event info
    const handleInfoWindow = (eventSumm: EventMapSumm ) => {
        const fetchEventById = async () => {
            const fetchedEv = await getEventById(eventSumm.id) ;           
            setInfoWindowEvent(fetchedEv);
            setInfowindowShown(true);
        };
        fetchEventById();
    };

    // Activity Filter change handler
    const handleActivityFilterChange = (event: SelectChangeEvent) => {
        const activity = event.target.value;
        if (activity === "All"){
            setActivityFilter(activity);
            setEvents(events);
        }else{
            setActivityFilter(activity);
            setEvents(events.filter((e) => e.activity === activity));
        }        
    };

    return (
        <Grid container>
            <Grid xs={12}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="activity-filter-label">Activity</InputLabel>
                    <Select
                        labelId="activity-filter-label"
                        id="activity-filter"
                        value={activityFilter}
                        label="Activity"
                        onChange={handleActivityFilterChange}
                    >
                        <MenuItem key="all" value="All">All</MenuItem>
                        {Activities.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                    </MenuItem>
                                ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid xs={12}>
            <Paper elevation={6}>                    
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY as string}>
                    <div style={{height: '100vh', width: '100%'}}> 
                    <Map  zoom={16} center={center} 
                        mapId={process.env.NEXT_PUBLIC_GMAPS_MAP_ID}>
                            {clientEvents && clientEvents?.map((event)=>(
                                <AdvancedMarker key={event.id} position={{lat:event.lat,lng:event.lng}} onClick={() =>handleInfoWindow(event)}>
                                    <Pin background={'white'} borderColor={'#1976d2'}>
                                        {getActivityIcon(event.activity)}
                                    </Pin>
                                </AdvancedMarker>
                            ))}
                            {infowindowShown && (
                            <InfoWindow position={infoWindowEvent? {lat:infoWindowEvent?.lat,lng: infoWindowEvent?.lng} : null} onCloseClick={closeInfoWindow}>
                                {infoWindowEvent && (
                                    <Box>
                                        <Typography variant='h6'>
                                            {infoWindowEvent.name}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Activity: ${getName(infoWindowEvent.activity)}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Description: ${infoWindowEvent.description}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Starts at: ${infoWindowEvent.startTime.toLocaleDateString()} at ${infoWindowEvent.startTime.toLocaleTimeString()}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Owner: ${infoWindowEvent.owner}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Total Number Planning to Attend: ${infoWindowEvent.attendance.length}`}
                                        </Typography>
                                    </Box>
                                )}
                                {(infoWindowEvent && user) && (
                                    <JoinButton 
                                        infoWindowSetter={setInfoWindowEvent}
                                        event={infoWindowEvent}
                                        infoWindowClose={setInfowindowShown}
                                        user={user}
                                        setEvents={setEvents}
                                        />
                                )}                     
                            </InfoWindow>                            
                            )}
                    </Map>
                    
                    </div>
                </APIProvider>
            </Paper>
            </Grid>
        </Grid>
    );
} 