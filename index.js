const express = require("express");
const dotenv = require("dotenv");
const { rateLimit } = require("express-rate-limit");
const { redisConnect } = require("./models/cache.js");
const { makeResponseObj } = require("./models/api_response.js");
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
app.use("/weather", weatherRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
