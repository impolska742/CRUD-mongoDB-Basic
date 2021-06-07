const express = require("express");
const services = require("../services/render");
const route = express.Router();
const controller = require("../controller/controller");

/**
 * @description Root Route
 * @method GET/
 */

route.get("/", services.homeRoutes);

/**
 * @description Add Users
 * @method POST/add-user
 */

route.get("/add-user", services.addUser);

/**
 * @description Update User
 * @method PUT/update-user
 */

route.get("/update-user", services.updateUser);

// API
route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;
