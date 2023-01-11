// Model for calculating status for scooters based on their location and different zones.

const mapModel = require('./map')
const scooterModel = require('./scooter')
const geodist = require('geodist');


const statusCalc = {
  // Check if coordinates are in parking/charging zone at the end of trip
  zoneCalculation: async function zoneCalculation (scooterCoords) {

    let point = JSON.parse(scooterCoords);

    let parkingZones = await mapModel.getParkingZones();
    let parkingZonesCornersArray = parkingZones.map(row => row.pos);
    let parkingArray = parkingZonesCornersArray.map(zone => JSON.parse(zone));

    let chargingStations = await mapModel.getChargingStations();
    let stationsPos = chargingStations.map(row => row.pos);

    let positionCode = 0 // 0 = Utanför zoner, 1 = Parkeringszon, 2 = Laddningszon

    // Undersök om koordinater är i zon
    // Sätt positionCode till relevant siffra.

    // check if the point is within any of the parking zones
    for (let parking of parkingArray) {
      if (this.pointInside(point, parking)) {
        console.log("Point is inside the polygon")
        positionCode = 1;
        break;
      }
    }

    // check if the point is on a charging station
    for (let station of stationsPos) {
      station = JSON.parse(station);
      station = { lat: station[0], lon: station[1] };
      let distance = geodist(point, station, { unit: 'meters' });
      if (distance < 1) {
        positionCode = 2;
      }
    }

    console.log("Position code: ", positionCode);
    return positionCode;
  },
  pointInside: function pointInside(point, parkings) {
   
    let x = point[0], y = point[1];
    let inside = false;

    for (let i = 0, j = parkings.length - 1; i < parkings.length; j = i++) {
        let xi = parkings[i][0], yi = parkings[i][1];
        let xj = parkings[j][0], yj = parkings[j][1];
        
        let intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
          inside = !inside;
        }
      }

    return inside; 
  },
  findClosestChargingStation: async function findClosestChargingStation(scooter) {

    // Hitta närmaste laddstation när en cykel ska flyttas dit av admin.

    let coordinates = JSON.parse(scooter[0][0].pos);

    let closestChargingStation;
    let closestDistance = Infinity;

    let point = { lat: coordinates[0], lon: coordinates[1] };
    let chargingStations = await mapModel.getChargingStations();

    let stationsPos = chargingStations.map(row => row.pos);

    for (let station of stationsPos) {
      station = JSON.parse(station);
      station = { lat: station[0], lon: station[1] };
      let distance = geodist(point, station, { unit: 'meters' });
      if (distance < closestDistance) {
        closestDistance = distance;
        closestChargingStation = station;
      }
    }

    let closestStation = [...Object.values(closestChargingStation)];

    return closestStation;
  }
}

module.exports = statusCalc
