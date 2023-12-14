'use server';

import { db } from "@/lib/db";
import { CreateEventFormData } from "./EventForm";

export async function createEvent(newEvent: CreateEventFormData) {
    const event = await db.event.create({data:{
        ...newEvent
    }
});
    console.log(`Event: ${event.id} has been created.`);
    return event;
}