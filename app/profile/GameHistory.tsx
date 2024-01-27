'use client';

import { Paper, Accordion, AccordionSummary, Typography, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Event } from "@prisma/client";
import { getEventsCreated, getEventsAttended, getFriendsList, getFriendsListStub } from "./profileActions";
import { useEffect, useState } from "react";

export interface GameHistoryProps {
    userId: string
}
export default function GameHistoryComponent({userId}: GameHistoryProps) {
    
    const [createdGames, setCreatedGames] = useState<Event[]>([]);
    const [attendedGames, setAttendedGames] = useState<Event[]>([]);
    const [friendsList, setFriendsList] = useState<string[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const fetchedAttended = await getEventsAttended(userId);
              const fetchedCreated = await getEventsCreated(userId);
              const fetchFriendsList = await getFriendsListStub(userId);
              setCreatedGames(fetchedCreated);
              setAttendedGames(fetchedAttended);
              setFriendsList(fetchFriendsList);
            } catch (e: any) {
              setError(e);
            } finally {
              setLoading(false);
            }
          };      
          fetchData();
    }, []);


    if(error){
        return <Typography>Error Loading Events.</Typography>;
    }

    if(loading){
        return <CircularProgress />;
    }

    return(
        <Paper elevation={6}>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="created-events-content"
                    id="created-events-content"
                >
                    <Typography variant="h6">Created Events</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label={`Events Created by User ${userId}`}>
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Activity</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {(createdGames).map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.startTime.toLocaleTimeString()}</TableCell>
                                <TableCell align="right">{row.activity}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label={`Events Attended by User ${userId}`}>
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Activity</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {(attendedGames).map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.startTime.toLocaleTimeString()}</TableCell>
                                <TableCell align="right">{row.activity}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 650}} aria-label={`Friends of User ${userId}`}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>UserName</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(friendsList)?.map((friend) => (
                                    <TableRow
                                    key={friend}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {friend}
                                    </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>                            
        </Paper>
    );
}