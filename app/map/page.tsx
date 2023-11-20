"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import React,{ useEffect, useRef, useState } from "react";
import { Loader } from '@googlemaps/js-api-loader';

    type LatLng = google.maps.LatLngLiteral;

    const geoLoc = 0;



    function MapComponent(){
    
    const ref = React.useRef<HTMLDivElement>(null);
    let defaultLoc: google.maps.LatLngLiteral = {lat: 39, lng: -76};
    let zoom: number = 16;

    const [center, setCenter] = useState<LatLng>(defaultLoc);

    const [loadCount, setLoadCount] = useState(0);




    useEffect( () => {
    
        // this is probably stupid
        navigator.geolocation.getCurrentPosition(success(setCenter), null );
       // setLoadCount(loadCount+1);
       // console.log('count:',loadCount);


        const map = new window.google.maps.Map(ref.current as HTMLElement, {
            center,
            zoom,
            mapId: "id" 
        });


       /*  const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? "",
        })
 */

       /*  loader.importLibrary("marker").then( markerLibrary => {
            const marker = new markerLibrary.AdvancedMarkerElement({
                map: map,
                position: center,
                title: "username"
            })
        }).catch((e) => {
            console.log(e);

        }); */

        
    },[ref]);

    return <div ref={ref} id="map" style={{ width: "1000px" , height: "700px" }}>
        <p>{loadCount}</p>
    </div>;
};

function success(setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>){

    geoLoc+1;
    console.log('geoloc', geoLoc);

    return (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const loc: LatLng = {lat: latitude, lng: longitude};

        setCenter(loc);
    };

}



export default function PickupsMap() {


    let apiKey: string = process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? "";
    console.log(apiKey);


    return (<Wrapper apiKey={apiKey}><MapComponent/></Wrapper>)
}