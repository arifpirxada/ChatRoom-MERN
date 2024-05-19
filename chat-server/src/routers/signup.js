const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken")
const register = require("../models/registration")
const { body, validationResult }  = require("express-validator")

router.post("/api/signup", [
  // Validation
  body('name').isLength({min: 3}).withMessage("Length of name should be greater than 3.").trim().escape(),
  body('email').isEmail().withMessage("Invalid email!").normalizeEmail(),
  body("password").isLength({min: 4, max: 16}).withMessage("password should be min: 4 char and max: 16 char long.").trim().escape()
], async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.send({message: result.array()[0].msg})
  }

  try {
    // checking for existing user
    const existingUser = await register.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const existingUserWithName = await register.findOne({ name: req.body.name });
    if (existingUserWithName) {
      return res.status(400).json({ message: "Name already in use!" });
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

    res.status(201).json({ message: "Signup successful!" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Server error! try later." });
  }
});

module.exports = router;