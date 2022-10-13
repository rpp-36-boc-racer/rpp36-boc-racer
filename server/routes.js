const path = require("path");

exports.sampleRoute = (req, res) => {
  res.sendStatus(200);
};

exports.catchAll = (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
};
