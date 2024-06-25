/* Express */
const express = require("express");
const router = express.Router();

/* Query function */
const { addUser, loginUser } = require("../user/user.query.js");
const { findUserByEmail } = require("../users/users.query.js");

router.post("/register", async (req, res) => {
    try {
        const { email, password, name, firstname } = req.body;
        if (!email || !password || !name || !firstname) {
            return res.status(400).json({ "msg" : "Bad parameter" });
        }
        const isAnUser = await findUserByEmail(email);
        if (isAnUser) {
            return res.status(409).json({ "msg" : "Account already exists" });
        }
        await addUser(req.body);
        const token = await loginUser(req.body);
        res.cookie("token", token);
        res.status(200).json({ "token" : token });
    } catch (error) {
        return res.status(500).json({ "msg" : "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "msg" : "Bad parameter" });
        }
        const token = await loginUser(req.body);
        res.cookie("token", token);
        res.status(200).json({ "token" : token });
    } catch (error) {
        return res.status(404).json({ "msg" : "Invalid Credentials" });
    }
});

module.exports = router;
