const express = require('express')
const app = express.Router();
const User = require("../models/users/User")
const log = console.log;
const jwt = require("jsonwebtoken")
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) {
            return res.status(401).send({ message: "Fill in all fields", status: false })
        }
        const existedUser = await User.findOne({ email: email })
        if (existedUser) {
            return res.status(401).json({ message: "Email already exists", status: false })
        }
        const newUser = User({
            name: name,
            email: email,
            password: password,

        })
        await newUser.save();
        return res.status(201).json({ message: "Registerd", status: true })

    } catch (error) {
        log(error.message ? error.message : error)
        return res.status(500).json({ message: error.message ? error.message : "Internal Server Error", status: false })
    }
})

















module.exports = app;