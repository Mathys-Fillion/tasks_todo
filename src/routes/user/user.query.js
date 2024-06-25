/* bcryptjs */
const bcryptjs = require('bcryptjs');

/* Jsonwebtoken */
const jwt = require('jsonwebtoken');

/* DB function */
const { connectToDb } = require('../../config/db.js');

/* Query function */
const { findUserByEmail } = require('../users/users.query.js');

async function addUser({ email, name, firstname, password }) {
    const connect = await connectToDb();
    const hashedPwd = await bcryptjs.hash(password, 8);
    const user = { email, name, firstname, password: hashedPwd };
    await new Promise((resolve, reject) => {
        connect.query("INSERT INTO user SET ?", user, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

async function loginUser({ email, password }) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Failed to find user");
    }
    const checkPwd = await bcryptjs.compare(password, user.password);
    if (!checkPwd) {
        throw new Error("Not the same password");
    }
    return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, {expiresIn: '1h'});
};

async function getAllUser(id) {
    const connect = await connectToDb();
    const result = new Promise((resolve, reject) => {
        connect.query("SELECT id, email, password, created_at, firstname, name FROM user", (error, array) => {
            if (!error) {
                resolve(array);
            } else {
                reject(error);
            }
        });
    })
    return result;
};

async function getUserTodos(id) {
    const connect = await connectToDb();
    const result = new Promise((resolve, reject) => {
        connect.query("SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?", [id], (error, array) => {
            if (!error) {
                resolve(array);
            } else {
                reject(error);
            }
        });
    })
    return result;
};

module.exports = {
    addUser,
    loginUser,
    getAllUser,
    getUserTodos,
};
