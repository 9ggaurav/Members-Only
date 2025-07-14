const { Router } = require("express");

const publicRouter = Router();

publicRouter.get("/", (req, res) => {
    // console.log(req.user.email);
    res.render("layouts/home", {
        user: req.user,
    });
} )

publicRouter.get("/about", (req, res) => {
    res.render("layouts/about", {
        user: req.user,
    });
})


module.exports = publicRouter;