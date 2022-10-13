module.exports = {
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  transformIgnorePatterns: ["node_modules/(?!(react-s3)/)"],
};
