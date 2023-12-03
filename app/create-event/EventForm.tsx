"use client";

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs, { Dayjs } from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';

import 'dayjs/locale/en'; // import locale
import { Event } from '@prisma/client';
import { Description } from '@mui/icons-material';
import { saveEvent}  from '../lib/db'; 

dayjs.extend(isLeapYear) // use plugin
dayjs.locale('en') // use locale

interface FormData {
  name: string;
  description: string;
  //location: google.maps.LatLngLiteral;
  location: string;
  startTime: Dayjs;
  endTime: Dayjs;
}

export default function EventForm({ user }: any) {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
       // location: { lat: 0, lng: 0 },
       location: "1.000,1.000",
        startTime: dayjs(new Date()),
        endTime: dayjs(new Date()),
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleLocationChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // Assuming the input value is a stringified JSON representation of google.maps.LatLngLiteral
        //const location = JSON.parse(event.target.value);
        const location = event.target.value;
        setFormData((prevData) => ({
        ...prevData,
        location,
        }));
    };

    const handleDateTimeChange = (field: 'startTime' | 'endTime', date: Dayjs | null) => {
        if (date) {
        setFormData((prevData) => ({
            ...prevData,
            [field]: date,
        }));
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);
        //create event
        let e: Event = {
            id: 0,
            name: formData.name,
            description: formData.description,
            // why is location a number drew ?
            location: 0,
            // where is the user information
            owner: 'bje301@gmail.com',
            activity: 'basketball',
            attendance: [1],
            createdAt: new Date(),
            startTime: formData.startTime.toDate(),
            endTime: formData.endTime.toDate()
        }

        saveEvent(e);

    };

    return (
        <form onSubmit={handleSubmit}>
        <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
        />
        <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            required
        />
        <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            fullWidth
            required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
            label="Start Time"
            value={formData.startTime}
            onChange={(date) => handleDateTimeChange('startTime', date)}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: null,
              }}
            />
            <MobileDateTimePicker
            label="End Time"
            value={formData.endTime}
            onChange={(date) => handleDateTimeChange('endTime', date)}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: null,
              }}
            />
        </LocalizationProvider>
        <Button type="submit" variant="contained" color="primary">
            Submit
        </Button>
        </form>
    );
    
}
