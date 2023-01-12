// Model for logging access to the public API.

const dbModel = require('./database')

const publicAPI = {

  // Adds a log entry.
  addLogEntry: async function addLogEntry (ip) {
    const sql = 'CALL add_api_log_entry(?)'
    const db = await dbModel.getDb()
    await db.query(sql,[ip])
    db.end()
  },
  // Adds a log entry.
  getAllEntries: async function getAllEntries () {
    const sql = 'SELECT * FROM api_log'
    const db = await dbModel.getDb()
    const res = await db.query(sql)
    db.end()
    for(let i in res ){
        let time = res[i]["time"]
        const date = new Date(time)
        const dateString = date.toString().substring(0, 21)
        res[i]["time"] = dateString
    }
    return res;
  }
}

module.exports = publicAPI
