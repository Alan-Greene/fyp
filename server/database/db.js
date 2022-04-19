
/*
const Database = require('better-sqlite3');
const dbConn = new Database('./database/patientdb.db', { verbose: console.log });

// export the database connection object
module.exports = {
    dbConn
};

class patientDatabase {
    constructor(path) {
        this.conn = new Database(path, { verbose: console.log });
    }
}
*/
const mysql = require ("mysql");

const dbConn = mysql.createConnection({
    host: "tuh-database.cla1p3zacxfo.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "TheKingAnd1",
    database: "TUH_Database",
});

dbConn.connect((err) =>{
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("Database connected");
});

module.exports = {
    dbConn
};