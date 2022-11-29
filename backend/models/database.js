// Model for setting up connection to MariaDB database.

const dbConfig = require('../config/db.config');
const mysql = require("promise-mysql");

const database = {
    
    // Returns an open connection to database
    getDb: async function getDb () {
        
        // Create a connection to the database
        const connection = mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database
        });

        return connection;
    }
};

module.exports = database;
