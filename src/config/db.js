/* Mysql2 */
const mysql = require('mysql2');

/* Dotenv */
require('dotenv').config();

const pool = mysql.createPool({
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
});

async function connectToDb() {
    const connect = new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (!error) {
                resolve(connection);
            } else {
                reject(error);
            }
        });
    });
    return connect;
};

module.exports = {
    pool,
    connectToDb
};
