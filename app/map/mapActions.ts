'use server';

import { Activities } from "@/lib/activities";
import { db } from "@/lib/db";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export interface EventMapSumm {
    id: number;
    lat: number;
    lng: number;
    activity: string;
    startTime: Date;
    endTime: Date;
}

export const getEvents = cache(async(center: google.maps.LatLngLiteral | null) =>{
    const events: EventMapSumm[] = (await db.event.findMany())
        .map((event) =>{
            return {
                id: event.id,
                lat: event.lat,
                lng: event.lng,
                activity: event.activity,
                startTime: event.startTime,
                endTime: event.endTime
            }
        });
    revalidatePath('/map');
    return events;
});

export async function getEventById(eventId: number) {
    const event: Event | null = await db.event.findUnique({
        where: {id:eventId}
    });

    return event as Event;
}

export async function joinEventById(event: Event, userId: string){
    let newAttendance = event.attendance;
    newAttendance.push(userId);
    const returnVal = await db.event.update({
        where: {id: event.id},
        data:{
            ...event,
            attendance: newAttendance
        }
    });
    return returnVal;
}

export async function unjoinEventById(event: Event, userId: string){
    let newAttendance = event.attendance;
    newAttendance = newAttendance.filter((attendee)=>{
        return attendee !== userId;
    });
    const returnVal = await db.event.update({
        where: {id: event.id},
        data:{
            ...event,
            attendance: newAttendance
        }
    });
    return returnVal;
}

export async function deleteEventById(eventId: number){
    const deleted = await db.event.delete({
        where: {
            id: eventId
        }
    });
    revalidatePath('/map');
}

export const getUser = cache(async (userId: string)=>{
    const user = await db.user.findUnique({
        where:{
            id: userId
        }
    });
    return user;
});
