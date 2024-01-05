import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SettingsComponent, { Settings } from "./SettingsComponent";
import { auth } from "@/auth";

export default async function SettingsPage() {
    const session = await auth();
    const user: User = await db.user.findUniqueOrThrow({
        where: { id: session?.user?.id}
    });

    async function changeUserDistance(settings: Settings){
        'use server';
        const retVal = await db.user.update({
            where: {id: user.id},
            data: {...user,
                distance: settings.distance,
                notifications: settings.notifications
            }
        })
    }
    
    if(!session || !session.user){
        return <p>Please Log in to continue.</p>
    } else if(session.user && session.user.email){
        const user: User = await db.user.findUniqueOrThrow({where: {email: session.user.email}});

        return (
            <Grid container spacing={2}>
                <Grid xs={12} >
                <Paper elevation={6}>
                    <SettingsComponent user={user} changeHandler={changeUserDistance} />
                </Paper>
                </Grid>
            </Grid>

        );
    }else{
        return <Typography variant="h6">Problem getting user settings.</Typography>
    }
}