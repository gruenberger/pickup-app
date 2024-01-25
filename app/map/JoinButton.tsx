'use client';

import { Button } from "@mui/material";
import { Event, User } from "@prisma/client";
import { deleteEventById, getEvents, getUser, joinEventById, unjoinEventById } from "./mapActions";

interface JoinButtonParams {
    infoWindowSetter: Function;
    infoWindowClose: Function;
    setEvents: Function;
    event: Event;
    user: User;
}

export default function JoinButton({infoWindowSetter, infoWindowClose, event, user, setEvents }: JoinButtonParams){
    

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