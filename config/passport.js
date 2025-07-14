const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { pool } = require("./pool");
const { comparePasswords } = require("../utils/hash");
const { selectUserByEmail } = require("./queries");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
    try {
        const rows = await selectUserByEmail(email);
        const user = rows[0];

        if (!user) {
            return done(null, false, { message: "Incorrect email"});
        }

        console.log("users from db. ", user);
        const match = await comparePasswords(password, user.password);
        if (!match) {
            return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id]);
        
        const user = rows[0];
        return done(null, user);
    } catch (err) {
        done(err)
    }
})