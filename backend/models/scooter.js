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

    let battery = 100
    if(args.hasOwnProperty(battery)){
      battery = args.battery
    }
    res = await db.query(sql,[args.status,args.pos,battery])
    db.end();
    return res[0]
  },
  // Updates an existing scooter based on arguments, using given ID.
  updateScooter: async function updateCustomer(args){
    const db = await dbModel.getDb()


    // !!!! Ta bort den här delen? Kanske en onödig kontroll, det kommer ju ändå ett felmeddelande från SQL om ID:t inte finns.
    let currentDbResult = await db.query("CALL get_one_scooter(?)",[args.id]);

    if(currentDbResult[0].length === 0){
      return "No scooter with matching ID."
    }

    let currentScooterData = currentDbResult[0][0];

    //Change info according to which arguments are given
    let status = args.hasOwnProperty("status") ? args.status : currentScooterData.status
    let pos = args.hasOwnProperty("pos") ? args.pos : currentScooterData.pos
    let battery = args.hasOwnProperty("battery") ? args.battery : currentScooterData.battery

    const sql = "CALL update_scooter(?,?,?,?)"
    console.log(args)
    let res = await db.query(sql, [args.id, status, pos, battery])
    console.log(res) 
    db.end()  

    return "Updates made to scooter."
  },
  // Recieves report from scooter brain with currentposition and battery
  reportScooter: async function reportScooter(args){
      const db = await dbModel.getDb()
  
      const sql = "CALL report_scooter(?,?,?)"
      
      let res = await db.query(sql, [args.id, args.pos, args.battery])
      
      db.end()  
  
      return res[0][0].status;
    }
}

module.exports = scooter
