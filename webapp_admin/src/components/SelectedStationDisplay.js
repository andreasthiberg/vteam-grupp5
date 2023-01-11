import { useEffect, useState } from 'react'
import { React } from 'react-router-dom'
import '../App.css'

export default function SelectedStationDisplay ({ scootersInfo, selectedStation }) {
  const [presentScooters, setPresentScooters] = useState([])

  useEffect(() => {
    setPresentScooters(scootersInfo.filter(scooter => scooter.station === selectedStation.id))
  }, [selectedStation, scootersInfo])

  return (
    <div className='selected-display'>
      <h2>Station {selectedStation.id}</h2>
      <p className='display-label'>Position:</p>
      <p>{selectedStation.pos[0].toString().slice(0, 8)}</p>
      <p>{selectedStation.pos[1].toString().slice(0, 8)}</p>
      <p className='display-label'>{presentScooters.length} Cyklar</p>
      <div>{presentScooters.map((scooter) => (<div key={scooter.id}>{scooter.id} - <span className={scooter.battery < 100 ? 'battery-warning-text' : null}>{scooter.battery}% batteri.</span></div>))}</div>
      <p />
    </div>
  )
}
