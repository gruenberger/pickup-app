import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileHomeSelectComponent from "./profileHomeSelectComponent";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GppBadIcon from '@mui/icons-material/GppBad';

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        return <p>Please Log in to continue.</p>
    } else if(session.user && session.user.email){
        try{
            const user: User = await db.user.findUniqueOrThrow({where: {email: session.user.email}});
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
                            <Typography variant="body1">{user.homeCenter[0]}, {user.homeCenter[1]}</Typography>                            
                        </Paper>
                        </Grid>
                        <Grid>
                        <Paper elevation={6}>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="created-events-content"
                                    id="created-events-content"
                                >
                                    <Typography variant="h6">Created Games</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Events Here
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="participated-events-content"
                                    id="participated-events-content"
                                >
                                    <Typography variant="h6">Attended Events</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Events Here
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="friends-content"
                                    id="friends-content"
                                >
                                    <Typography variant="h6">Friends</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Friends Here
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>                            
                        </Paper>
                        </Grid>
                        </Grid>
                    <Grid xs={6}>
                        <ProfileHomeSelectComponent user={user}/>
                    </Grid>
                </Grid>
            </Box>
            );
        }catch(error){
            return <Typography variant='h6'>Error retrieving User profile.</Typography>
        }

    }
}