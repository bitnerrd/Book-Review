const express = require('express');
const app = express();
const Book = require("../models/book/Book");
const { auth } = require("../middlewares/auth")

// get all books and ren
app.get("/all", auth, async (req, res) => {
    try {
        const data = await Book.find();
        return res.status(200).send({ status: true, message: "Routed to Dashboard", data })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Internal Server Error" })

    }
})

app.post("/add", auth, async (req, res) => {
    try {
        const { title, author, publishYear, edition, price } = req.body;
        if (!title, !author, !publishYear, !edition, !price) {
            return res.status(404).json({ status: false, message: "Missing Fields Required." });
        }
        const newBook = new Book({
            title: title,
            author: author,
            publishYear: publishYear,
            edition: edition,
            price: price
        })
        newBook.save()
        return res.status(201).json({ status: true, message: "Book Entry Created." });
    } catch (error) {
        return res.status(501).json({ status: false, message: "Internal Server Error." });

    }

})








module.exports = app;