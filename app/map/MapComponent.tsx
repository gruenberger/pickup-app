"use client";

import React, { useState } from "react";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { APIProvider, AdvancedMarker, Pin, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { User,Event } from "@prisma/client";
import { getEventById } from "./mapActions";
import { EventMapSumm } from "./mapActions";
import { joinEventById } from "./mapActions";

// Activity Icon imports
import { getActivityIcon, getName } from "@/lib/activities";
import JoinButton from "./JoinButton";



interface MapComponentProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
    user: User | undefined;
    events: EventMapSumm[];
}



export function MapComponent({ center, zoom, user, events }: MapComponentProps) {
    
    const [infoWindowEvent, setInfoWindowEvent] = useState<Event | null>();  
    const [infowindowShown, setInfowindowShown] = useState(false);

    // Will not load the component until events have been fetched.
    if(!events){
        return <CircularProgress />;
    }
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

    return (
        <Grid container>
            <Grid xs={12}>
            <Paper elevation={6}>                    
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY as string}>
                    <div style={{height: '100vh', width: '100%'}}> 
                    <Map  zoom={zoom} center={center} 
                        mapId={process.env.NEXT_PUBLIC_GMAPS_MAP_ID}>
                            {events && events?.map((event)=>(
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
                                            {`Starts at: ${infoWindowEvent.startTime.toLocaleTimeString()}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Owner: ${infoWindowEvent.owner}`}
                                        </Typography>
                                    </Box>
                                )}
                                {(user && infoWindowEvent) && (
                                    <JoinButton infoWindowSetter={setInfoWindowEvent} event={infoWindowEvent} userId={user.id} />
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