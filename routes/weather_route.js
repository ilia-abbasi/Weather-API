const express = require("express");
const { getWeatherData } = require("../controllers/weather_controller.js");
const router = express.Router();

router.get("/:city", getWeatherData);
