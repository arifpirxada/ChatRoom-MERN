const express = require('express')
const router = new express.Router()
const register = require("../models/registration")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res) => {
    try {
        const user = await register.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(400).send("Wrong password!");
        }

        user.token = jwt.sign({id: user._id.toString()}, process.env.JWT_SECRET_KEY)

        await user.save();

        res.cookie("auth", user.token, {
            expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000)
        })

        res.status(200).send("login successful")
    } catch (error) {
        console.log(error)
        res.status(400).send("Some error occured while logging in!")
    }
})

module.exports = router