/* Express */
const express = require("express");
const router = express.Router();

/* Jsonwebtoken */
const verifyToken = require('../../middleware/auth.js');

/* Query function */
const { getUser } = require('../user/user.query.js');
const { findUserById, findUserByEmail, updateUser, deleteUser } = require('./users.query.js');

router.get("/:args", verifyToken, async (req, res) => {
    try {
        let findUser = await findUserById(req.params.args);
        if (!findUser) {
            findUser = await findUserByEmail(req.params.args);
        }
        if (!findUser) {
            res.status(404).json({ "msg" : "Not found" });
            return;
        }
        const user = await getUser(findUser.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    try {
        await updateUser(req.body, req.params.id);
        const updatedUser = await findUserById(req.params.id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ "msg" : "Internal server error" });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const affectedRows = await deleteUser(req.params.id);
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
