/* Express */
const express = require("express");
const router = express.Router();

/* Jsonwebtoken */
const verifyToken = require('../../middleware/auth.js');

/* Query function */
const { getAllUser, getUserTodos } = require('../user/user.query.js');

router.get("/", verifyToken, async (req, res) => {
    try {
        const allUser = await getAllUser();
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

router.get("/todos", verifyToken, async (req, res) => {
    try {
        const userTodos = await getUserTodos(req.user.id);
        res.status(200).json(userTodos);
    } catch (error) {
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

module.exports = router;
