import React from "react";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import "../App.css";
import MapLun from "../components/MapLun";
import MapSto from "../components/MapSto";
import MapMal from "../components/MapMal";


import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import scooterModel from '../models/scooters';


export default function Scooters() {
    const [scootersInfo, setScootersInfo] = useState([]);
  
    useEffect(() => {
      (async () => {
        const response = await scooterModel.getAllScooters();
  
        setScootersInfo(response.scooters);
  
        })();
    }, []);
  
    let list = scootersInfo.map((scooter, index) => <li key={index}>{scooter.id}{scooter.pos}{scooter.status}{scooter.battery}</li>);
    // let list = scootersInfo.map((scooter, index) => <><tr key={index}></tr><tr {...scooter.id}></tr><tr {...scooter.pos}></tr><tr {...scooter.status}></tr><tr {...scooter.battery}></tr></>);

    return (
    <div>
        <h1>Scooters List Page</h1>
        <p>Egentligen vill jag ha en knapp/rullist med städer och sen kommer kartan upp, men fn ligger de på egen sida</p>
        <h2>List of scooters</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th><th>Position</th><th>Status</th><th>Batteri</th>
            </tr>
          </thead>
          {list}
        </table>
    </div>
    );
}