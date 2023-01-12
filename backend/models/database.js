// Model for setting up connection to MariaDB database.

let dbConfig;
if(process.env.NODE_ENV === "test"){
  dbConfig = require('../config/dbTest.config')
} else {
  dbConfig = require('../config/db.config')
}
const mysql = require('promise-mysql')

const database = {

  // Returns an open connection to database.
  getDb: async function getDb () {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      multipleStatements:true
    })
    return connection
  }
}

module.exports = database
