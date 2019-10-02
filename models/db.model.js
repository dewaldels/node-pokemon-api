const { Pool } = require('pg');

class Database {
    
    constructor() {
        this.pool = new Pool({
            database: 'd6k5824gm3684r',
            host: 'ec2-54-204-37-92.compute-1.amazonaws.com',
            port: 5432,
            user: 'bqtrrikblhhgap',
            password: '75d501bbe0426538c964adb6c683b59213f509d0781a1ecd6fe5ef251e06ff7c'
        });
    }
    
}

module.exports.db = new Database();