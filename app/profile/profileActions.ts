'use server';

import { db } from "@/lib/db";

export async function getEventsCreated(userId: string){
    const createdEvents = await db.event.findMany({
        where: {
          owner:  userId,
        },
      });
    
    return createdEvents;
}

export async function getEventsAttended(userId: string){
    const attendedEvents = await db.event.findMany({
        where: {
          attendance: {
            has: userId,
          },
        },
      });
    
    return attendedEvents;
}