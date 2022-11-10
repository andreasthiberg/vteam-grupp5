// Database connection code
const mysql  = require("promise-mysql");
const dbConfig = require("../config/db.config");
let db;

/**
 * Main function.
 * @async
 * @returns void
 */
 (async function() {
    db = await mysql.createConnection(dbConfig);

    process.on("exit", () => {
        db.end();
    });
})();