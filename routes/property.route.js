const express = require("express");
const {
  getPropertyByCategory,
  addProperty,
  getFilteredProperties,
} = require("../controllers/property.controller");

const properyRouter = express.Router();
properyRouter.post("/add", addProperty);
properyRouter.get("/:category", getPropertyByCategory);
properyRouter.post("/filters", getFilteredProperties);

module.exports = properyRouter;
