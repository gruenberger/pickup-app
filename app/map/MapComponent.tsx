"use client";

import  {  useContext, useState } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { APIProvider, AdvancedMarker, Pin, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { Event } from "@prisma/client";
import { getEventById, getEvents, getUser } from "./mapActions";
import { EventMapSumm } from "./mapActions";

// Activity Icon imports
import { getActivityIcon, getName } from "@/lib/activities";
import JoinButton from "./JoinButton";

import { EventsContext } from "./mapContext";
import { useSession } from "next-auth/react";


export function MapComponent() {
    const session = useSession();
    const [infoWindowEvent, setInfoWindowEvent] = useState<Event | null>();  
    const [infowindowShown, setInfowindowShown] = useState(false);
    const { events, center } = useContext(EventsContext);

    
    if(!events || !center){
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
                    <Map  zoom={12} center={center} 
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
                                {(infoWindowEvent) && (
                                    <JoinButton infoWindowSetter={setInfoWindowEvent} event={infoWindowEvent} infoWindowClose={setInfowindowShown} />
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