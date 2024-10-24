"use client";

import  { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { APIProvider, AdvancedMarker, Pin, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { Event, User } from "@prisma/client";
import { getEventById } from "./mapActions";
import { EventMapSumm } from "./mapActions";

// Activity Icon imports
import { Activities, getActivityIcon, getName } from "@/lib/activities";
import JoinButton from "./JoinButton";
import 'dayjs/locale/en'; // import locale
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// DayJS
import dayjs, { Dayjs } from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(isLeapYear); // use plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('en'); // use locale

export interface MapComponentProps {
    events: EventMapSumm[];
    user: User | undefined;    
}

export function MapComponent({events, user}: MapComponentProps) {
    const [infoWindowEvent, setInfoWindowEvent] = useState<Event | null>();  
    const [infowindowShown, setInfowindowShown] = useState(false);
    const [clientEvents, setEvents] = useState(events);
    const [activityFilter, setActivityFilter] = useState("All");
    const [startTimeRangeValue, setStartTimeRangeValue] = useState<Dayjs>(dayjs());
    const [endTimeRangeValue, setEndTimeRangeValue] = useState<Dayjs>(dayjs().add(12, 'hour'))

    const center: google.maps.LatLngLiteral = user? {lat:user.homeCenter[0], lng:user.homeCenter[1]}: {lat: 0, lng: 0};
    
    
    const closeInfoWindow = () => setInfowindowShown(false);

    // When the info window opens, fetch the event info
    const handleInfoWindow = (eventSumm: EventMapSumm ) => {
        const fetchEventById = async () => {
            const fetchedEv = await getEventById(eventSumm.id) ;           
            setInfoWindowEvent(fetchedEv);
            setInfowindowShown(true);
        };
        fetchEventById();
    };

    // Activity Filter change handler
    const handleActivityFilterChange = (event: SelectChangeEvent) => {
        const activity = event.target.value;
        if (activity === "All"){
            setActivityFilter(activity);
            setEvents(events);
        }else{
            setActivityFilter(activity);
            setEvents(events.filter((e) => e.activity === activity));
        }        
    };

    const handleStartTimeRangeChange = (newStartTime: Dayjs | null): void => {
        if (newStartTime) {
            setStartTimeRangeValue(newStartTime);
            if (newStartTime.isAfter(endTimeRangeValue)) {
                setEndTimeRangeValue(newStartTime.add(12, 'hour'));
            }
            // Filter events by start time
            let possibleEvents = events.filter((event) =>  event.startTime >= newStartTime.utc().toDate())
                .filter((event) => event.endTime <= endTimeRangeValue.utc().toDate())
                .filter((event) => event.activity === activityFilter);
            console.log(possibleEvents);
            setEvents(possibleEvents);
        }
    };

    const handleEndTimeRangeChange = (newEndTime: Dayjs | null): void => {
        if (newEndTime) {
            setEndTimeRangeValue(newEndTime);
            // Filter events by end time
            let possibleEvents = events.filter((event) => event.endTime <= newEndTime.utc().toDate())
                .filter((event) =>  event.startTime >= startTimeRangeValue.utc().toDate())
               .filter((event) => event.activity === activityFilter);
            console.log(possibleEvents);
            setEvents(possibleEvents);
        }
    }

    return (
        <Grid container>
            <Grid xs={1}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="activity-filter-label">Activity</InputLabel>
                    <Select
                        labelId="activity-filter-label"
                        id="activity-filter"
                        value={activityFilter}
                        label="Activity"
                        onChange={handleActivityFilterChange}
                    >
                        <MenuItem key="all" value="All">All</MenuItem>
                        {Activities.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                    </MenuItem>
                                ))}
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>                        
                        <MobileDateTimePicker
                            label="Start Time"
                            value={startTimeRangeValue}
                            disablePast
                            formatDensity='spacious'
                            timezone='UTC'
                            onChange={(date) => handleStartTimeRangeChange(date)}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: null,
                            }}
                            sx={{marginTop: "16px", marginBottom: "8px"}}                 
                        />
                        <MobileDateTimePicker
                            label="End Time Range"
                            value={endTimeRangeValue}
                            disablePast
                            timezone='UTC'
                            formatDensity='spacious'
                            onChange={(date) => handleEndTimeRangeChange(date)}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: null,
                            }}
                            sx={{marginTop: "16px", marginBottom: "8px"}}                 
                        />                        
                    </LocalizationProvider>
                </FormControl>
            </Grid>
            <Grid xs={11}>
                <Paper elevation={6}>                    
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY as string}>
                    <div style={{height: '100vh', width: '100%'}}> 
                    <Map  zoom={16} center={center} 
                        mapId={process.env.NEXT_PUBLIC_GMAPS_MAP_ID}>
                            {clientEvents && clientEvents?.map((event)=>(
                                <AdvancedMarker key={event.id} position={{lat:event.lat,lng:event.lng}} onClick={() =>handleInfoWindow(event)}>
                                    <Pin background={'white'} borderColor={'#1976d2'}>
                                        {getActivityIcon(event.activity)}
                                    </Pin>
                                </AdvancedMarker>
                            ))}
                            {infowindowShown && (
                            <InfoWindow position={infoWindowEvent? {lat:infoWindowEvent?.lat,lng: infoWindowEvent?.lng} : null} onCloseClick={closeInfoWindow}>
                                {infoWindowEvent && (
                                    <Box>
                                        <Typography variant='h6'>
                                            {infoWindowEvent.name}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Activity: ${getName(infoWindowEvent.activity)}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Description: ${infoWindowEvent.description}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Starts at: ${infoWindowEvent.startTime.toLocaleDateString()} at ${infoWindowEvent.startTime.toLocaleTimeString()}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Owner: ${infoWindowEvent.owner}`}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {`Total Number Planning to Attend: ${infoWindowEvent.attendance.length}`}
                                        </Typography>
                                    </Box>
                                )}
                                {(infoWindowEvent && user) && (
                                    <JoinButton 
                                        infoWindowSetter={setInfoWindowEvent}
                                        event={infoWindowEvent}
                                        infoWindowClose={setInfowindowShown}
                                        user={user}
                                        setEvents={setEvents}
                                        />
                                )}                     
                            </InfoWindow>                            
                            )}
                    </Map>
                    
                    </div>
                </APIProvider>
            </Paper>
            </Grid>
        </Grid>
    );
} 