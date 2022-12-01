// Model for writing and reading user info from database

const dbModel = require("./database.js");

const user = {

    //Gets all scooters from database, or return error if request fails
    getAll: async function getAll() {

        return [{name:"Marie Almeling",id:0,email:"marie@email.com",balance:700},
        {name:"Marlena Bazan",id:1,email:"marlena@email.com",balance:1500},
        {name:"Tomoko Svedlund Ishii",id:2,email:"tomoko@email.com",balance:1200},
        {name:"Andreas Thiberg",id:3,email:"andreas@email.com",balance:900}]

        let sql = "SELECT * FROM user";
        let res;
        let db = await dbModel.getDb();
    
        res = await db.query(sql);
    
        return res;

    },
};

module.exports = user