import { useEffect, useState } from 'react'
import { React } from 'react-router-dom'
import '../App.css'

export default function ChargingStationList ({ scooterData, stationData, setSelectedStation, selectedStation }) {
  const [chargingNumbers, setChargingNumbers] = useState({ id: 0, amount: 0 })

  useEffect(() => {
    const stationIdsInScooters = scooterData.map(scooter => scooter.station)
    const counts = {}

    for (const num of stationIdsInScooters) {
      if (num === 0) {
        continue
      }
      counts[num] = counts[num] ? counts[num] + 1 : 1
    }
    setChargingNumbers(counts)
  }, [scooterData])

  function handleStationChange (station) {
    setSelectedStation(station)
  }

  function scrollToSelectedStation (id) {
    const listDiv = document.getElementById('unit-list-div')
    const selectedDiv = document.getElementById('station-div-' + id)
    if (listDiv !== null && selectedDiv !== null) {
      listDiv.scrollTop = selectedDiv.offsetTop
    }
  }

  // SCroll to selected station when changed
  useEffect(() => {
    scrollToSelectedStation(selectedStation.id)
  }, [selectedStation])

  return (
    <div>
      {stationData.map((station) => (
        <div
          className={`single-station-div ${station.id === selectedStation.id ? 'selected-scooter-div' : ''}`}
          key={station.id} onClick={() => handleStationChange(station)}
          id={`station-div-${station.id}`}
        >
          Laddstation {station.id} {chargingNumbers[station.id] ? <span className='station-scooter-number'>{chargingNumbers[station.id]}st</span> : null}

        </div>
      ))}
    </div>
  )
}
