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
          NOT : {
            owner : userId
          }
        },
      });
    
    return attendedEvents;
}

export async function getFriendsList(userId: string) {
  const friendsList = await db.user.findUnique({
    where: {
      id: userId
    },
    select: {
      friends: true
    }
  }).then(result => result?.friends);

  return friendsList;
}

export async function getFriendsListStub(userId: string) {

  return ["Brian", "Drew", "Obamaa"];
}


