'use server';

import { db } from "@/lib/db";
import { Event } from "@prisma/client";

export interface EventMapSumm {
    id: number;
    lat: number;
    lng: number;
}

export async function getEvents(center: google.maps.LatLngLiteral) {
    const events: EventMapSumm[] = (await db.event.findMany())
        .map((event) =>{
            return {
                id: event.id,
                lat: event.lat,
                lng: event.lng
            }
        });
    
    return events;
}

export async function getEventById(eventId: number) {
    const event: Event | null = await db.event.findUnique({
        where: {id:eventId}
    });

    return event as Event;
}