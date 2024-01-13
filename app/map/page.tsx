'use client';

import { MapComponent } from "./MapComponent";
import { EventMapSumm, getEvents, getUser } from "./mapActions";
import {useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { EventsContext } from "./mapContext";

const zoom = 14;

export const revalidate = 10;




export default function PickupsMap() {
    const dundalk = {lat:39.2365569,lng:-76.5031196};
    const [events, setEvents] = useState<EventMapSumm[]>([]);
    const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
    const session = useSession();
    const [center, setCenter ] = useState<google.maps.LatLngLiteral>({lat:39.2365569,lng:-76.5031196});

    useEffect(() =>{
        const fetchEvents = async () =>{
            const fetcheEvents = await getEvents(dundalk);
            setEvents(fetcheEvents!);
            setLoadingEvents(false);
        };
        
        const fetchUser = async () =>{
            if(session.status === 'authenticated'){
                const fetchedUser = await getUser(session.data.user!.id);
                if(fetchedUser){
                    setCenter({lat: fetchedUser.homeCenter[0], lng: fetchedUser.homeCenter[1]});
                }                
            }
        }
        fetchUser();
        fetchEvents();
    }, []);

    if(loadingEvents){
        return <CircularProgress />;
    }else{
        return (
            <EventsContext.Provider value={{events,setEvents, center}}>
                <MapComponent  />
            </EventsContext.Provider>
        );
    }
}

