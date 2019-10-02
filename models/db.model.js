const { Pool } = require('pg');

class Database {
    
    constructor() {
        this.pool = new Pool({
            database: '<your-db>',
            host: '<your-host>',
            port: 5432,
            user: '<your-user>',
            password: '<your-password>'
        });
    }
    
}

module.exports.db = new Database();