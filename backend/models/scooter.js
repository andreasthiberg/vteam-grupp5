// Model for writing and reading scooter info from database

const dbModel = require('./database.js')

const scooter = {

  // Gets all scooters from database, or return error if request fails
  getAll: async function getAll () {
    const sql = 'CALL get_all_scooters()'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    return res[0]
  },
  getOne: async function getOne (id) {
    const sql = 'CALL get_one_scooter(?)'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql,[id])
    return res[0]
  },
  addScooter: async function addScooter (args) {
    const sql = 'CALL add_scooter(?,?,?)'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql,[args.status,args.pos,args.battery])
    return res
  },
  updateScooter: async function updateCustomer(args){
    const db = await dbModel.getDb()

    let currentDbResult = await db.query("CALL get_one_scooter(?)",[args.id]);
    console.log(currentDbResult);
    if(currentDbResult[0].length == 0){
      return "No scooter with matching ID."
    }

    let currentScooterData = currentDbResult[0][0];

    //Change info according to arguments
    let status = args.status ? args.status : currentScooterData.status
    let pos = args.pos ? args.pos : currentScooterData.pos
    let battery = args.battery ? args.battery : currentScooterData.battery

    const sql = `
            UPDATE scooter 
            SET status = ?, pos = ?, battery = ?
            WHERE id = ?
        `
    
    let res = await db.query(sql, [status, pos, battery, args.id])
    if(res.changedRows > 0){
      return "Updates made."
    }
    return "No updates made."
  }
}

module.exports = scooter
