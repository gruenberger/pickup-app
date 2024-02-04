"use server";

import AddFriendComponent from "./AddFriendComponent";
import {auth} from "@/auth";
import {db} from "@/lib/db";
import { notFound } from "next/navigation";





export default async function Page(){
    const session = await auth();

    if(!session){
        return <h3>Please sign in to create events.</h3>
    }

    const user = await db.user.findUnique({
        where: {
            id: session.user?.id
        }
    })

    if(!user) {
        return notFound();
    }



    return <AddFriendComponent userId={user.id} />
}



