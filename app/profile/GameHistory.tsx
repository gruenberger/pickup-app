'use client';

import { Paper, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Event } from "@prisma/client";

export interface GameHistoryProps {
    created: number[]
    attended: number[]
}
export default function GameHistoryComponent({created, attended}: GameHistoryProps) {

    return(
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
    );
}