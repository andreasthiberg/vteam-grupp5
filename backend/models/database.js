// Database model

const dbConfig = require('../config/db.config');
const mysql = require("mysql");

const database = {
    getDb: async function getDb () {
        
        // Create a connection to the database
        const connection = mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database
        });

        connection.connect(error => {
            if (error) throw error;
            console.log("Successfully connected to the database.");
        });
        
        return connection;
    }
};

module.exports = database;
