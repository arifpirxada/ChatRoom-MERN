const express = require("express")
const router = express.Router()
const message = require("../models/message")

router.get("/api/read-messages", async (req, res) => {
    try {
        const data = await message.find({},{_id: 0, __v: 0})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "could not read" });
    }
})

module.exports = router