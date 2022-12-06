// Model for communcation with database to get/write info about maps, parking zones and charging stations

const dbModel = require('./database.js')

const map = {

  // Gets all parking zones
  getParkingZones: async function getParkingZones () {
    // Temporary example result
    return [{ id: 0, pos: '10,10' }]
    // -----------

    const sql = 'SELECT * FROM trip'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)

    return res
  },
  // Gets all charging stations
  getChargingStations: async function getChargingStations () {
    // Temporary example result
    return [{ id: 0, pos: '20,20' }]
    // -----------

    const sql = 'SELECT * FROM trip'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)

    return res
  }
}

module.exports = map
