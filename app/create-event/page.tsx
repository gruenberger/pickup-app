import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreateEvent() {
    const session = await getServerSession();
    
    return <p>Make an event here!</p>;
}