const { makeResponseObj } = require("../models/api_response.js");

function getWeatherData(req, res) {
  const city = req.params.city;

  if (!city) {
    return res
      .status(422)
      .send(
        makeResponseObj(
          false,
          "No city was provided while it is a necessary parameter"
        )
      );
  }
}

module.exports = {
  getWeatherData,
};
