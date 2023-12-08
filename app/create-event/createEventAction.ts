'use server';

import { db } from "@/lib/db";
import { Event } from "@prisma/client";

export async function createEvent(newEvent: any) {
    console.log(`DATA: ${newEvent}`);
    // await db.event.create({
    //     data: { ...newEvent }
    // });
}