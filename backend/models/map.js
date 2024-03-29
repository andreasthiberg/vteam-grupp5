// Model for communcation with database to get/write info about maps, parking zones and charging stations.

const dbModel = require('./database.js')

const map = {

  // Gets all parking zones.
  getParkingZones: async function getParkingZones () {
    const sql = 'CALL get_all_parking_zones()'
    const db = await dbModel.getDb()

    const res = await db.query(sql)
    db.end()
    return res[0]
  },
  // Gets all charging stations.
  getChargingStations: async function getChargingStations () {
    const sql = 'CALL get_all_charging_stations()'
    const db = await dbModel.getDb()

    const res = await db.query(sql)
    db.end()
    return res[0]
  },
  // Get one charging station.
  getOneStation: async function getOneStation (id) {
    const sql = 'CALL get_one_charging_station(?)'
    const db = await dbModel.getDb()

    const res = await db.query(sql, [id])
    db.end()
    return res[0]
  },
  // Gets all cities.
  getCities: async function getCities () {
    const sql = 'CALL get_all_cities()'
    const db = await dbModel.getDb()

    const res = await db.query(sql)
    db.end()
    return res[0]
  },
  // Gets one city.
  getOneCity: async function getOneCity (cityName) {
    const sql = 'CALL get_one_city(?)'
    const db = await dbModel.getDb()

    const res = await db.query(sql, [cityName])
    db.end()
    return res[0]
  }
}

module.exports = map
