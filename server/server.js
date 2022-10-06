const express = require("express");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("tiny"));
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("messages", routes.getMessages);
app.post("message", routes.postMessage);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
