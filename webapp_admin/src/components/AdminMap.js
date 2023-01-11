import { Marker, TileLayer, MapContainer, Polygon, useMap, Tooltip } from 'react-leaflet'
import { useState, useEffect } from 'react'
import createScooterIcon from '../assets/scooterIcons'
import chargingStationIcons from '../assets/chargingStationIcons'

export default function AdminMap ({
  mapCenter, setSelectedStation, selectedStation, selectedCity, selectedScooter, scootersInfo, parkingZones, chargingStations,
  selectedCategory, setSelectedScooter, setSelectedMode
}) {
  const [zoneNumbers, setZoneNumbers] = useState()

  useEffect(() => {
    const zoneIdsInScooters = scootersInfo.map(scooter => scooter.zone)
    const counts = {}

    for (const num of zoneIdsInScooters) {
      if (num === 0) {
        continue
      }
      counts[num] = counts[num] ? counts[num] + 1 : 1
    }
    setZoneNumbers(counts)
    console.log(zoneNumbers)
  }, [scootersInfo])

  return (
    <MapContainer center={mapCenter} zoom={14}>
      <MapCenterChanger mapCenter={mapCenter} selectedCity={selectedCity} />
      <SelectPan selectedStation={selectedStation} selectedScooter={selectedScooter} />
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {scootersInfo.filter(scooter => scooter.status !== 4 && scooter.status !== 6 && (scooter.status === selectedCategory || selectedCategory === -1)).map((scooter) => (
        <Marker
          key={scooter.id}
          position={scooter.pos}
          icon={createScooterIcon(scooter.status, (scooter.id === selectedScooter.id))}
          eventHandlers={{
            click: (e) => {
              setSelectedScooter(scooter)
              setSelectedMode('scooter')
            }
          }}
        />
      ))}

      {parkingZones.map((zone) => (
        <Polygon key={zone.id} positions={JSON.parse(zone.pos)} pathOptions={{ color: 'green', fillColor: 'rgba(128, 177, 121, 1)' }}>
          {zoneNumbers[zone.id]
            ? <Tooltip direction='bottom' offset={[0, 20]} opacity={1}>
              {zoneNumbers[zone.id]}
            </Tooltip>
            : null}
        </Polygon>
      ))}

      {chargingStations.map((zone) => (
        <Marker
          key={zone.id}
          position={zone.pos}
          icon={zone.id === selectedStation.id ? chargingStationIcons.selected : chargingStationIcons.standard}
          eventHandlers={{
            click: (e) => {
              setSelectedStation(zone)
              setSelectedMode('station')
            }
          }}
        />
      ))}

    </MapContainer>
  )
}

function MapCenterChanger ({ mapCenter, selectedCity }) {
  const [panSelectedCity, setPanSelectedCity] = useState('Stockholm')
  const map = useMap()
  if (selectedCity !== panSelectedCity) {
    map.panTo(mapCenter)
    setPanSelectedCity(selectedCity)
  }
  return null
}

function SelectPan ({ selectedScooter, selectedStation }) {
  const [panSelectedScooterId, setPanSelectedScooterId] = useState(0)
  const [panSelectedStationId, setPanSelectedStationId] = useState(0)
  const map = useMap()
  if (selectedScooter.id !== panSelectedScooterId && selectedScooter.id !== 0) {
    map.panTo(selectedScooter.pos)
    setPanSelectedScooterId(selectedScooter.id)
  }
  if (selectedStation.id !== panSelectedStationId && selectedStation.id !== 0) {
    map.panTo(selectedStation.pos)
    setPanSelectedStationId(selectedStation.id)
  }
  return null
}
