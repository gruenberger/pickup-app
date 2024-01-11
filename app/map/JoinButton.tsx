'use client';

import { Button } from "@mui/material";
import { Event } from "@prisma/client";
import { EventMapSumm, deleteEventById, joinEventById, unjoinEventById } from "./mapActions";

interface JoinButtonParams {
    infoWindowSetter: Function
    infoWindowClose: Function
    event: Event
    userId: string
}

export default function JoinButton({infoWindowSetter, infoWindowClose, event, userId }: JoinButtonParams){

    const handleJoinEvent = () =>{ 
        const joinEvent = async () => {
            const updatedEvent = await joinEventById(event, userId);
            infoWindowSetter(updatedEvent);
        }
        joinEvent();
    };

    const handleUnjoinEvent = () =>{ 
        const unjoinEvent = async () => {
            const updatedEvent = await unjoinEventById(event, userId);
            infoWindowSetter(updatedEvent);
        }
        unjoinEvent();
    };

    const handleDeleteEvent = () =>{ 
        const deleteEvent = async () => {
            const updatedEvent = await deleteEventById(event.id);
            infoWindowClose(false);
        }
        deleteEvent();
    };
    if(event.owner === userId){
        return <Button variant='contained' color='warning' onClick={handleDeleteEvent}>Cancel Event</Button>;
    }else if(event.attendance.includes(userId)){        
        return <Button variant='contained' color='error' onClick={handleUnjoinEvent}>Un-Join Event</Button>;
    }else{
        return <Button variant='contained' color='success' onClick={handleJoinEvent}>Join Event</Button>;
    }
}