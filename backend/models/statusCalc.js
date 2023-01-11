// Model for calculating status for scooters based on their location and different zones.

const mapModel = require('./map')
const geodist = require('geodist')
const scooter = require('./scooter')

const statusCalc = {
  // Check if coordinates are in parking/charging zone at the end of trip
  zoneCalculation: async function zoneCalculation (scooterCoords) {
    const point = JSON.parse(scooterCoords)

    const parkingZones = await mapModel.getParkingZones()
    const parkingZonesCornersArray = parkingZones.map(row => row.pos)
    const parkingArray = parkingZonesCornersArray.map(zone => JSON.parse(zone))

    const chargingStations = await mapModel.getChargingStations()
    const stationsPos = chargingStations.map(row => row.pos)

    let positionCode = 0 // 0 = Utanför zoner, 1 = Parkeringszon, 2 = Laddningszon
    let category = ''
    let zoneId = 0

    // Undersök om koordinater är i zon
    // Sätt positionCode till relevant siffra.

    // check if the point is within any of the parking zones
    let zoneIndex = 0
    for (const parking of parkingArray) {
      if (this.pointInside(point, parking)) {
        positionCode = 1
        category = 'zone'
        break
      } else {
        zoneIndex++
      }
    }
    if (parkingZones[zoneIndex]) {
      zoneId = parkingZones[zoneIndex].id
    }

    // check if the point is on a charging station
    for (let station of stationsPos) {
      station = JSON.parse(station)
      station = { lat: station[0], lon: station[1] }
      const distance = geodist(point, station, { unit: 'meters' })
      if (distance < 1) {
        positionCode = 2
        category = 'station'
      }
    }
    return { code: positionCode, category, id: zoneId }
  },
  pointInside: function pointInside (point, parkings) {
    const x = point[0]; const y = point[1]
    let inside = false

    for (let i = 0, j = parkings.length - 1; i < parkings.length; j = i++) {
      const xi = parkings[i][0]; const yi = parkings[i][1]
      const xj = parkings[j][0]; const yj = parkings[j][1]

      const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) {
        inside = !inside
      }
    }

    return inside
  },
  findClosestChargingStation: async function findClosestChargingStation (scooter) {
    // Hitta närmaste laddstation när en cykel ska flyttas dit av admin.

    const coordinates = JSON.parse(scooter[0][0].pos)

    let closestChargingStation = 0
    let closestDistance = Infinity

    const point = { lat: coordinates[0], lon: coordinates[1] }
    const chargingStations = await mapModel.getChargingStations()

    const stationsPos = chargingStations.map(row => row.pos)

    let i = 0
    let stationIndex = 0
    for (let station of stationsPos) {
      station = JSON.parse(station)
      station = { lat: station[0], lon: station[1] }
      const distance = geodist(point, station, { unit: 'meters' })
      if (distance < closestDistance) {
        closestDistance = distance
        closestChargingStation = station
        stationIndex = i
      }
      i++
    }

    const closestStation = { pos: [...Object.values(closestChargingStation)], stationId: stationIndex + 1 }

    return closestStation
  }
}

module.exports = statusCalc
