// Model for writing and reading scooter info from database

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