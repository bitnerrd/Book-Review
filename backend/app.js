require("dotenv").config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require("cors");

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "BookReviews",
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
app.use(cors());

app.use(express.json());

app.use(logger('combined'));

app.use("/user", require("./src/routes/users"))

const port = process.env.PORT || 3003;
app.listen(port, console.log(`Server is up on ${port}`));