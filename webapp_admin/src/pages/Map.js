import { React } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../App.css'
import AdminMap from '../components/AdminMap'
import ChargingStationList from '../components/ChargingStationList'
import SelectedStationDisplay from '../components/SelectedStationDisplay'
import SelectedScooterDisplay from '../components/SelectedScooterDisplay'
import scooterModel from '../models/scooters'
import mapModel from '../models/map'
import ScooterList from '../components/ScooterList'
import CategogrySelect from '../components/CategorySelect'
import StatusSymbols from '../components/StatusSymbols'

export default function Map () {
  const dummyScooter = { status: 0, id: 0, pos: [0, 0], battery: 100 }
  const dummyStation = { id: 0, pos: [0, 0] }
  const dummyTrip = { id: 0, start_pos: [0, 0], end_pos: [0, 0], start_time: '', end_time: '', cutomer_id: 0, scooter_id: 0, price: 0, station: 0 }

  // Map changing
  const [selectedCity, setSelectedCity] = useState('Stockholm')
  const [selectedScooter, setSelectedScooter] = useState(dummyScooter)
  const [selectedStation, setSelectedStation] = useState(dummyStation)
  const [selectedTrip, setSelectedTrip] = useState(dummyTrip)
  const [mapCenter, setMapCenter] = useState([59.33, 18.055])
  const [selectedMode, setSelectedMode] = useState('scooter')
  const [selectedCategory, setSelectedCategory] = useState(-1)

  // Map data
  const [parkingZones, setParkingZones] = useState([])
  const [chargingStations, setChargingStations] = useState([])
  const [scootersInfo, setScootersInfo] = useState([])
  const [tripData, setTripData] = useState([])

  // Load scooter info on load
  useEffect(() => {
    updateScooters()
    updateZones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Loads parking zones and charging stations from backend
  async function updateZones (city = selectedCity) {
    const response1 = await mapModel.getAllParkingZones()
    setParkingZones(response1.parkingZones.filter(zone => zone.city === city))
    const response2 = await mapModel.getAllChargingStations()
    setChargingStations(response2.chargingStations.filter(zone => zone.city === city))
  }

  // Loads scooter info from backend
  async function updateScooters (city = selectedCity) {
    const response = await scooterModel.getAllScooters()
    setScootersInfo(response.scooters.filter(scooter => scooter.city === city))
  }

  // Loads trip info from backend
  async function updateTrips (city = selectedCity) {
    const response = await scooterModel.getAllTrips()
    setTripData(response.trips.filter(trip => trip.city === city))
  }

  // Interval to update scooter markers every x seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateScooters()
      updateTrips()
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity])

  // Get trip for selected scooter if there is one
  useEffect(() => {
    const matchingTrips = tripData.filter((trip) => trip.scooter_id === selectedScooter.id)
    const trip = matchingTrips[0]
    if (trip !== undefined) {
      setSelectedTrip(trip)
    } else {
      setSelectedTrip(dummyTrip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScooter])

  // Function to change current city
  function handleCityChange (e) {
    const cityCenterCoords = {
      Stockholm: [59.33, 18.055],
      Malmö: [55.5894, 13.0177],
      Lund: [55.7066, 13.1940]
    }
    setSelectedCity(e.target.value)
    setMapCenter(cityCenterCoords[e.target.value])
    updateScooters(e.target.value)
    updateZones(e.target.value)
    setSelectedScooter(dummyScooter)
    setSelectedStation(dummyStation)
  }

  // Function to change current mode
  function handleModeChange (e) {
    setSelectedMode(e.target.value)
    setSelectedScooter(dummyScooter)
    setSelectedStation(dummyStation)
  }

  return (
    <div>
      <div className='map-page-div'>
        <div className='map-content-div'>
          {selectedMode === 'station' && selectedStation.id !== 0
            ? <SelectedStationDisplay scootersInfo={scootersInfo} selectedStation={selectedStation} />
            : selectedMode === 'scooter' && selectedScooter.id !== 0
              ? <SelectedScooterDisplay
                  setSelectedStation={setSelectedStation} setSelectedScooter={setSelectedScooter}
                  chargingStations={chargingStations} selectedScooter={selectedScooter} selectedTrip={selectedTrip}
                  setSelectedMode={setSelectedMode} scootersInfo={scootersInfo} setSelectedTrip={setSelectedTrip}
                />
              : null}
          <div className='city-select-div'>
            <button value='Stockholm' className={`select-button ${selectedCity === 'Stockholm' ? 'selected-button' : ''}`} onClick={handleCityChange}>Stockholm</button>
            <button value='Malmö' className={`select-button ${selectedCity === 'Malmö' ? 'selected-button' : ''}`} onClick={handleCityChange}>Malmö</button>
            <button value='Lund' className={`select-button ${selectedCity === 'Lund' ? 'selected-button' : ''}`} onClick={handleCityChange}>Lund</button>
          </div>
          <div className='mode-select-div'>
            <button value='scooter' className={`mode-select-button scooter-mode-button ${selectedMode === 'scooter' ? 'selected-button' : ''}`} onClick={handleModeChange} />
            <button value='station' className={`mode-select-button station-mode-button ${selectedMode === 'station' ? 'selected-button' : ''}`} onClick={handleModeChange} />
          </div>
          <div className='map-display-div'>
            <AdminMap
              mapCenter={mapCenter} selectedCity={selectedCity} selectedScooter={selectedScooter} scootersInfo={scootersInfo} parkingZones={parkingZones}
              chargingStations={chargingStations} selectedCategory={selectedCategory} selectedStation={selectedStation} setSelectedScooter={setSelectedScooter}
              setSelectedMode={setSelectedMode} setSelectedStation={setSelectedStation}
            />
          </div>
          <div className='right-panel'>
            {selectedMode === 'station'
              ? null
              : <CategogrySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
            <div className='map-list-div' id='unit-list-div'>
              {selectedMode === 'station'
                ? <ChargingStationList
                    stationData={chargingStations} setSelectedStation={setSelectedStation}
                    selectedStation={selectedStation} scooterData={scootersInfo}
                  />
                : <ScooterList
                    setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} scooterData={scootersInfo}
                    setSelectedScooter={setSelectedScooter} selectedScooter={selectedScooter}
                  />}
            </div>
          </div>
          <div className='status-symbol-div'><StatusSymbols /></div>
        </div>
      </div>
    </div>
  )
}
