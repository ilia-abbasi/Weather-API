const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { rateLimit } = require("express-rate-limit");
const { redisConnect } = require("./cache/redis.js");
const { makeResponseObj, send404Error } = require("./helpers/response.js");
const weatherRouter = require("./routes/weather_route.js");
const app = express();

dotenv.config();

const port = process.env.PORT || 5000;
const limitResponse = makeResponseObj(
  false,
  "You have reached your request limit"
);
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 60,
  message: limitResponse,
});

redisConnect();

app.use(limiter);
app.use(morgan(":method :url :status - :response-time ms"));

app.use("/weather", weatherRouter);

app.all("/{*anything}", send404Error);

app.listen(port, () => {
  console.log(`Server: Listening on port ${port}`);
});
