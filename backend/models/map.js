// Model for communcation with database to get/write info about maps, parking zones and charging stations.

const dbModel = require('./database.js')

const map = {

  // Gets all parking zones.
  getParkingZones: async function getParkingZones () {
    const sql = "CALL get_all_parking_zones()"
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    db.end()
    return res[0]
  },
  // Gets all charging stations.
  getChargingStations: async function getChargingStations () {
    const sql = "CALL get_all_charging_stations()"
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    db.end()
    return res[0]
  },
  // Get one charging station.
  getOneStation: async function getOneStation (id) {
    const sql = "CALL get_one_charging_station(?)"
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql,[id])
    db.end()
    return res[0]
  },
  // Gets all cities.
  getCities: async function getCities () {
    const sql = "CALL get_all_cities()"
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    db.end()
    return res[0]
  },
  // Gets one city.
  getOneCity: async function getOneCity (cityName) {
    const sql = "CALL get_one_city(?)";
    let res;
    const db = await dbModel.getDb();

    res = await db.query(sql,[cityName]);
    db.end();
    return res[0];
  }
}

module.exports = map
