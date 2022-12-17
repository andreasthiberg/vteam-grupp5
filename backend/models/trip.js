// Model for writing and reading trip info from database.

const dbModel = require('./database')
const calcModel = require('./statusCalc')

const trip = {

  // Gets all trips from database.
  getAll: async function getAll () {

    const sql = "CALL get_all_trips()"
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    db.end()

    return res[0]
  },

  // Adds a new trip (when started?).
  addTrip: async function addTrip (args) {

    const sql = "CALL add_trip(?,?,?)"

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [args.scooter_id, args.customer_id, args.start_pos])
    db.end()

    return res
  },

  // Updates an existing trip.
  updateTrip: async function updateTrip (args) {

    //Här ska det finnas kod för att räkna ut penalty fee och discount baserat på scooterns
    //start- och slutposition. Använder modellen statusCalc.js. Nedan är ej fungerande kod.

    let discount = 0
    let penalty = 0
  
    let start_pos = "0,0"
    let end_pos = "0,0"
    let cityCode = 1

    let startPosCode = calcModel.zoneCalculation(cityCode,start_pos)
    let endPosCode = calcModel.zoneCalculation(cityCode,end_pos)
    
    //Beräkna eventuell discount
    if(endPosCode == 1){
      penalty = 100
    }
    else if (startPosCode == 1 && endPosCode == 2){
      discount = 100
    }

    // Lägg till discount och penalty i procedure-anropeet
    const sql = "CALL update_trip(?,?,?,?)"

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [args.id, args.end_time, args.end_pos, args.price])
    db.end()

    return res
  }
}

module.exports = trip
