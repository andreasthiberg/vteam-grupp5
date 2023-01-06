import * as L from "leaflet";
import marker from '../assets/scooter.png';

//Custom scooter icon
const icons = {
    1: new L.Icon({
        className: "scooter-marker-used",
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -0],
        iconSize: [30,30],     
    }),
    2: new L.Icon({
        className: "scooter-marker-available",
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -0],
        iconSize: [30,30],     
    }),
    3: new L.Icon({
        className: "scooter-marker-available",
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -0],
        iconSize: [30,30],     
    }),
    4: new L.Icon({
        className: "scooter-marker-charging",
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -0],
        iconSize: [30,30],     
    }),
    5: new L.Icon({
        className: "scooter-marker-out-of-batteries",
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -0],
        iconSize: [30,30],     
    }),
}   

export default icons;