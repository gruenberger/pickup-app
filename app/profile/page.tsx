import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Paper, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileHomeSelectComponent from "./profileHomeSelectComponent";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GppBadIcon from '@mui/icons-material/GppBad';
import { auth } from "@/auth";
import GameHistoryComponent from "./GameHistory";


export default async function Profile() {
    const session = await auth();

    const updateHomeLocation = async (user: User, coords: google.maps.LatLngLiteral) =>{
        'use server';
        const updatedUser: User = {
            ...user,
            homeCenter: [coords.lat,coords.lng]
        };
        try {
        const returnVal = await db.user.update({
            where:{id: user.id},
            data: updatedUser
        });
        console.log(`Updated user ${returnVal.homeCenter}`);
        } catch(error){
            console.log(`Error saving user: ${error}`);
        }
    };
    if(!session || !session.user){
        return <p>Please Log in to continue.</p>
    } else if(session.user && session.user.id){
        try{
            const user: User = await db.user.findUniqueOrThrow({where: {id: session.user.id}});
            const createdGames = user.eventsCreated || [];
            const attendedGames = user.eventsAttended || [];
            return(
            <Box sx={{flexGrow:1}}>
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Grid paddingBottom={1}>
                        <Paper elevation={6}>
                            <Typography variant="h4">Profile</Typography>
                            <Typography variant="h6">Email</Typography>
                            <Box display="flex" alignItems="center">
                            <Typography variant="body1">{user.email}</Typography>{user.emailVerified ? <VerifiedUserIcon titleAccess="Verified Email" color="success"/> : <GppBadIcon titleAccess="Unverified Email" color="error"/>}
                            </Box>
                            <Typography variant="h6">Player UID</Typography>
                            <Typography variant="body1">{user.id}</Typography>
                            <Typography variant="h6">Name</Typography>
                            <Typography variant="body1">{user.name}</Typography>
                            <Typography variant="h6">Home Coordinates</Typography>
                            <Tooltip title="Click on the map to set a new home location.">
                                <Typography variant="body1">{user.homeCenter[0]}, {user.homeCenter[1]}</Typography>
                            </Tooltip>                        
                        </Paper>
                        </Grid>
                        <Grid>
                            <GameHistoryComponent created={createdGames} attended={attendedGames} />
                        </Grid>
                        </Grid>
                    <Grid xs={6}>
                        <ProfileHomeSelectComponent user={user} updateLocation={updateHomeLocation}/>
                    </Grid>
                </Grid>
            </Box>
            );
        }catch(error){
            return <Typography variant='h6'>Error retrieving User profile.</Typography>
        }

    }
}