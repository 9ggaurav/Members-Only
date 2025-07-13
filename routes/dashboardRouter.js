const { Router } = require("express");

const dashboardRouter = Router();

dashboardRouter.get("/dashboard", (req, res) => {
    res.send("dashboard");
})

dashboardRouter.get("/profile", (req, res) => {
    res.send("profile");
})

module.exports = dashboardRouter;