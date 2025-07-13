// getting environment varibles form .evn
require("dotenv").config();

// Importing necessary packages
const path = require("node:path");
const express = require("express");

// Importing routes
const publicRouter = require("./routes/publicRouter");
const authRouter = require("./routes/authRouter");
const dashboardRouter = require("./routes/dashboardRouter");

// Required Environment Variables
const PORT = process.env.PORT || 3000;

// initializing Express app
const app = express();

// configuring ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));

app.use("/", publicRouter);
app.use("/auth", authRouter);
app.use("/user", dashboardRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).send(err);
})

app.listen(PORT, () => {
    console.log(`Express server on port ${PORT}`);
})


