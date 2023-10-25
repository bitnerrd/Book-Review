const mongoose = require("mongoose");
const validator = require("validator");
const { Schema, Types } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const schema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    linkedinId: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate(value) {
        if (value) {
          if (!validator.isMobilePhone(value)) {
            throw new Error("Please enter a valid phone number");
          }
        }
      }
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        let re = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
        if (validator.isEmpty(value)) {
          throw new Error("First name cannot be empty");
        } else if (!re.test(value)) {
          throw new Error("First name contains certain characters that aren't allowed");
        }
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        let re = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
        if (validator.isEmpty(value)) {
          throw new Error("Last name cannot be empty");
        } else if (!re.test(value)) {
          throw new Error("Last name contains certain characters that aren't allowed");
        }
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Enter valid email address");
        } else if (validator.isEmpty(value)) {
          throw new Error("Email cannot be empty");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("User Password cannot be empty");
        }
      },
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    lastLogin: {
      type: Date,
      // default: null
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    is_hr: {
      type: Boolean,
      default: false,
    },
    is_candidate: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true });

schema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

schema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user?._id.toString() }, process.env.token_key);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

schema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login, Please signup first!");
  }
  if (user.isVerified == false) {
    throw new Error("Unable to login, Please verify your email account!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login, Please enter correct password");
  }

  return user;
};

schema.pre(
  "save",
  async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", schema);

module.exports = User;