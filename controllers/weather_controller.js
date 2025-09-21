const axios = require("axios");
const { makeResponseObj } = require("../helpers/response.js");
const { redisGet, redisSet } = require("../cache/redis.js");
const thirdPartyAPI = "https://goweather.xyz";

async function getWeatherData(req, res) {
  const city = req.params.city;

  if (!city) {
    const resObj = makeResponseObj(
      false,
      "No city was provided while it is a necessary parameter"
    );

    return res.status(422).json(resObj);
  }

  const cacheResult = await redisGet(city);

  if (cacheResult) {
    const cacheObj = JSON.parse(cacheResult);
    const resObj = makeResponseObj(true, "Request was successful", cacheObj);

    res.set("Retrieval-Method", "cache");

    return res.status(200).json(resObj);
  }

  const url = `${thirdPartyAPI}/weather/${city}`;
  const data = await requestThirdPartyAPI(url);

  if (data.message === "NOT_FOUND") {
    const resObj = makeResponseObj(false, "City was not found");

    return res.status(404).json(resObj);
  }

  if (data.message === "FAILED") {
    const resObj = makeResponseObj(
      false,
      `An error occurred while fetching data from the third-party API:
${data.description}`
    );

    return res.status(500).json(resObj);
  }

  await redisSet(city, JSON.stringify(data), 3600);

  const resObj = makeResponseObj(true, "Request was successful", data);

  res.set("Retrieval-Method", "request");

  return res.status(200).json(resObj);
}

async function requestThirdPartyAPI(url) {
  try {
    if (!url) {
      throw new Error("No URL was provided");
    }

    const options = {
      validateStatus: (status) => status < 500,
    };
    const response = await axios.get(url, options);

    return response.data;
  } catch (err) {
    return { message: "FAILED", description: err };
  }
}

module.exports = {
  getWeatherData,
};
