import { db } from "@/lib/db";
import GameHistoryComponent from "../../GameHistory";


export default async function PublicProfilePage({ params }: { params: { id: string } }) {
    const id = params.id;

    const user = await db.user.findUnique({where:{id:id}});
    return (

        <GameHistoryComponent userId={id} />
    );
    
}