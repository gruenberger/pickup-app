"use client";

import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { APIProvider, AdvancedMarker, Pin, Map, useAdvancedMarkerRef, InfoWindow } from "@vis.gl/react-google-maps";
import { User,Event } from "@prisma/client";
import { getEvents } from "./mapActions";



interface MapComponentProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
    user: User | undefined;
}



export function MapComponent({ center, zoom, user }: MapComponentProps) {
    const [events, setEvents] = useState<Array<Event>>();
    const [infoWindowText, setInfoWindowText] = useState<string>('nothing to see here');
    
    useEffect(() => {        
        getEvents(center).then((events) =>{            
            setEvents(events);
        });
    }),[events];
    const [infoMarker, setInfoMarker] = useState<google.maps.LatLngLiteral>();
    const [infowindowShown, setInfowindowShown] = useState(false);

    const toggleInfoWindow = () =>
        setInfowindowShown(previousState => !previousState);
    const openInfoWindow = () => setInfowindowShown(true);


    const closeInfoWindow = () => setInfowindowShown(false);

    const handleInfoWindow = (e: google.maps.MapMouseEvent) => {
        console.log(e.latLng?.toString());
        const clickedEvent  = events?.filter(ev => ev.lat == e.latLng?.lat() && ev.lng == e.latLng.lng())[0];
        if(clickedEvent){
            setInfoWindowText(`${clickedEvent.name}
            \nDescription: ${clickedEvent.description}
            \nStart Time: ${clickedEvent.startTime.toString()}`)
            setInfoMarker({lat: clickedEvent.lat, lng: clickedEvent.lng});
        }
        openInfoWindow();
    }

    return (
        <Grid container>
            <Grid xs={12}>
            <Paper elevation={6}>                    
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY as string}>
                    <div style={{height: '100vh', width: '100%'}}> 
                    <Map  zoom={zoom} center={center} 
                        mapId={process.env.NEXT_PUBLIC_GMAPS_MAP_ID}>
                            {events && events?.map((event,index)=>(
                                <AdvancedMarker key={`event-marker-${index}`} position={{lat:event.lat,lng:event.lng}} onClick={handleInfoWindow}/>
                            ))}
                            {infowindowShown && (
                            <InfoWindow position={infoMarker} onCloseClick={closeInfoWindow}>
                                <Typography variant='body1'>
                                    {infoWindowText}
                                </Typography>
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