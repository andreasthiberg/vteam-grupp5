// Model for writing and reading scooter info from database

const dbModel = require('./database.js')

const scooter = {

  // Gets all scooters from database, or return error if request fails
  getAll: async function getAll () {
    const sql = 'SELECT * FROM scooter'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    return res
  },
  addScooter: async function addScooter () {
    const sql = `
            INSERT INTO scooter (status,pos,battery)
            VALUES ("new","0,0",100)   
        `
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    return res
  }
}

module.exports = scooter
