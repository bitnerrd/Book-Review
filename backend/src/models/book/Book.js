const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    books: [{
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
        }
    }
    ]
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
