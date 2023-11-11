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

    return <div ref={ref} id="map"/>;
};



export default function TheMap() {
    return (<Wrapper apiKey=""><MapComponent/></Wrapper>)
}