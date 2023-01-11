// Model for writing and reading customer info from database.

const dbModel = require('./database.js')

const customer = {

  // Gets all customers from database.
  getAll: async function getAll () {
    const sql = 'CALL get_all_customers()'
    const db = await dbModel.getDb()

    const res = await db.query(sql)
    db.end()
    return res[0]
  },

  // Adds a new user.
  addCustomer: async function addCustomer (customerInfo) {
    if (!customerInfo.balance) {
      customerInfo.balance = 1000
    }

    const sql = 'CALL add_customer(?,?,?,?,?)'
    const db = await dbModel.getDb()
    const res = await db.query(sql, [customerInfo.first_name, customerInfo.last_name,
      customerInfo.email, customerInfo.password, customerInfo.balance])
    db.end()
    return res
  },

  // Updates an existing customer.
  updateCustomer: async function updateCustomer (args) {
    const db = await dbModel.getDb()

    const currentDbResult = await db.query('CALL get_one_customer(?)', [args.id])
    if (currentDbResult[0].length === 0) {
      return 'No customer with matching ID.'
    }

    const currentCustomerData = currentDbResult[0][0]

    // Change info according to arguments
    const first_name = args.first_name ? args.first_name : currentCustomerData.first_name
    const last_name = args.last_name ? args.last_name : currentCustomerData.last_name
    const email = args.email ? args.email : currentCustomerData.email
    const balance = args.balance ? args.balance : currentCustomerData.balance

    const sql = 'CALL update_customer(?,?,?,?,?)'

    const res = await db.query(sql, [args.id, first_name, last_name, email, balance])
    db.end()

    if (res.changedRows > 0) {
      return 'Updates made.'
    }
    return 'No updates made.'
  },
  // Sets customer status to 0 or 1, disabled or active
  setCustomerStatus: async function setCustomerStatus (id, status) {
    const db = await dbModel.getDb()

    await db.query('CALL change_customer_status(?,?)', [id, status])

    return 'Update made'
  }
}

module.exports = customer
