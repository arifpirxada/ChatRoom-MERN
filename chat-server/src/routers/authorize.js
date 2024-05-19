const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const register = require("../models/registration")

router.get("/api/authorize", async (req, res) => {
    try {
        const token = req.cookies.auth
        if (!token) {
            return res.status(400).json({message: "could not authorize"})
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        const exists = await register.findOne({ token: token });
        if (!exists) {
            return res.status(200).json({ message: "could not authorize" });
        }
        res.status(200).json({message: "authorized",name: exists.name})
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "could not authorize" });
    }
})

module.exports = router