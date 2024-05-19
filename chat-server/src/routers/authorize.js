const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const register = require("../models/registration")

router.get("/authorize", async (req, res) => {
    try {
        const token = req.cookies.auth
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        const exists = await register.findOne({ token: token });
        if (!exists) {
            return res.status(200).json({ message: "could not authorize this" });
        }
        res.status(200).json({name: exists.name})
    } catch (error) {
        console.log(error)
        res.status(400).send("could not authorize")
    }
})

module.exports = router