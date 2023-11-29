import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/dist/server/api-utils";
import EventForm from "./EventForm";


export default async function CreateEvent() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        return <p>Please Log in to continue.</p>
    } else{
        return <EventForm user={session} />;
    }
}