"use client";

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { ReactElement, useEffect, useState } from "react";
import { MapComponent } from "./MapComponent";

export type LatLng = google.maps.LatLngLiteral;

const zoom = 16;

const render = (status: Status):ReactElement => {
    if(status == Status.LOADING ||
        status == Status.FAILURE
        ) return <h3>{status} ..</h3>
    return <></>
}



export default function PickupsMap() {

    let apiKey: string = process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? "";
    console.log(apiKey);
    let [center, setCenter] = useState({lat: 0, lng: 0});
    let [games, setGames] = useState<LatLng[]>([]);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            }, null);
        setGames(getGamesFromDb);
    })

    return (<Wrapper apiKey={apiKey} render={render}>
        <MapComponent center={center} zoom={zoom} games={games}/>
        </Wrapper>)
}

function getGamesFromDb(){
    return new Array<LatLng>();
}