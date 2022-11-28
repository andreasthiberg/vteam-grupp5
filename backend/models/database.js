// Model for setting up connection to MariaDB database.

const dbConfig = require('../config/db.config');
const mysql = require("mysql");

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

        //Open connection
        connection.connect(error => {
            if (error) throw error;
            console.log("Successfully connected to the database.");
        });
        
        return connection;
    }
};

module.exports = database;
