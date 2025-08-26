const axios = require("axios");
const { makeResponseObj } = require("../models/api_response.js");
const thirdPartyAPI = "https://goweather.xyz";

async function getWeatherData(req, res) {
  const city = req.params.city;

  if (!city) {
    const resObj = makeResponseObj(
      false,
      "No city was provided while it is a necessary parameter"
    );
    return res.status(422).send(resObj);
  }

  const url = `${thirdPartyAPI}/weather/${city}`;
  const response = await requestThirdPartyAPI(url);

  if (response.message === "NOT_FOUND") {
    const resObj = makeResponseObj(false, "City was not found");
    return res.status(404).send(resObj);
  }

  if (response.message === "FAILED") {
    const resObj = makeResponseObj(
      false,
      `An error occurred while fetching data from the third-party API:
${response.description}`
    );
    return res.status(500).send(resObj);
  }

  const resObj = makeResponseObj(true, "Request was successful", response);
  return res.status(200).send(resObj);
}

async function requestThirdPartyAPI(url) {
  try {
    if (url === undefined || url === "") {
      throw new Error("No URL was provided");
    }
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return { message: "FAILED", description: err };
  }
}

function send422Response(req, res) {
  const resObj = makeResponseObj(
    false,
    "No city was provided while it is a necessary parameter"
  );
  return res.status(422).send(resObj);
}

module.exports = {
  getWeatherData,
  send422Response,
};
