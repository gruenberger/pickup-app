'use server';

import { db } from "@/lib/db";

export async function getEvents(center: google.maps.LatLngLiteral): Promise<Array<google.maps.LatLngLiteral>> {
    const events = await db.event.findMany({select:{lat: true, lng: true}});

    return events.map((event) => {
        return {lat: event.lat, lng: event.lng} as google.maps.LatLngLiteral;
    });
}