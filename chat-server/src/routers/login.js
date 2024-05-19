const express = require('express')
const router = new express.Router()
const register = require("../models/registration")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")

router.post("/api/login", [
    body('email').isEmail().normalizeEmail().withMessage("Invalid email!"),
    body("password").isLength({ min: 4 }).trim().escape().withMessage("Invalid password!")
], async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({ message: result.array()[0].msg })
    }
    try {
        const user = await register.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "Wrong password!" });
        }

        user.token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET_KEY)

        await user.save();

        res.cookie("auth", user.token, {
            expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000)
        })

        return res.status(200).json({ message: "Login successful!", name: user.name });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Server error! try later." });
    }
})

module.exports = router