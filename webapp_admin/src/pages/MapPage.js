import React from "react";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
// import { Icon } from "leaflet";
//import * as parkData from "../data/skateboard-parks.json";
import "../App.css";

// export const icon = new Icon({
//   iconUrl: "/skateboarding.svg",
//   iconSize: [25, 25]
// });

export default function LeafletMap() {
  // const [activePark, setActivePark] = React.useState(null);

  return (
    <div>
      <p>Ska ligga under scooters</p>
      <MapContainer center={[45.4, -75.7]} zoom={12}>

      </MapContainer>


    </div>

    // <div>
    //   Map
    // </div>

  );
}
