'use client';

import { User } from "@prisma/client"
import Grid from "@mui/material/Grid2";
import { APIProvider, AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { useGeolocated } from "react-geolocated";
import { Snackbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';

interface ProfileHomeSelectComponentProps {
    user: User
    updateLocation: Function
        
    }


export default function ProfileHomeSelectComponent({user, updateLocation}: ProfileHomeSelectComponentProps){
    const [coords, setCoords] = useState<google.maps.LatLngLiteral>();
    const [newCoords, setNewCoords] = useState<google.maps.LatLngLiteral>();
    const [open, setOpen] = useState(false);
    const {
        isGeolocationAvailable,
        isGeolocationEnabled
     } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000,
        watchLocationPermissionChange: true,
        onSuccess:(position: GeolocationPosition) => {
            const {latitude,longitude} = position.coords;
            setCoords({lat:latitude,lng:longitude});
        }
        
    });

    function handleMapClick(point: any){
        const {lat,lng } = point.detail.latLng;
        const newPosition: google.maps.LatLngLiteral = 
            {lat:lat,lng:lng};
        setNewCoords(newPosition);
        updateLocation(user, newPosition);
        
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (         
        <Grid container>
            <Grid size={12}>
            {coords ? (
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY as string}>
                <div style={{height: '100vh', width: '100%'}}> 
                    <Map
                        zoom={13}
                        center={coords}
                        mapId={process.env.NEXT_PUBLIC_GMAPS_MAP_ID}
                        onClick={handleMapClick}
                    >
                        <AdvancedMarker position={{lat:user.homeCenter[0], lng:user.homeCenter[1]}}>
                            <Pin background={'white'} borderColor={'red'}>
                                <HomeIcon />                                
                            </Pin>
                        </AdvancedMarker>
                        { newCoords &&
                            <AdvancedMarker position={newCoords}>
                            <Pin background={'white'} borderColor={'green'}>
                                <HomeIcon />                                
                            </Pin>
                        </AdvancedMarker>
                        }
                    </Map>
                </div>
                </APIProvider>
                
            ):(
                <p>Please allow geolocation permission.</p>
            )
            }
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="New Home Location Set"
            />
            </Grid>
        </Grid>        
    );
}
