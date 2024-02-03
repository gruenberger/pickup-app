"use client"

import { Autocomplete, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProfiles } from "./addFriendAction";
import { ProfileSearchResult } from "./models";



export default function AddFriendComponent({renderInput}: any){

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
                <CardContent>
                    {profile.name}
                </CardContent>
            </Card>
           
          ))}      
        </Grid>
}
       