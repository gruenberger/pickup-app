"use client";
import React, { useEffect, useState } from "react";
import { Loader } from '@googlemaps/js-api-loader';
import { LatLng } from "./page";

export function MapComponent({ center, zoom, games }: { center: LatLng, zoom: number, games: Array<LatLng> }) {
    const ref = React.useRef<HTMLDivElement>(null);

    let defaultLoc: google.maps.LatLngLiteral = { lat: 90, lng: 0 };
    //let zoom: number = 16;

    useEffect(() => {

        const map = new window.google.maps.Map(ref.current as HTMLElement, {
            center,
            zoom,
            mapId: "id"
        });

        // move api key a context 
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? "",
        });

        loader.importLibrary("marker").then(markerLibrary => {

            const marker = new markerLibrary.AdvancedMarkerElement({
                map: map,
                position: center,
                title: "username"
            });

            games.forEach(game => {

                new markerLibrary.AdvancedMarkerElement({
                    map: map,
                    position: game,
                    title: "match"
                })

            })

        }).catch((e) => {
            console.log(e);

        });

    });

    return <div ref={ref} id="map" style={{ width: "1000px", height: "700px" }}>
    </div>;

} 