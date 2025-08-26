const { makeResponseObj } = require("../models/api_response.js");

function getWeatherData(req, res) {
  const city = req.params.city;

  if (!city) {
    const resObj = makeResponseObj(
      false,
      "No city was provided while it is a necessary parameter"
    );
    return res.status(422).send(resObj);
  }

  const response = {}; // temp code

  if (response.message === "NOT_FOUND") {
    const resObj = makeResponseObj(false, "City was not found");
    return res.status(404).send(resObj);
  }

  const resObj = makeResponseObj(true, "Request was successful", response);
  return res.status(200).send(resObj);
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
