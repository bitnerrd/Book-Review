const express = require('express');
const app = express();
const Book = require("../models/book/Book");
const { auth } = require("../middlewares/auth")
const log = console.log();

// get all books and ren
app.get("/all", auth, async (req, res) => {
    try {
        const userId = req.user?._id;
        const data = await Book.findOne({ user: userId });
        const books = data.books;
        return res.status(200).send({ status: true, message: "Routed to Dashboard", data: books });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Internal Server Error" })

    }
})

app.post("/add", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, author, publishYear, edition, price } = req.body;
        if (!title, !author, !publishYear, !edition, !price) {
            return res.status(404).json({ status: false, message: "Missing Fields Required." });
        }
        const updatedUser = await Book.findOneAndUpdate({ user: userId },
            { $push: { books: { title, author, publishYear, edition, price } } },
            { new: true })

        if (!updatedUser) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        return res.status(201).json({ status: true, message: "Book Entry Created.", book: updatedUser.books[updatedUser.books.length - 1] });
    } catch (error) {
        return res.status(501).json({ status: false, message: "Internal Server Error." });

    }

})








module.exports = app;