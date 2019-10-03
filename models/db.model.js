const { Pool } = require('pg');

class Database {
    
    constructor() {
        this.pool = new Pool({
            database: '<your-database>',
            host: '<your-host-url>',
            port: 5432,
            user: '<your-username>',
            password: '<your-password>'
        });
    }
    
}

module.exports.db = new Database();