const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920, // Width of the viewport
    viewportHeight: 1080, // Height of the viewport
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
