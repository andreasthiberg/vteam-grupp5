// Model for writing and reading customer info from database

const dbModel = require('./database.js')

const customer = {

  // Gets all customers from database.
  getAll: async function getAll () {
    // Temporary example result
    return [{ first_name: 'Marie', last_name: 'Almeling', id: 0, email: 'marie@email.com', balance: 700 },
      { first_name: 'Marlena', last_name: 'Bazan', id: 1, email: 'marlena@email.com', balance: 1500 },
      { first_name: 'Tomoko', last_name: 'Svedlund Ishii', id: 2, email: 'tomoko@email.com', balance: 1200 },
      { first_name: 'Andreas', last_name: 'Thiberg', id: 3, email: 'andreas@email.com', balance: 900 }]
    // -----------

    const sql = 'SELECT * FROM customer'
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)

    return res
  },
  // Adds a new user.
  addCustomer: async function addCustomer (firstName, lastName, email, balance) {
    const sql = `
            INSERT INTO customer (first_name,last_name,email,balance)
            VALUES (?,?,?)    
        `

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [firstName, lastName, email, balance])
    return res
  }
}

module.exports = customer
