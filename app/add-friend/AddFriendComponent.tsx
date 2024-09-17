"use client"

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProfiles } from "./addFriendAction";
import { ProfileSearchResult } from "./models";
import { useRouter } from "next/navigation";

export interface AddFriendProps {
    userId: string
}


export default function AddFriendComponent({userId}: AddFriendProps){
    const router = useRouter();

    const [query, setQuery] = useState<string>('');
    const [profiles, setProfiles] = useState<ProfileSearchResult[]>([]);
    

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setQuery(event.target.value); 
    }

    useEffect(()=> {
        const fetchData =async () => {
            const profiles = await getProfiles(query);
            setProfiles(profiles);
        }
        fetchData();

    });

    return <Grid>
        <TextField
            id="friend-search-field"
            label="Search for friends"
            type="search"
            onChange={(text) => handleSearchChange(text)}
        />
        {profiles.map( (profile) => (

            <Card>
                <CardHeader
                    avatar={
                        <Avatar src={profile.image!} />
                    }
                    onClick={() => router.push(`/profile/public/${profile.id}`)}
                />
                <CardContent>
                    {profile.name}
                </CardContent>
                <CardActions>
                    <AddFriendButton userId={userId} profileId={profile.id} />
                </CardActions>
            </Card>
           
          ))}      
        </Grid>
}

interface AddFriendButtonProps {
    userId: string
    profileId: string
}

export function AddFriendButton({userId, profileId}: AddFriendButtonProps){
    const [clicked, setClicked] = useState<boolean>(false);

    const handleButtonClick = () => {
        setClicked(true);
       //sendFriendRequest(userId, profileId);
    };

    const addFriend = "Add Friend";
    const requested = "Requested";
    let buttonText = "";
    if(clicked) {
        buttonText = requested;
    }else{
        buttonText = addFriend;
    }
    console.log(clicked);

    return  (<Button 
        onClick={handleButtonClick}>
        <Typography>
            {buttonText}
        </Typography>
    </Button>);


}
       