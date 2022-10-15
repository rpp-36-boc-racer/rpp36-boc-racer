/* eslint-disable no-restricted-syntax */
const onlineUsersObj = {};

exports.addUser = (userId, socketId) => {
  onlineUsersObj[userId] = socketId;
};

exports.getUser = (userId) => onlineUsersObj[userId];

exports.removeUser = (socketId) => {
  for (const key in onlineUsersObj) {
    if (onlineUsersObj[key] === socketId) {
      delete onlineUsersObj[key];
    }
  }
};
