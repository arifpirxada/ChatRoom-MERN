const message = require("../models/message")
const moment = require("moment")

const insertMessage = async (data) => {
    try {
        const newMessage = new message({
            sender: data.name,
            message: data.message,
            date: moment().format("DD MMM, YYYY h:mm A")
        })
        await newMessage.save()
    } catch (error) {
        console.log(error)
    }
}

module.exports = insertMessage