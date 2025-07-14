const { Router } = require("express");

const { ensureLoggedIn } = require("../middleware/auth");
const { profileController } = require("../controllers/dashboardController");

const dashboardRouter = Router();


dashboardRouter.get("/", ensureLoggedIn ,(req, res) => {
    res.redirect("/");
})

dashboardRouter.get("/profile", ensureLoggedIn, profileController)

module.exports = dashboardRouter;