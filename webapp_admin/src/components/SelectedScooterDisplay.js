import { React } from 'react-router-dom'
import scooterModel from '../models/scooters'
import '../App.css'
import { useEffect, useState } from 'react'

function Buttons ({ status, releaseScooter, stopScooter, moveToChargingStation, removeScooterForService }) {
  if (status === 0) {
    return (
      <>
        <button onClick={releaseScooter}>Gör cykel tillgänglig</button>
        <button onClick={moveToChargingStation}>Flytta till laddstation</button>
        <button onClick={removeScooterForService}>Hämta för service</button>
      </>
    )
  } else if (status === 1) {
    return (<button onClick={stopScooter}>Avsluta resa</button>)
  } else if (status === 6) {
    <></>
  } else {
    return (
      <>
        <button onClick={moveToChargingStation}>Flytta till laddstation</button>
        <button onClick={removeScooterForService}>Hämta för service</button>
      </>
    )
  }
}

export default function SelectedScooterDisplay ({
  chargingStations, setSelectedStation, selectedScooter,
  setSelectedMode, setSelectedScooter, selectedTrip, scootersInfo
}) {
  const dummyScooter = { status: 0, id: 0, pos: [0, 0], battery: 100 }
  const [currentScooterInfo, setCurrentScooterInfo] = useState(dummyScooter)

  useEffect(() => {
    const filterResult = scootersInfo.filter(scooter => scooter.id === selectedScooter.id)
    const newScooterInfo = filterResult[0]
    if (filterResult.length > 0) {
      setCurrentScooterInfo(newScooterInfo)
    }
  }, [scootersInfo, selectedScooter])

  const statusStrings = {
    0: 'Stoppad av admin.',
    1: 'Används',
    2: 'Parkerad utanför P-zon',
    3: 'Parkerad i P-zon',
    4: 'Laddar (inte tillgänglig)',
    5: 'Urladdad  ',
    6: 'Hämtad för underhåll'
  }

  async function stopScooter () {
    const tripReport = await scooterModel.endTrip(selectedTrip.id)
    const oldScooter = selectedScooter
    oldScooter.status = tripReport.new_scooter_status
    setSelectedScooter(oldScooter)
  }

  function releaseScooter () {
    scooterModel.changeScooterStatus(selectedScooter.id, 2)
    const oldScooter = selectedScooter
    oldScooter.status = 2
    setSelectedScooter(oldScooter)
  }

  function removeScooterForService () {
    scooterModel.changeScooterStatus(selectedScooter.id, 6)
    const oldScooter = selectedScooter
    oldScooter.status = 6
    setSelectedScooter(oldScooter)
  }

  async function moveToChargingStation () {
    const newScooterInfo = await scooterModel.changeScooterStatus(selectedScooter.id, 4)
    const matchingStations = chargingStations.filter(station => station.pos.join() === newScooterInfo.pos.join())
    const newStation = matchingStations[0]
    setSelectedScooter(dummyScooter)
    setSelectedStation(newStation)
    setSelectedMode('station')
  }

  return (
    <div className='selected-display'>
      <h2>Cykel {selectedScooter.id}</h2>
      <p className='display-label'>Status</p>
      <p> {selectedScooter.status} - {statusStrings[selectedScooter.status]}</p>
      <p className='display-label'>Position</p>
      <p>{currentScooterInfo.pos[0].toString().slice(0, 8)}</p>
      <p>{currentScooterInfo.pos[1].toString().slice(0, 8)}</p>
      <p>Batteri: {selectedScooter.battery}%</p>
      {selectedTrip.id !== 0 ? <p>Hyrs av: Kund {selectedTrip.customer_id}</p> : null}
      <Buttons
        removeScooterForService={removeScooterForService} status={selectedScooter.status}
        moveToChargingStation={moveToChargingStation} releaseScooter={releaseScooter} stopScooter={stopScooter}
      />
    </div>
  )
}
