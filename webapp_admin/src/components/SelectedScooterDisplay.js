import { React } from 'react-router-dom';
import scooterModel from '../models/scooters'
import "../App.css";

export default function SelectedScooterDisplay({selectedScooter}) {

function stopScooter(){
  console.log(selectedScooter)
  console.log("Hej")
  scooterModel.stopScooter(selectedScooter.id)
}

function moveToChargingStation(){
  console.log("moving to charging")

  scooterModel.moveToCharging(selectedScooter.id);
}

return (
    <div className="selected-display">
        <h2>Cykel {selectedScooter.id}</h2>
        <p>Status: {selectedScooter.status}</p>
        <p>Position:</p>
        <p>{selectedScooter.pos[0]}</p>
        <p>{selectedScooter.pos[1]}</p>
        <p>Batteri: {selectedScooter .battery}%</p>
        <p>Hyrs av</p>
        <p>Hastighet?</p>
        <button onClick={stopScooter}>Stoppa cykel</button>
        <button onClick={moveToChargingStation}>Flytta till laddstation</button>
        <button>Flytta till parkering</button>
    </div>
  );
}

