'use client';

import { Button } from "@mui/material";
import { Event, User } from "@prisma/client";
import { EventMapSumm, deleteEventById, getEvents, getUser, joinEventById, unjoinEventById } from "./mapActions";
import { EventsContextType } from "./page";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "./page";
import { useSession } from "next-auth/react";

interface JoinButtonParams {
    infoWindowSetter: Function
    infoWindowClose: Function
    event: Event
}

export default function JoinButton({infoWindowSetter, infoWindowClose, event }: JoinButtonParams){
    const { events, setEvents }: EventsContextType = useContext(EventsContext);
    const session = useSession();
    const [user, setUser] = useState<User|null>();

    useEffect(() => {
        if(session){
            const fetchUser =  async () =>{
                const fetchedUser = await getUser(session.data!.user!.id);
                setUser(fetchedUser);
            };
            fetchUser();
        }
    });

    if(!user){
        return;
    }

    const handleJoinEvent = () =>{ 
        const joinEvent = async () => {
            const updatedEvent = await joinEventById(event, user.id);
            infoWindowSetter(updatedEvent);
        }
        joinEvent();
    };

    const handleUnjoinEvent = () =>{ 
        const unjoinEvent = async () => {
            const updatedEvent = await unjoinEventById(event, user.id);
            infoWindowSetter(updatedEvent);
        }
        unjoinEvent();
    };

    const handleDeleteEvent = () =>{ 
        const deleteEvent = async () => {
            const updatedEvent = await deleteEventById(event.id);            
        };
        deleteEvent();
        const refreshEvents = async () => {
            const newEvents = await getEvents({lat:0,lng:0});
            infoWindowClose(false);
            setEvents(newEvents);
        };
        refreshEvents();
    };
    if(event.owner === user.id){
        return <Button variant='contained' color='warning' onClick={handleDeleteEvent}>Cancel Event</Button>;
    }else if(event.attendance.includes(user.id)){        
        return <Button variant='contained' color='error' onClick={handleUnjoinEvent}>Un-Join Event</Button>;
    }else{
        return <Button variant='contained' color='success' onClick={handleJoinEvent}>Join Event</Button>;
    }
}