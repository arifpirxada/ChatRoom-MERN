const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken")
const register = require("../models/registration")

router.post("/signup", async (req, res) => {
  try {
    // checking for existing user
    const existingUser = await register.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userData = new register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    
    userData.token = jwt.sign({ id: userData._id.toString() }, process.env.JWT_SECRET_KEY)
    
    await userData.save();
    
    res.cookie("auth", userData.token, {
        expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000)
    })

    res.status(201).json({ message: "signup successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;