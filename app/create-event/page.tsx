import Grid from '@mui/material/Grid2'; // Grid version 2


import { db } from "@/lib/db";
import { Box } from "@mui/material";
import EventForm from "@/app/create-event/EventForm";
import { notFound } from "next/navigation";
import { auth } from "@/auth";


export default async function CreateEventPage() {
    const session = await auth();

    if(!session){
        return <h3>Please sign in to create events.</h3>
    }

    const user = await db.user.findUnique({
        where: {
            id: session.user?.id
        }
    })

    if(!user) {
        return notFound();
    }

    return (
        <Box>
            <Grid container >
                <Grid size={12}>
                    <EventForm user={user} />
                </Grid>
            </Grid>
        </Box>
    );
}