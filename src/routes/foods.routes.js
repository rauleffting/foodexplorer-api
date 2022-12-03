const { Router } = require("express");

const FoodsController = require("../controllers/FoodsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const foodsRoutes = Router();

const foodsController = new FoodsController();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.post("/", foodsController.create);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.delete("/:id", foodsController.delete);
foodsRoutes.get("/", foodsController.index);

module.exports = foodsRoutes;