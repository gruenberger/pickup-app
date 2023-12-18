import { db } from "@/lib/db";
import { MapComponent } from "./MapComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { notFound } from "next/navigation";

const zoom = 14;

export const revalidate = 10;


export default async function PickupsMap() {
    const session = await getServerSession(authOptions);
    const dundalk = {lat:39.2365569,lng:-76.5031196};

    if(!session){
        return <MapComponent user={undefined} center={dundalk} zoom={zoom} />;
    } else {
        const user = await db.user.findFirst({
            where: {
                email: session?.user?.email,
                name: session?.user?.name
            }
        });

        if(!user){
            return notFound();
        }else{
            const center: google.maps.LatLngLiteral = {lat: user.homeCenter[0],lng: user.homeCenter[1]};
            return <MapComponent user={user} center={center} zoom={zoom} />
        }
    }
}

