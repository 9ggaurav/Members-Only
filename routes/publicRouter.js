const { Router } = require("express");
const { homeController, aboutController } = require("../controllers/dashboardController");

const publicRouter = Router();

publicRouter.get("/", homeController)

publicRouter.get("/about", aboutController)


module.exports = publicRouter;