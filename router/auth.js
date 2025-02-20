const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();


// Register new user
router.post("/register", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Check if user exist or not
        const existingUser  = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User Already exist!"});

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add new user
        const user = new User({name, email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: "User created successfully!"})
    } catch (error) {
        res.status(500).json({message: "Server Error!"});
    }
});



module.exports = router;
