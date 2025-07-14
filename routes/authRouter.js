const { Router } = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");
const { ensureGuest } = require("../middleware/auth");

const authRouter = Router();

authRouter.get("/register", ensureGuest, (req, res) => {
    res.render("auth/register", {
        errors: [],
        user: req.user, // Pass the user's first name if logged in
    })
})
authRouter.post("/register", authController.registerUserController);

authRouter.get("/login", ensureGuest ,(req, res) => {
    res.render("auth/login", {
        errors: [],
        user: req.user, // Pass the user's first name if logged in
    });
})

authRouter.post("/login", passport.authenticate('local', { failureRedirect: "/auth/login", successRedirect: "/"}));


authRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
});



module.exports = authRouter;