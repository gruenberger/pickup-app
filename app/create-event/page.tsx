import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/dist/server/api-utils";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


import { db } from "@/lib/db";
import { Box, Button, Paper, TextField } from "@mui/material";
import { MapComponent } from "../map/MapComponent";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ReactElement } from "react";


export default async function CreateEventPage() {
    async function createEvent(formData: FormData){
        'use server';

        console.log(formData);
    }
    const userData = await getServerSession(authOptions)
    .then((session) =>{
      return session?.user;
    });

    const render = (status: Status):ReactElement => {
        if(status == Status.LOADING ||
            status == Status.FAILURE
            ) return <h3>{status} ..</h3>
        return <></>
    }


    if(!userData){
        return <p>Please Log in to continue.</p>
    } else{
        const email = userData.email? userData.email: '';
        const name = userData.name ? userData.name : '';
        const user = await db.user.findUnique({
            where: {
                email: email,
                name: name
            }        
        });

        const userLat = user?.homeCenter[0]? user?.homeCenter[0]: 39.2654073;
        const userLng = user?.homeCenter[1]? user?.homeCenter[1]: -76.5139326;
        const startCenter: google.maps.LatLngLiteral = 
            {
                lat: userLat,
                lng: userLng 
            };


        return (
        <form action={createEvent}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                                 
                    <Grid xs={6} >
                        <Paper elevation={3}>
                        <Grid xs={12}>
                            <TextField
                                name="name"
                                helperText="Give the event a name."
                                type="text"
                                label="Name"
                                fullWidth
                                required
                                />
                                </Grid>
                        <Grid xs={12}>
                            <TextField
                                name="description"
                                multiline
                                rows={6}
                                label="Description"
                                helperText="Describe the event."
                                type="text"
                                fullWidth
                                required
                                />
                            </Grid>
                        <Grid xs={12}>
                            <TextField 
                                name="startTime"
                                type="datetime-local"
                                label="Start Time"
                                helperText="Set the start date and time of the event."
                                fullWidth
                                required
                                />
                        </Grid>
                        <Grid xs={12}>
                            <TextField 
                                name="endTime"
                                type="datetime-local"
                                label="End Time"
                                helperText="Set the end date and time of the event."
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid xs={12} >
                            <Button type='submit' variant='contained'>
                            Create Event
                            </Button>
                        </Grid>
                        </Paper>
                    </Grid>
                    <Grid xs={6}>
                        <p>Map Goes here.</p>
                        {/* <Paper elevation={3}> 
                        <Wrapper apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? ""}
                            render={render}>
                            <MapComponent
                                center={startCenter}
                                zoom={16}
                                games={[]}
                            />
                        </Wrapper>
                        { </Paper> */}
                    </Grid>                
                </Grid>                 
            </Box>
        </form>
        );
    }
}