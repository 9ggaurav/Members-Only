const { Router } = require("express");
const authController = require("../controllers/authController")

const authRouter = Router();

authRouter.get("/register", (req, res) => {
    res.render("auth/register", {
        errors: []
    })
})
authRouter.post("/register", authController.registerUserController);

authRouter.get("/login", (req, res) => {
    res.render("auth/login");
})

module.exports = authRouter;