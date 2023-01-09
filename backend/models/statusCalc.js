// Model for calculating status for scooters based on their location and different zones.

const mapModel = require('./map')
const scooterModel = require('./scooter')



const statusCalc = {
  // Check if coordinates are in parking/charging zone at the end of trip
  zoneCalculation: async function zoneCalculation (scooterCoords) {

    let point = new L.LatLng(scooterCoords);

    let parkingZones = mapModel.getParkingZones();
    let chargingStations = mapModel.getChargingStations();

    positionCode = 0 // 0 = Utanför zoner, 1 = Parkeringszon, 2 = Laddningszon

    // Undersök om koordinater är i zon
    // Sätt positionCode till relevant siffra.

    // check if the point is on a charging station
    for (let chargingStation of chargingStations) {
      if (point.equals(chargingStation)) {
        positionCode = 2;
      }
    }

    // check if the point is within any of the parking zones
    for (let parkingZone of parkingZones) {
      if (pointInPolygon(point, parkingZone)) {
        positionCode = 1;
      }
    }

    return positionCode;
  },
  pointInPolygon(point, polygon) {
    // check if the point is within the bounds of the polygon
    const bounds = polygon.getBounds();
    if (!bounds.contains(scooterCoords)) {
      return false;
    }
  
    // check if the point is within the polygon using the LatLng.latLngs property of the polygon
    const latLngs = polygon.getLatLngs();
    let inside = false;
    for (let i = 0, j = latLngs.length - 1; i < latLngs.length; j = i++) {
      const xi = latLngs[i].lat, yi = latLngs[i].lng;
      const xj = latLngs[j].lat, yj = latLngs[j].lng;

      const intersect = ((yi > point.lat) !== (yj > point.lat))
        && (point.lng < (xj - xi) * (point.lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
  
    return inside;
  },
  findClosestChargingStation: async function findClosestChargingStation(scooter) {

    // Hitta närmaste laddstation när en cykel ska flyttas dit av admin.
    const geodist = require('geodist');

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
