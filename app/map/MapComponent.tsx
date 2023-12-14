"use client";

import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { APIProvider, AdvancedMarker, Pin, Map, Marker } from "@vis.gl/react-google-maps";
import { User } from "@prisma/client";
import { getEvents } from "./mapActions";



interface MapComponentProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
    user: User | undefined;
}

export function MapComponent({ center, zoom, user }: MapComponentProps) {
    const [events, setEvents] = useState<Array<google.maps.LatLngLiteral>>();
    
    useEffect(() => {
        getEvents(center).then((events) =>{
            setEvents(events);
        });
    }),[events];

    return (
        <Grid container>
            <Grid xs={12}>
            <Paper elevation={6}>                    
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY as string}>
                    <div style={{height: '100vh', width: '100%'}}> 
                    <Map  zoom={zoom} center={center} 
                        mapId={process.env.NEXT_PUBLIC_GMAPS_MAP_ID}>
                            {events && events?.map((event,index)=>(
                                <Marker key={`event-marker-${index}`} position={event}/>
                            ))}
                    </Map>
                    </div>
                </APIProvider>
            </Paper>
            </Grid>
        </Grid>
    );
} 