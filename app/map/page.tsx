"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import React,{ useEffect, useRef } from "react";


function MapComponent(){
    const ref = useRef<HTMLDivElement | null>(null);
    let center: google.maps.LatLngLiteral = {lat: -34.397, lng: 150.644};
    let zoom: number = 4;


    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom 
        });
    });

    return <div ref={ref} id="map" style={{ width: "1000px" , height: "700px" }}/>;
};



export default function PickupsMap() {

    let apiKey: string = process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? "";



    return (<Wrapper apiKey={apiKey}><MapComponent/></Wrapper>)
}