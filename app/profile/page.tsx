import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await getServerSession();
    
    return <p>Talk about yourself.</p>;
}