import * as L from "leaflet";
import marker from '../assets/scooter.png';

export default function createIcon(status,selected=false){

    let selectedClass = ""
    let zIndex = 0
    let iconAnchor = [0,0];
    if(selected){
        selectedClass = " selected-scooter-icon"
        zIndex = 1000
        iconAnchor = [26,26]
    }

    //Custom scooter icon
    const icons = {
    0: new L.Icon({
        className: "scooter-marker-disabled"+ selectedClass,
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -10],
        iconAnchor: iconAnchor,
        iconSize: [20,20],
        zIndexOffset: zIndex     
    }),
    1: new L.Icon({
        className: "scooter-marker-used" + selectedClass,
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -10],
        iconAnchor: iconAnchor,
        iconSize: [20,20],
        zIndexOffset: zIndex     
    }),
    2: new L.Icon({
        className: "scooter-marker-available" + selectedClass,
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -10],
        iconSize: [20,20],     
        iconAnchor: iconAnchor,
        zIndexOffset: zIndex  
    }),
    3: new L.Icon({
        className: "scooter-marker-available-parking" + selectedClass,
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -10],
        iconSize: [20,20],
        iconAnchor: iconAnchor,
        zIndexOffset: zIndex       
    }),
    4: new L.Icon({
        className: "scooter-marker-charging" + selectedClass,
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -10],
        iconSize: [20,20],
        iconAnchor: iconAnchor,
        zIndexOffset: zIndex       
    }),
    5: new L.Icon({
        className: "scooter-marker-out-of-batteries" + selectedClass,
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor:  [-0, -10],
        iconSize: [20,20],  
        iconAnchor: iconAnchor,
        zIndexOffset: zIndex     
    })
    }
    let selectedIcon = icons[status];
    return selectedIcon;
}   


