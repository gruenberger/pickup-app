import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Settings() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        return <p>Please Log in to continue.</p>
    } else{
    return <p>Change your settings here or whatever.</p>;
    }
}