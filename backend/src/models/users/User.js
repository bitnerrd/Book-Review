const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error("Name cannot be empty");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error("Email cannot be empty");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error("Password cannot be empty");
            }
        },
        minlength: [2, 'Password must be at least 6 characters long']
    },
}, {
    timestamps: true,
});


UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
