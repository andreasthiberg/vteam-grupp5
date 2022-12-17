// Model for calculating status for scooters based on their location and different zones.

const statusCalc = {
  // Check if coordinates are in parking/charging zone at the end of trip
  zoneCalculation: async function zoneCalculation (cityId,scooterCoords) {
    positionCode = 0 // 0 = Utanför zoner, 1 = Parkeringszon, 2 = Laddningszon
    // Undersök om koordinater är i zon
    // Sätt positionCode till relevant siffra.
    return positionCode
  },
  findClosestChargingStation: async function findClosestChargingStation(cityId,scooterCoords) {
    // Hitta närmaste laddstation när en cykel ska flyttas dit av admin.
  }
}

module.exports = statusCalc
