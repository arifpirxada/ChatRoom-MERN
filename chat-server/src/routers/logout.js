const express = require("express")
const router = express.Router()
const register = require("../models/registration")

router.get("/api/logout", async (req, res) => {
    try {
        const userToken = req.cookies.auth
        await register.findOneAndUpdate({token: userToken}, {$set: {token: ""}})
        res.clearCookie("auth")
        res.status(200).json({message: "logout successful!"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "An error occured while logging out!"})
    }
})

module.exports = router