/* bcryptjs */
const bcryptjs = require('bcryptjs');

/* Jsonwebtoken */
const jwt = require('jsonwebtoken');

/* DB function */
const { connectToDb } = require('../../config/db.js');

async function findUserById(id) {
    const connect = await connectToDb();
    const result = new Promise((resolve, reject) => {
        connect.query("SELECT * FROM user WHERE id = ?", [id], (error, array) => {
            if (!error) {
                resolve(array[0]);
            } else {
                reject(error);
            }
        });
    })
    return result;
};

async function findUserByEmail(email) {
    const connect = await connectToDb();
    const result = new Promise((resolve, reject) => {
        connect.query("SELECT * FROM user WHERE email = ?", [email], (error, array) => {
            if (!error) {
                resolve(array[0]);
            } else {
                reject(error);
            }
        });
    })
    return result;
};

async function updateUser({ email, password, firstname, name }, id) {
    const connect = await connectToDb();
    const hashedPwd = await bcryptjs.hash(password, 8);
    await new Promise((resolve, reject) => {
        connect.query("UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?",
        [email, hashedPwd, firstname, name, id], (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

async function deleteUser(id) {
    const connect = await connectToDb();
    const result = new Promise((resolve, reject) => {
        connect.query("DELETE FROM user WHERE id = ?", [id], (error, array) => {
            if (!error) {
                resolve(array.affectedRows);
            } else {
                reject(error);
            }
        });
    })
    return result;
};

module.exports = {
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser
};
