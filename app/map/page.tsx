import { auth } from "@/auth";
import { MapComponent } from "./MapComponent";
import { EventMapSumm, getEvents, getUser } from "./mapActions";

export const revalidate = 10;



export default async function PickupsMap() {
    const session = await auth();
    const events: EventMapSumm[] = await getEvents(null);
    const user = session ? session.user ? await getUser(session.user?.id) : undefined : undefined;
     

    // If the user is logged in, follow this path.
    return <MapComponent events={events} user={user ? user : undefined} />


}

