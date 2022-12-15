// Model for writing and reading customer info from database.

const dbModel = require('./database.js')

const customer = {

  // Gets all customers from database.
  getAll: async function getAll () {
    const sql = 'CALL get_all_customers()'
    const db = await dbModel.getDb()

    let res = await db.query(sql)
    console.log(res);
    return res[0];
  },

  // Adds a new user.
  addCustomer: async function addCustomer (args) {

    const sql = "CALL add_customer(?,?,?,?)"
    const db = await dbModel.getDb()
    let res = await db.query(sql, [args.first_name, args.last_name, args.email, args.balance])
    return res
  },

  // Updates an existing customer.
  updateCustomer: async function updateCustomer (args) {

    const db = await dbModel.getDb()

    let currentDbResult = await db.query("CALL get_one_customer(?)",[args.id]);
    console.log(currentDbResult);
    if(currentDbResult[0].length == 0){
      return "No customer with matching ID."
    }

    let currentCustomerData = currentDbResult[0][0];

    //Change info according to arguments
    let first_name = args.first_name ? args.first_name : currentCustomerData.first_name
    let last_name = args.last_name ? args.last_name : currentCustomerData.last_name
    let email = args.email ? args.email : currentCustomerData.email
    let balance = args.balance ? args.balance : currentCustomerData.balance

    const sql = "CALL update_customer(?,?,?,?,?)"
    
    let res = await db.query(sql, [args.id, first_name, last_name, email, balance])

    if(res.changedRows > 0){
      return "Updates made."
    }
    return "No updates made."
  }
}

module.exports = customer
