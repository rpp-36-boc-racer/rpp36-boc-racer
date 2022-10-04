const db = require('./db');
const auth = require('./auth');

console.log('ROUTES');
exports.postPhoto = (req, res) => {
  res.sendStatus(201);
}

exports.getPhoto = (req, res) => {
  res.sendStatus(200);
}