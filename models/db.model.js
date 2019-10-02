const { Pool } = require('pg');

class Database {
    
    constructor() {
        this.pool = new Pool({
            database: 'pokemon_catalogue',
            host: 'localhost',
            port: 5432,
            user: 'dewaldels',
            password: '10111'
        });
    }
    
}

module.exports.db = new Database();