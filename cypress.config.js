const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const easyYopmail = require("./cypress/support/yopmail.js");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

module.exports = defineConfig({
  env: {
    allure: true,
  },

  e2e: {
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,

    downloadsFolder: "cypress/downloads",
    specPattern: "cypress/e2e/tests/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "cypress/e2e/tests/PerformanceTests.cy.js",
      "cypress/e2e/tests/EvaluateEmployeeTest.cy.js",
    ],

    defaultCommandTimeout: 10000,
    retries: { runMode: 2, openMode: 0 },
    video: false,
    screenshotOnRunFailure: true,
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      reportPageTitle: "HRMS Test Execution Report",
    },

    setupNodeEvents(on, config) {
      const resultsDir = path.join(__dirname, "allure-results");
      const allureReportDir = path.join(__dirname, "allure-report");
      const cypressReportDir = path.join(__dirname, "cypress/reports");

      if (fs.existsSync(resultsDir)) fs.rmSync(resultsDir, { recursive: true, force: true });
      if (fs.existsSync(allureReportDir)) fs.rmSync(allureReportDir, { recursive: true, force: true });
      if (fs.existsSync(cypressReportDir)) fs.rmSync(cypressReportDir, { recursive: true, force: true });

      allureWriter(on, config);

      const options = {
        webpackOptions: {
          resolve: {
            fallback: {
              os: require.resolve("os-browserify/browser"),
              stream: require.resolve("stream-browserify"),
              querystring: require.resolve("querystring-es3"),
              fs: require.resolve("browserify-fs"),
              zlib: require.resolve("browserify-zlib"),
              assert: require.resolve("assert/"),
              path: require.resolve("path-browserify"),
              buffer: require.resolve("buffer/"),
              process: require.resolve("process/browser.js"),
              https: false,
            },
          },
          plugins: [
            new webpack.ProvidePlugin({
              process: "process/browser.js",
              Buffer: ["buffer", "Buffer"],
            }),
          ],
        },
      };

      on("file:preprocessor", webpackPreprocessor(options));

      on("task", {
        emailFetcher: () => easyYopmail.getNewEmailId(),
        contentGetter: (email) => easyYopmail.getLatestEmail(email),
        getConfirmaUrl: (email) => easyYopmail.getConfirmationURL(email),
        deleteAllXlsxFiles(folderPath) {
          if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath)
              .filter(f => f.endsWith(".xlsx"))
              .forEach(f => fs.unlinkSync(path.join(folderPath, f)));
          }
          return null;
        },
      });

      return config;
    },
  },
});
