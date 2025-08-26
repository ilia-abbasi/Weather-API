const express = require("express");
const dotenv = require("dotenv");
const { redisConnect, redisSet, redisGet } = require("./models/cache.js");
const weatherRouter = require("./routes/weather_route.js");
const app = express();

dotenv.config();
const port = process.env.PORT || 5000;
redisConnect();

app.use("/weather", weatherRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
