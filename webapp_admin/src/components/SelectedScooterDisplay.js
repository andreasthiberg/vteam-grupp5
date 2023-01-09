import { React } from 'react-router-dom';
import scooterModel from '../models/scooters'
import "../App.css";

function Buttons({status, releaseScooter, stopScooter, chargeScooter}){
  if(status === 0){
     return(
      <>
     <button onClick={releaseScooter}>Gör cykel tillgänglig</button>
     <button onClick={chargeScooter}>Flytta till laddstation</button>
    <button>Flytta till parkering</button>
    </>)
  } else if (status === 1){
    return(<button onClick={stopScooter}>Avsluta resa</button>)
  } else {
    return(
    <>
     <button onClick={chargeScooter}>Flytta till laddstation</button>
    </>
    )
  }
}

export default function SelectedScooterDisplay({selectedScooter,setSelectedScooter,selectedTrip}) {


  const statusStrings = {
    0: "Stoppad av admin.",
    1: "Används",
    2: "Parkerad utanför P-zon",
    3: "Parkerad i P-zon",
    4: "Laddar (inte tillgänglig)",
    5: "Urladdad  ",
    6: "Hämtad för underhåll"
  }

function stopScooter(){
  scooterModel.changeScooterStatus(selectedScooter.id,0)
  let oldScooter = selectedScooter;
  oldScooter.status = 0;
  setSelectedScooter(oldScooter)
}

function releaseScooter(){
  scooterModel.changeScooterStatus(selectedScooter.id,2)
  let oldScooter = selectedScooter;
  oldScooter.status = 2;
  setSelectedScooter(oldScooter)
}

function chargeScooter(){
  scooterModel.moveScooterToChargingStation(selectedScooter.id)
  console.log("Hej")
  let oldScooter = selectedScooter;
  oldScooter.status = 4;
  setSelectedScooter(oldScooter)
}

function moveToChargingStation(){
  console.log("moving to charging")

  scooterModel.moveToCharging(selectedScooter.id);
}

return (
    <div className="selected-display">
        <h2>Cykel {selectedScooter.id}</h2>
        <p className="display-label">Status</p>
        <p> {selectedScooter.status} - {statusStrings[selectedScooter.status]}</p>
        <p className="display-label">Position</p>
        <p>{selectedScooter.pos[0]}</p>
        <p>{selectedScooter.pos[1]}</p>
        <p>Batteri: {selectedScooter.battery}%</p>
        <p>Hyrs av: Kund {selectedTrip.id}</p>
        <Buttons status={selectedScooter.status} chargeScooter={moveToChargingStation} releaseScooter={releaseScooter} stopScooter={stopScooter}/>
    </div>
  );
}

