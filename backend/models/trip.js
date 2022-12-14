// Model for writing and reading trip info from database.

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

  // Adds a new trip (when started?).
  addTrip: async function addTrip (args) {
    const sql = "CALL add_trip(?,?,?)"

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [args.scooter_id, args.customer_id, arg.sstart_pos])
    return res
  },

  // Updates an existing trip.
  updateTrip: async function updateTrip (args) {
    const sql = "CALL update_trip(?,?,?,?)"

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [args.id, args.end_time, args.end_pos, args.price])
    return res
  }
}

module.exports = trip
