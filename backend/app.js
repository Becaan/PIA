const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const rasadnikRoutes = require("./routes/rasadnici");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect('mongodb+srv://Stefan:F6zqVszfWIUHh1oB@cluster0-f1o1e.mongodb.net/projekat?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to database!")
})
.catch(() => {
    console.log("Failed connecting to database!")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});


app.use("/rasadnici", rasadnikRoutes);
app.use("/user", userRoutes);

module.exports = app;