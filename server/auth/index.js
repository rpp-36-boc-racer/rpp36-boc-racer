const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw Error("All fields must be filled");
    }
    const user = await db.login({ username });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Invalid password");
    }
    user.password = undefined;
    // eslint-disable-next-line no-underscore-dangle
    const token = createToken(user._id, user.username);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if (!username || !password || !email) {
      throw Error("A fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await db.signup({ username, password: hash, email });
    // eslint-disable-next-line no-underscore-dangle
    const token = createToken(user._id, user.username);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
    return;
  }
  try {
    const token = authorization.split(" ")[1];
    // eslint-disable-next-line no-underscore-dangle
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await db.checkUserId(_id);
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
