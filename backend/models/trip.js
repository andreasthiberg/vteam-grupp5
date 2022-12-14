// Model for writing and reading trip info from database

const dbModel = require('./database.js')

const trip = {

  // Gets all trips from database.
  getAll: async function getAll () {

    const sql = "CALL get_all_trips()"
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)

    return res[0]
  },
  addTrip: async function addTrip (scooter_id, customer_id, start_pos) {
    const sql = "CALL add_trip(?,?,?)"

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [scooter_id, customer_id, start_pos])
    return res
  },
  updateTrip: async function updateTrip (id, end_time, end_pos, price) {
    const sql = "CALL update_trip(?,?,?,?)"

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [id, end_time, end_pos, price])
    return res
  }
}

module.exports = trip
