/* DB function */
const { connectToDb } = require('../../config/db.js');

async function getAllTodo() {
    const connect = await connectToDb();
    const result = new Promise((resolve, reject) => {
        connect.query("SELECT id, title, description, created_at, due_time, user_id, status FROM todo", (error, array) => {
            if (!error) {
                resolve(array);
            } else {
                reject(error);
            }
        });
    })
    return result;
};

async function getTodo(id) {
    const connect = await connectToDb();
    const result = new Promise((resolve, reject) => {
        connect.query("SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?", [id], (error, array) => {
            if (!error) {
                resolve(array[0]);
            } else {
                reject(error);
            }
        });
    })
    return result;
};

async function createTodo({ title, description, due_time, user_id, status }) {
    const connect = await connectToDb();
    const result = await new Promise((resolve, reject) => {
        connect.query("INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?,?,?,?,?)",
        [title, description, due_time, user_id, status], (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
    return getTodo(result.insertId);
};

async function updateTodo({ title, description, due_time, user_id, status }, id) {
    const connect = await connectToDb();
    await new Promise((resolve, reject) => {
        connect.query("UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?",
        [title, description, due_time, user_id, status, id], (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

async function deleteTodo(id) {
    const connect = await connectToDb();
    const result = new Promise((resolve, reject) => {
        connect.query("DELETE FROM todo WHERE id = ?", [id], (error, array) => {
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
    getAllTodo,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};
