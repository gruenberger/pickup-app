import { db } from "@/lib/db";
import { MapComponent } from "./MapComponent";
import { notFound } from "next/navigation";
import { getEvents } from "./mapActions";
import { auth } from "@/auth";

const zoom = 14;

export const revalidate = 10;


export default async function PickupsMap() {
    const session = await auth();
    const dundalk = {lat:39.2365569,lng:-76.5031196};
    

    if(!session){
        const events = await getEvents(dundalk);
        return <MapComponent user={undefined} center={dundalk} zoom={zoom} events={events} />;
    } else {
        const user = await db.user.findUnique({
            where: {
                id: session.user?.id
            }
        });

        if(!user){
            return notFound();
        }else{
            const center: google.maps.LatLngLiteral = {lat: user.homeCenter[0],lng: user.homeCenter[1]};
            const events = await getEvents(center);
            return <MapComponent user={user} center={center} zoom={zoom} events={events} />
        }
    }
}

