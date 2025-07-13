const { body, validationResult } = require("express-validator");
const passport = require("passport");
const { selectUserByEmail } = require("../config/queries");

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 50 characters";

const validateUserRegister = [
    body("firstname").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 50}).withMessage(`First name ${lengthErr}`),
    body("lastname").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 50}).withMessage(`Last name ${lengthErr}`),
    body("email").trim()
        .isEmail().withMessage("Invalid email")
        .custom(async (email) => {
            const existing = await selectUserByEmail(email);
            if(existing) {
                throw new Error(`Email (${email}) is already registered`);
            }
            return true
        }),
    body("password").trim()
        .isLength({min: 6}).withMessage("Password must be at least 6 character long"),
    body("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    })
]

const validateUserLogin = [
     body("email").trim()
        .isEmail().withMessage("Invalid email"),
    body("password").trim()
        .isLength({min: 6}).withMessage("Password must be at least 6 character long")
]

module.exports = { 
    validateUserLogin, 
    validateUserRegister
}
