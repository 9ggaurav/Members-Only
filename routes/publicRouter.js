const { Router } = require("express");

const publicRouter = Router();

publicRouter.get("/", (req, res) => {
    res.render("layouts/home");
} )

publicRouter.get("/about", (req, res) => {
    res.render("layouts/about");
})

module.exports = publicRouter;