const { validationResult } = require("express-validator");
const { selectAllUsers, insertUser } = require("../config/queries");
const { validateUserLogin, validateUserRegister } = require("../utils/validation");
const { hashPassword, comparePasswords } = require("../utils/hash");

exports.registerUserController = [
    validateUserRegister,
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).render("auth/register", {
                errors: errors.array(),
                user: req.user
            })
        }
        let {firstname, lastname, email, password} = req.body;
        password = await hashPassword(password);
        await insertUser(firstname, lastname, email, password);
        res.redirect("login");
    }
]

exports.loginUserController = [
    validateUserLogin,
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).render("auth/login", {
                errors: errors.array()
            })
        }
        let {email, password} = req.body;
        console.log(email, password);
        res.redirect("/auth/login");
    }
]
