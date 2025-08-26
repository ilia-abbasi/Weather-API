// Base route: /weather

const express = require("express");
const {
  getWeatherData,
  send422Response,
} = require("../controllers/weather_controller.js");
const router = express.Router();

router.get("/", send422Response);
router.get("/:city", getWeatherData);

module.exports = router;
