'use server';

import { db } from "@/lib/db";
import { CreateEventFormData } from "./EventForm";
import { revalidatePath } from "next/cache";

export async function createEvent(newEvent: CreateEventFormData) {
    const event = await db.event.create({data:{
        ...newEvent
    }
});
    console.log(`Event: ${event.id} has been created.`);
    revalidatePath('/map');
    return event;
}