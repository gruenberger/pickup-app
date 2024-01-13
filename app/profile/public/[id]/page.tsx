import { db } from "@/lib/db";
import GameHistoryComponent from "../../GameHistory";

interface PublicProfilePageProps {
    params: {
        id: string
    }
}

export default async function PublicProfilePage({params} : PublicProfilePageProps) {
    const id = params.id;

    const user = await db.user.findUnique({where:{id:id}});
    return (

        <GameHistoryComponent userId={id} />
    );
    
}