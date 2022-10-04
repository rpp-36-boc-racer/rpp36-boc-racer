const express = require('express');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('photo', routes.getPhoto);
app.post('photo', routes.postPhoto);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});