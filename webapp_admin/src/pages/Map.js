import React from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import './Map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

const Map = () => {
    const position = [59.33, 18.055]
 
    return (
        <div>
        <h2>Stockholm</h2>
        <MapContainer center={position} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    Hej!
                </Popup>
            </Marker>
        </MapContainer>

        </div>
    );

//   return (
//     <MapContainer center={position} zoom={zoom}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//     </MapContainer>
//   )
};

export default Map;
