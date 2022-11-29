// Scooter model for communicating with scooters and getting scooter info from database (?)
//
// Här kan man antingen bara ha koden för att hämta/skriva info om cyklar till databasen,
// eller också koden för att till exempel skicka kommandon till en cykel från admin. Den skulle
// annars kunna ligga i en annan modul (typ scooterCommands.js)

const dbModel = require("./database.js");

const scooter = {

    //Gets all scooters from database, or return error if request fails
    getAll: async function getAll() {

        let sql = "SELECT * FROM Scooter";
        let res;
        let db = await dbModel.getDb();
    
        res = await db.query(sql);
    
        return res;

    },
};

module.exports = scooter