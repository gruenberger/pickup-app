import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/dist/server/api-utils";

export default async function CreateEvent() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        return <p>Please Log in to continue.</p>
    } else{
        return <p>Make an event here!</p>;
    }
}