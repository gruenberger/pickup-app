import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        return <p>Please Log in to continue.</p>
    } else{
    return <p>Talk about yourself.</p>;
    }
}