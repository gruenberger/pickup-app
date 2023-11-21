"use client";

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React,{ ReactElement, useEffect, useRef, useState } from "react";
import { Loader } from '@googlemaps/js-api-loader';

    type LatLng = google.maps.LatLngLiteral;

function MapComponent(){
    const ref = React.useRef<HTMLDivElement>(null);
    const mapRef = React.useRef<google.maps.Map>(null);
    
    let defaultLoc: google.maps.LatLngLiteral = {lat: 90, lng: 0};
    let zoom: number = 16;

    const [center, setCenter] = useState<LatLng>(defaultLoc); 



   


    useEffect( () => {
        
        navigator.geolocation.getCurrentPosition(success(setCenter), null );
        let map: google.maps.Map | null = null;

        if(mapRef.current == null){
            map = new window.google.maps.Map(ref.current as HTMLElement, {
                center,
                zoom,
                mapId: "id" });
        }else{
            console.log('mapRef.current not null', mapRef.current)
            map = mapRef.current;
            map.setCenter(center);
        }



       
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? "",
        })

        loader.importLibrary("marker").then( markerLibrary => {
            const marker = new markerLibrary.AdvancedMarkerElement({
                map: map,
                position: center,
                title: "username"
            })
        }).catch((e) => {
            console.log(e);

        });
        
    });


        return <div ref={ref} id="map" style={{ width: "1000px" , height: "700px" }}>
    </div>;

};

function success(setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>){

    return (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const loc: LatLng = {lat: latitude, lng: longitude};
        console.log('location', loc);
        setCenter(loc);
    };

}


const render = (status: Status):ReactElement => {
    if(status == Status.LOADING ||
        status == Status.FAILURE
        ) return <h3>{status} ..</h3>

    return <></>
}



export default function PickupsMap() {


    let apiKey: string = process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? "";
    console.log(apiKey);


    return (<Wrapper apiKey={apiKey} render={render}><MapComponent/></Wrapper>)
}