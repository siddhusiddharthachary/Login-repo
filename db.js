// db.js

const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myloginapp_db2'
});

pool.query = util.promisify(pool.query);

async function createUser(email, password) {
    try {
        const result = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
        console.log('User created successfully:', result.insertId);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByEmail
};
