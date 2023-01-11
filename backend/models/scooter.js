// Model for writing and reading scooter info from database.

const dbModel = require('./database.js')
const statusCalc = require('./statusCalc')
const calcModel = require('./statusCalc')

const scooter = {

  // Gets all scooters from database, or return error if request fails.
  getAll: async function getAll () {
    const sql = 'CALL get_all_scooters()'
    const db = await dbModel.getDb()

    const res = await db.query(sql)
    db.end()
    return res[0]
  },
  // Gets a single scooter from database based on input id.
  getOne: async function getOne (id) {
    const sql = 'CALL get_one_scooter(?)'
    const db = await dbModel.getDb()

    const res = await db.query(sql, [id])
    db.end()
    return res[0]
  },
  // Adds a new scooter with given data to database.
  addScooter: async function addScooter (args) {
    const sql = 'CALL add_scooter(?,?,?,?)'
    const db = await dbModel.getDb()

    let battery = 100
    if (args.hasOwnProperty(battery)) {
      battery = args.battery
    }
    const res = await db.query(sql, [args.status, args.pos, battery, args.city])
    db.end()
    return res[0]
  },
  zoneCalc: async function zoneC (scooterCoords) {
    await statusCalc.zoneCalculation(scooterCoords)
  },
  // Updates an existing scooter based on arguments, using given ID.
  updateScooter: async function updateCustomer (args) {
    const db = await dbModel.getDb()

    // !!!! Ta bort den här delen? Kanske en onödig kontroll, det kommer ju ändå ett felmeddelande från SQL om ID:t inte finns.
    const currentDbResult = await db.query('CALL get_one_scooter(?)', [args.id])

    if (currentDbResult[0].length === 0) {
      return 'No scooter with matching ID.'
    }

    const currentScooterData = currentDbResult[0][0]

    // Change info according to which arguments are given
    const status = args.hasOwnProperty('status') ? args.status : currentScooterData.status
    let pos = args.hasOwnProperty('pos') ? args.pos : currentScooterData.pos
    const battery = args.hasOwnProperty('battery') ? args.battery : currentScooterData.battery

    // Move to charging station
    if (currentScooterData.status !== 4 && args.status === 4) {
      const closestStation = await calcModel.findClosestChargingStation(currentDbResult)
      pos = '[' + closestStation.pos[0] + ',' + closestStation.pos[1] + ']'
      const sql = 'CALL add_station_to_scooter(?,?)'
      await db.query(sql, [args.id, closestStation.stationId])
    }

    const sql = 'CALL update_scooter(?,?,?,?)'
    await db.query(sql, [args.id, status, pos, battery])
    db.end()

    return { id: args.id, status, pos, battery, city: currentScooterData.city }
  },

  // Recieves report from scooter brain with currentposition and battery
  reportScooter: async function reportScooter (args) {
    const db = await dbModel.getDb()

    const sql = 'CALL report_scooter(?,?,?)'

    const res = await db.query(sql, [args.id, args.pos, args.battery])

    db.end()

    return { status: res[0][0].status, station: res[0][0].station }
  },
  // Changes initial scooters parked in zones to status 3
  initialParkingCheck: async function initialParkingCheck () {
    const scooters = await this.getAll()
    const db = await dbModel.getDb()
    for (const scooter of scooters) {
      const calcResult = await calcModel.zoneCalculation(scooter.pos)
      if (calcResult.code === 1) {
        const sql = 'CALL add_zone_to_scooter(?,?)'
        console.log(calcResult)
        const res = await db.query(sql, [scooter.id, calcResult.id])
        await this.updateScooter({ id: scooter.id, status: 3 })
        console.log('Uppdaterat')
      }
    }
    db.end()
  }
}

module.exports = scooter
