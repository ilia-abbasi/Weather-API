// Base route: /weather

const express = require("express");
const { getWeatherData } = require("../controllers/weather_controller.js");
const { send405Error, send404Error } = require("../helpers/response.js");
const router = express.Router();

router.get("{/:city}", getWeatherData);
router.all("{/:city}", send405Error(["GET"]));
router.all("/{*anything}", send404Error);

module.exports = router;
