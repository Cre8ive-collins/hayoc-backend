const sql = require('mysql')


const pool = sql.createPool({
    // connectionLimit: 10,
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    port:3306,
    host: process.env.HOST || 'remotemysql.com',
    user: process.env.USER_NAME || 'boZkaz52eL',
    password: process.env.PASSWORD || 'WiUrBunJnY',
    database: process.env.DB || 'boZkaz52eL', 
})

module.exports = pool