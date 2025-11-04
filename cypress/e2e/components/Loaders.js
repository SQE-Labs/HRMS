import BasePage from "../pages/BasePage.js";
// const routes = require('../config/routes');
// import { ENDPOINT_PREFIX } from "../config/constants";

class Loaders extends BasePage {
  // Locators
  get threeDotLoading() {
    return cy.get("[data-testid='three-dots-svg']");
  }
  get overlay() {
    return cy.get(".overlay");
  }

  get spinnerLoading() {
    return cy.get("svg[data-testid='tail-spin-svg']");
  }
}

export default new Loaders();
