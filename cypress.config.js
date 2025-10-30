const { defineConfig } = require("cypress");
const easyYopmail = require("./cypress/support/yopmail.js");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const os = require("os");

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  e2e: {
    reporter: "cypress-mochawesome-reporter",
    specPattern: "cypress/e2e/tests/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: ["cypress/e2e/tests/PerformanceTests.cy.js"],
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: false,
    screenshotOnRunFailure: true,
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporterOptions: {
      reportDir: "cypress/reports/.jsons",
      output: 'cypress/reports/results.json',
      charts: true,
      reportPageTitle: "HRMS Test Execution Report",
      embeddedScreenshots: true,
      inlineAssets: true,
      videoOnFailOnly: true,
      html: true,
      json: true,
      overwrite: true,
    },

    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            fallback: {
              os: require.resolve("os-browserify/browser"), // ✅ Fix for "os" module not found
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
        emailFetcher() {
          return easyYopmail.getNewEmailId();
        },
        contentGetter(someEmail) {
          return easyYopmail.getLatestEmail(someEmail);
        },
        getConfirmaUrl(email) {
          return easyYopmail.getConfirmationURL(email);
        },
        deleteFile(filePath) {
          const fullPath = path.resolve(__dirname, filePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return { success: true };
          }
          return { success: false, message: "File not found" };
        },

        getDownloadFolder() {
          return path.join(os.homedir(), "Downloads");
        },

        isFileExist(filePath) {
          return fs.existsSync(filePath);
        },
        readFileSize(filePath) {
          const stats = fs.statSync(filePath);
          return stats.size;
        },
        createFolderIfNotExist(dirPath) {
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }
          return null;
        },
        saveFile({ filePath, data }) {
          fs.writeFileSync(filePath, data, "binary");
          return null;
        },
      });

      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },

    // ✅ Added: Explicit downloads folder
    downloadsFolder: "cypress/downloads",
  },
});






// const { defineConfig } = require("cypress");
// const fs = require("fs");
// const path = require("path");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       const mochawesome = require("mochawesome-report-generator");
//       const marge = require("mochawesome-merge");

//       // Generate mochawesome JSON + HTML reports after run
//       on("after:run", async () => {
//         const reportDir = "cypress/reports";
//         const jsonDir = path.join(reportDir, "jsons");
//         const htmlDir = path.join(reportDir, "html");

//         // Ensure directories exist
//         if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir);
//         if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir);
//         if (!fs.existsSync(htmlDir)) fs.mkdirSync(htmlDir);

//         const jsonReport = await marge({
//           files: [path.join(jsonDir, "*.json")],
//         });

//         await mochawesome.create(jsonReport, {
//           reportDir: htmlDir,
//           reportFilename: "index",
//         });
//       });

//       return config;
//     },

//     // Base configuration
//     specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
//     chromeWebSecurity: false,
//     video: false,
//     screenshotOnRunFailure: true,
//     reporter: "mochawesome",
//     reporterOptions: {
//       reportDir: "cypress/reports/jsons",
//       overwrite: false,
//       html: true,
//       json: true,
//       charts: true,
//       embeddedScreenshots: true,
//       inlineAssets: true,
//       reportTitle: "Cypress Test Execution Report",
//     },
//   },
// });
