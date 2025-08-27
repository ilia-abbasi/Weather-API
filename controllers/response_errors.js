const { makeResponseObj } = require("../models/api_response");

function send404Error(req, res) {
  const resObj = makeResponseObj(false, "Not found");
  return res.status(404).send(resObj);
}

function send405Error(allowedMethods) {
  return (req, res) => {
    const resObj = makeResponseObj(
      false,
      `You can not ${req.method} ${req.baseUrl + req.path}`
    );
    let allowHeaderValue = "";

    for (const allowedMethod of allowedMethods) {
      allowHeaderValue = `${allowHeaderValue}${allowedMethod}, `;
    }
    allowHeaderValue = allowHeaderValue.slice(0, -2);

    res.set("Allow", allowHeaderValue);
    return res.status(405).send(resObj);
  };
}

module.exports = {
  send404Error,
  send405Error,
};
