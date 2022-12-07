// Model for writing and reading trip info from database

const dbModel = require('./database.js')

const trip = {

  // Gets all trips from database.
  getAll: async function getAll () {
    // Temporary example result
    return [{
      id: 0,
      scooter_id: 0,
      customer_id: 0,
      start_time: '12/11 12:00',
      end_time: '12/11 12:30',
      start_position: '0,0',
      end_position: '10,10',
      price: '100'
    }]
    // -----------

    const sql = 'SELECT * FROM trip'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)

    return res
  },
  // Adds a new trip to trip log.
  addTrip: async function addTrip (scooterId, customerId, startTime, endTime, startPos, endPos, price) {
    const sql = `
            INSERT INTO trip (scooter_id,customer_id,start_time,end_time,start_pos,end_pos,price)
            VALUES (?,?,?,?,?,?,?)   
        `

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [scooterId, customerId, startTime, endTime, startPos, endPos, price])
    return res
  }
}

module.exports = trip
