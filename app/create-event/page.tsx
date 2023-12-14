import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/dist/server/api-utils";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


import { db } from "@/lib/db";
import { Box } from "@mui/material";
import EventForm from "@/app/create-event/EventForm";
import { notFound } from "next/navigation";


export default async function CreateEventPage() {
    const session = await getServerSession(authOptions);

    if(!session){
        return <h3>Please sign in to create events.</h3>
    }

    const user = await db.user.findFirst({
        where: {
            email: session?.user?.email,
            name: session?.user?.name
        }
    })

    if(!user) {
        return notFound();
    }

    return (
        <Box>
            <Grid container >
                <Grid xs={12}>
                    <EventForm user={user} />
                </Grid>
            </Grid>
        </Box>
    );
}