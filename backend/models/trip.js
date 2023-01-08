// Model for writing and reading trip info from database.

const dbModel = require('./database')
const calcModel = require('./statusCalc')
const scooterModel = require('./scooter')

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

  // Adds a new trip.
  addTrip: async function addTrip (args) {

    const sql = "CALL add_trip(?,?,?,?)"

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [args.scooter_id, args.customer_id, args.start_pos,args.start_pos])
    db.end()

    return res
  },

  // Ends an existing trip.
  endTrip: async function endTrip (args) {

    //Här ska det finnas kod för att räkna ut penalty fee och discount baserat på scooterns
    //start- och slutposition. Använder modellen statusCalc.js. Nedan är ej fungerande kod.

    let discount = 0
    let penalty = 0
    let newScooterCode
  
    let start_pos = "0,0"
    let end_pos = "0,0"
    let cityCode = 1

    let startPosCode = calcModel.zoneCalculation(cityCode,start_pos)
    let endPosCode = calcModel.zoneCalculation(cityCode,end_pos)
    
    //Beräkna eventuell discount och ny status for scooter
    if(endPosCode == 0){
      penalty = 100
      newScooterCode = 2
    }
    else if (startPosCode == 0 && endPosCode > 0){
      discount = 100
      newScooterCode = 3
    }

    //Här ska det också göras en update med status till scootern beroende var den parkeras
    // Kanske kan finnas i procecdure?
    // scooterModel.updateScooter({status:newScooterCode})

    // Lägg till discount och penalty i procedure-anropeet
    const db = await dbModel.getDb()
    let res
    const sql = "CALL update_trip(?,?,?,?)"
    res = await db.query(sql, [args.id, args.end_time, args.end_pos, args.price])
    db.end()

    return res
  }
}

module.exports = trip
