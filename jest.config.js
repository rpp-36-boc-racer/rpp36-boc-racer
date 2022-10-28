module.exports = {
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.env.js"],
  transformIgnorePatterns: ["node_modules/(?!(react-s3|axios/))"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
};
