// Model for writing and reading scooter info from database.

const dbModel = require('./database.js')

const scooter = {

  // Gets all scooters from database, or return error if request fails.
  getAll: async function getAll () {
    const sql = 'CALL get_all_scooters()'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    db.end();
    return res[0]
  },
  // Gets a single scooter from database based on input id.
  getOne: async function getOne (id) {
    const sql = 'CALL get_one_scooter(?)'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql,[id])
    db.end();
    return res[0]
  },
  // Adds a new scooter with given data to database.
  addScooter: async function addScooter (args) {
    const sql = 'CALL add_scooter(?,?,?)'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql,[args.status,args.pos,args.battery])
    db.end();
  },
  // Updates an existing scooter based on arguments, using given ID.
  updateScooter: async function updateCustomer(args){
    console.log(args);
    const db = await dbModel.getDb()

    let currentDbResult = await db.query("CALL get_one_scooter(?)",[args.id]);

    if(currentDbResult[0].length == 0){
      return "No scooter with matching ID."
    }

    let currentScooterData = currentDbResult[0][0];

    //Change info according to which arguments are given
    let status = args.status ? args.status : currentScooterData.status
    let pos = args.pos ? args.pos : currentScooterData.pos
    let battery = args.battery ? args.battery : currentScooterData.battery

    const sql = "CALL update_scooter(?,?,?,?)"
    
    let res = await db.query(sql, [args.id, status, pos, battery])
    
    db.end()

    return "Updates."
  }
}

module.exports = scooter
