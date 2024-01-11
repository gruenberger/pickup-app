"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { APIProvider, AdvancedMarker, Pin, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { User,Event } from "@prisma/client";
import { getEventById, getEvents } from "./mapActions";
import { EventMapSumm } from "./mapActions";

// Activity Icon imports
import { getActivityIcon, getName } from "@/lib/activities";
import JoinButton from "./JoinButton";



interface MapComponentProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
    user: User | undefined;
}



export function MapComponent({ center, zoom, user }: MapComponentProps) {
    
    const [infoWindowEvent, setInfoWindowEvent] = useState<Event | null>();  
    const [infowindowShown, setInfowindowShown] = useState(false);
    const [events, setEvents] = useState<EventMapSumm[]>();
    const [error, setError] = useState();
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
              const fetchedEvents = await getEvents(center);
              setEvents(fetchedEvents);
              console.log("in Map get events effect");
            } catch (e: any) {
              setError(e);
            } finally {
              setLoading(false);
            }
          };      
          fetchEvents();
    }, []);

    if(loading){
        return <CircularProgress />;
    }
    
    if(error){
        return <Typography>Error Loading events on the map.</Typography>
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
                                        <Typography variant='body2'>
                                            {`Total Number Planning to Attend: ${infoWindowEvent.attendance.length}`}
                                        </Typography>
                                    </Box>
                                )}
                                {(user && infoWindowEvent) && (
                                    <JoinButton infoWindowSetter={setInfoWindowEvent} event={infoWindowEvent} userId={user.id} infoWindowClose={setInfowindowShown} />
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