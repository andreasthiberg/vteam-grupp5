import L from 'leaflet';
import marker from '../assets/charging.png';

const chargingStationIcon = {
  standard: new L.Icon({
    className: "charging-icon",
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -5],
    iconSize: [30,30],       
  }),
  selected: new L.Icon({
    className: "charging-icon-selected",
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -5],
    iconSize: [30,30],       
  })
}

export default chargingStationIcon;
