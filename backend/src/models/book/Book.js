const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    publishYear: {
        type: String,
        required: false,
        trim: true,
    },
    edition: {
        type: String,
        required: false,
        trim: true,
    },
    price: {
        type: String,
        required: false,
        trim: true,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
