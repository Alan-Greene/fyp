const Database = require('better-sqlite3');
const dbConn = new Database('./database/patientdb.db', { verbose: console.log });

// export the database connection object
module.exports = {
    dbConn
};

class patientDatabase {
    constructor(path) {
        this.conn = new Database(path, { verbose: console.log });;
    }
}