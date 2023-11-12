"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import React,{ useEffect, useRef } from "react";


function MapComponent(){
    const ref = React.useRef<HTMLDivElement>(null);
    let center: google.maps.LatLngLiteral = {lat: 39, lng: -76};
    let zoom: number = 100;


    useEffect(() => {
        new window.google.maps.Map(ref.current as HTMLElement, {
            center,
            zoom 
        });
    });

    return <div ref={ref} id="map" style={{ width: "1000px" , height: "700px" }}/>;
};



export default function PickupsMap() {


    let apiKey: string = process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? "";
    console.log(apiKey);


    return (<Wrapper apiKey={apiKey}><MapComponent/></Wrapper>)
}