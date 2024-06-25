/* Express */
const express = require("express");
const router = express.Router();

/* Jsonwebtoken */
const verifyToken = require('../../middleware/auth.js');

/* Query function */
const { getAllTodo, getTodo, createTodo, updateTodo, deleteTodo } = require('./todos.query.js');

router.get("/", verifyToken, async (req, res) => {
    try {
        const allTodo = await getAllTodo();
        res.status(200).json(allTodo);
    } catch (error) {
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    try {
        const todo = await getTodo(req.params.id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

router.post("/", verifyToken, async (req, res) => {
    try {
        const createdTodo = await createTodo(req.body);
        res.status(200).json(createdTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    try {
        await updateTodo(req.body, req.params.id);
        const updatedTodo = await getTodo(req.params.id);
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const affectedRows = await deleteTodo(req.params.id);
        if (affectedRows > 0) {
            res.status(200).json({ "msg" : `Successfully deleted record number: ${req.params.id}` });
        } else {
            res.status(404).json({ "msg" : `Not found record number: ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

module.exports = router;
