import L from 'leaflet';
import { Marker, Circle } from 'react-leaflet';
import marker from '../assets/charging.png';

const chargingStationIcon = new L.Icon({
  className: "charging-icon",
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor:  [-0, -15],
  iconSize: [30,30],     
})
export default chargingStationIcon
