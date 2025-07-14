// getting environment varibles form .evn
require("dotenv").config();

require("./config/passport")

// Importing necessary packages
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const { pool } = require("./config/pool");
const flash = require("connect-flash");

// Importing routes
const publicRouter = require("./routes/publicRouter");
const authRouter = require("./routes/authRouter");
const dashboardRouter = require("./routes/dashboardRouter");

// Required Environment Variables
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

// initializing Express app
const app = express();

// configuring ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares -------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));
const sessionStore = new pgSession({
  pool: pool,
  tableName: "user_sessions",
  createTableIfMissing: true,
});

sessionStore.on("error", (error) => {
  console.error("Session store error:", error);
});

app.use(
  session({
    store: sessionStore,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false, // set to true in production (HTTPS)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ---------------------------------------------------------------------------

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


