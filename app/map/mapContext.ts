import { createContext } from "react";
import { EventMapSumm } from "./mapActions";

export interface EventsContextType {
    events: EventMapSumm[];
    setEvents: React.Dispatch<React.SetStateAction<EventMapSumm[]>>;
    center: google.maps.LatLngLiteral;
  }
export const EventsContext = createContext<EventsContextType>({
    events: [],
    setEvents: () =>{},
    center: {lat:39.2365569,lng:-76.5031196}
});