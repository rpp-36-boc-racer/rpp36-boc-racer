module.exports = {
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  transformIgnorePatterns: ["node_modules/(?!(react-s3|axios/))"],
};
