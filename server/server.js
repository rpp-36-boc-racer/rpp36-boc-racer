const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
// const io = require("socket.io")(server);
// const routes = require("./routes");

const PORT = process.env.PORT || 3000;
app.use(morgan('tiny'));
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// io.on("connection", (socket) => {
//   // eslint-disable-next-line no-console
//   console.log(socket.id);
//   socket.on("send-message", (data) => {
//     // eslint-disable-next-line no-console
//     console.log(data);
//   });
// });

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
