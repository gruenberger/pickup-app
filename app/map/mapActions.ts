'use server';

import { Activities } from "@/lib/activities";
import { db } from "@/lib/db";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Pin } from '@vis.gl/react-google-maps';

export interface EventMapSumm {
    id: number;
    lat: number;
    lng: number;
    activity: string;
}

export async function getEvents(center: google.maps.LatLngLiteral) {
    const events: EventMapSumm[] = (await db.event.findMany())
        .map((event) =>{
            return {
                id: event.id,
                lat: event.lat,
                lng: event.lng,
                activity: event.activity
            }
        });
    revalidatePath('/map');
    return events;
}

export async function getEventById(eventId: number) {
    const event: Event | null = await db.event.findUnique({
        where: {id:eventId}
    });

    return event as Event;
}
