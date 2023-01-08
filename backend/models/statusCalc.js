// Model for calculating status for scooters based on their location and different zones.

const mapModel = require('./map')

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
  findClosestChargingStation: async function findClosestChargingStation(scooterCoords) {
    // Hitta närmaste laddstation när en cykel ska flyttas dit av admin.

    let point = new L.LatLng(scooterCoords);

    let closestChargingStation;
    let closestDistance = Infinity;

    let chargingStations = mapModel.getChargingStations();
    
    for (let chargingStation of chargingStations) {
      let distance = point.distanceTo(chargingStation);
      if (distance < closestDistance) {
        closestChargingStation = chargingStation;
        closestDistance = distance;
      }
  }
  
  return closestChargingStation;
  }
}

module.exports = statusCalc
