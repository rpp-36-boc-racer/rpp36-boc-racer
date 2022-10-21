module.exports = {
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.env.js"],
  transformIgnorePatterns: ["node_modules/(?!(react-s3|axios/))"],
};
