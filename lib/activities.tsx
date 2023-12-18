// Obviously this is probably supposed to be a lookup table. Oh well.

import { Games } from "@mui/icons-material";
import DirectionsRun from "@mui/icons-material/DirectionsRun";
import Groups from "@mui/icons-material/Groups";
import Hardware from "@mui/icons-material/Hardware";
import NetworkPing from "@mui/icons-material/NetworkPing";
import PanoramaFishEye from "@mui/icons-material/PanoramaFishEye";
import Skateboarding from "@mui/icons-material/Skateboarding";
import Sports from "@mui/icons-material/Sports";
import SportsBaseball from "@mui/icons-material/SportsBaseball";
import SportsBasketball from "@mui/icons-material/SportsBasketball";
import SportsCricket from "@mui/icons-material/SportsCricket";
import SportsEsports from "@mui/icons-material/SportsEsports";
import SportsFootball from "@mui/icons-material/SportsFootball";
import SportsHockey from "@mui/icons-material/SportsHockey";
import SportsSoccer from "@mui/icons-material/SportsSoccer";
import SportsTennis from "@mui/icons-material/SportsTennis";
import SportsVolleyball from "@mui/icons-material/SportsVolleyball";
import Style from "@mui/icons-material/Style";
import TableRestaurant from "@mui/icons-material/TableRestaurant";
import { SvgIconTypeMap, Table } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactComponentElement } from "react";

export type Activity = {
    name: string,
    value: string,
    icon: string
}

export const Activities: Activity[] = [
    {name: "Soccer", value: "soccer", icon:"SportsSoccer"},
    {name: "Basketball", value: "basketball", icon:"SportsBasketball"},
    {name: "Football", value: "football", icon:"SportsFootball"},
    {name: "Baseball", value: "baseball", icon:"SportsBaseball"},
    {name: "Volleyball", value: "volleyball", icon:"SportsVolleyball"},
    {name: "Lacrosse", value: "lacrosse", icon:"Sports"},
    {name: "Ultimate Frisbee", value: "ultimatefrisbee", icon:"PanoramaFishEye"},
    {name: "Skateboarding", value: "skateboarding", icon:"Skateboarding"},
    {name: "Running", value: "running", icon:"DirectionsRun"},
    {name: "Tennis", value: "tennis", icon:"SportsTennis"},
    {name: "Cricket", value: "cricket", icon:"SportsCricket"},
    {name: "Field Hockey", value: "fieldhockey", icon:"SportsHockey"},
    {name: "Badminton", value: "badminton", icon:"SportsTennis"},
    {name: "Table Tennis", value: "tabletennis", icon:"NetworkPing"},
    {name: "Chess", value: "chess", icon:"TableRestaurant"},
    {name: "Checkers", value: "checkers", icon:"TableRestaurant"},
    {name: "Magic The Gathering", value: "magic", icon:"Style"},
    {name: "Warhammer", value: "warhammer", icon:"Hardware"},
    {name: "Video Game (See Desc)", value: "videogame", icon:"SportsEsports"},
    {name: "Other (See Desc)", value: "other", icon:"Groups"},
];

export function getName(activityValue: string): string {
  const activity = Activities.find((activity) => activity.value === activityValue);

  if (activity) {
    return activity.name;
  }

  return '';
}

export function getIcon(activityValue: string): string {
    const activity = Activities.find((activity) => activity.value === activityValue);
  
    if (activity) {
      return activity.icon;
    }
  
    return '';
  }

  export function getActivityIcon(activityName: string) {
    switch (activityName) {
      case "soccer":
        return <SportsSoccer />;
      case "basketball":
        return <SportsBasketball />;
      case "football":
        return <SportsFootball />;
      case "baseball":
        return <SportsBaseball />;
      case "volleyball":
        return <SportsVolleyball />;
      case "lacrosse":
        return <Sports />; // Use generic "Sports" icon for Lacrosse
      case "ultimatefrisbee":
        return <PanoramaFishEye />; // Use "PanoramaFishEye" for Ultimate Frisbee
      case "skateboarding":
        return <Skateboarding />;
      case "running":
        return <DirectionsRun />;
      case "tennis":
        return <SportsTennis />;
      case "cricket":
        return <SportsCricket />;
      case "fieldhockey":
        return <SportsHockey />; // Use "SportsHockey" for Field Hockey
      case "badminton":
        return <SportsTennis />; // Use "SportsTennis" for Badminton
      case "tabletennis":
        return <NetworkPing />; // Use "NetworkPing" for Table Tennis
      case "chess":
      case "checkers":
        return <TableRestaurant />; // Use "TableRestaurant" for both Chess and Checkers
      case "magic":
        return <Style />; // Use "Style" for Magic: The Gathering
      case "warhammer":
        return <Hardware />; // Use "Hardware" for Warhammer
      case "videogame":
        return <SportsEsports />; // Use "SportsEsports" for Video Games
      case "other":
        return <Groups />; // Use "Groups" for Other category
      default:
        console.warn(`No MUI Icon component found for activity: ${activityName}`);
        return <Groups />;
    }
  }