const express = require("express");
const app = express.Router();
const User = require("../models/users/User");
const Book = require("../models/book/Book")
const log = console.log;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { auth } = require("../middlewares/auth");

app.post("/register", async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!email || !password || !name || !confirmPassword) {
            return res
                .status(401)
                .send({ message: "Fill in all fields.", status: false });
        }
        if (password.length < 3) {
            return res
                .status(401)
                .send({
                    message: "Password must be 6 characters long.",
                    status: false,
                });
        }
        if (password !== confirmPassword) {
            return res
                .status(401)
                .send({ message: "Passwords do not match.", status: false });
        }

        const existedUser = await User.findOne({ email: email });
        if (existedUser) {
            return res
                .status(401)
                .send({ message: "Email already exists", status: false });
        }
        const newUser = User({
            name: name,
            email: email,
            password: password,
        });
        const user = await newUser.save();
        const book = new Book({
            user: user._id
        })
        await book.save();

        return res
            .status(201)
            .send({ message: "Registerd! You can login.", status: true });
    } catch (error) {
        log(error.message ? error.message : error);
        return res
            .status(500)
            .send({
                message: error.message ? error.message : "Internal Server Error",
                status: false,
            });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(403)
            .send({ message: "Fill in all fields", status: false });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return res
            .status(403)
            .send({ message: "Email does not exists!", status: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login, Please enter correct password");
    }
    const token = jwt.sign({ _id: user?._id.toString() }, process.env.token_key, {
        expiresIn: "30m",
    });
    return res
        .status(200)
        .json({ message: "LogedIn!", status: true, data: { token } });
    // return res.status(200).json({ message: "LogedIn!", status: true, data: { token } });
});

app.get("/logout", (req, res)=>{
    
})

module.exports = app;
