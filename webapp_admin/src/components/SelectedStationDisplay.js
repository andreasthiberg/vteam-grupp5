import { useEffect, useState } from 'react';
import { React } from 'react-router-dom';
import "../App.css";


export default function SelectedStationDisplay({scootersInfo, chargingScooters, selectedStation}) {

const [presentScooters,setPresentScooters] = useState([])


useEffect(() => {
  let matchingScooters = [];
  for(let i = 0; i < chargingScooters.length; i++){
    if(chargingScooters[i].stationId === selectedStation.id){
      let filterResult = scootersInfo.filter(scooter => scooter.id === chargingScooters[i].scooterId);
      let matchingScooter = filterResult[0]
      matchingScooters.push(matchingScooter)
    }
  }
  setPresentScooters(matchingScooters)

},[selectedStation,scootersInfo])

return (
    <div className="selected-display">
        <h2>Station {selectedStation.id}</h2>
        <p className="display-label">Position:</p>
        <p>{selectedStation.pos[0].toString().slice(0,8)}</p>
        <p>{selectedStation.pos[1].toString().slice(0,8)}</p>
        <p className="display-label">{presentScooters.length} Cyklar</p>
        <div>{presentScooters.map((scooter) => (<div key={scooter.id}>{scooter.id} - {scooter.battery}% batteri.</div>))}</div>
        <p></p>
    </div>
  );
}

