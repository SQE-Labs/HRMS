// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

///  <reference types="cypress" />
///  <reference types="cypress-xpath"/>

import DashboardPage from "../e2e/pages/DashboardPage.js";
import LoginPage from "../e2e/pages/LoginPage.js";
import "cypress-file-upload";

Cypress.Commands.add("login", (username) => {
  cy.fixture("users.json").then((users) => {
    const user = users[username];
    LoginPage.loginWithUI(user.email, user.password);
  });
});

Cypress.Commands.add("logout", () => {
  Dashboard.clickLogout();
});

// custom command to press Enter key
Cypress.Commands.add("pressEnter", (element) =>
  cy.wrap(element).trigger("keydown", { key: "Enter" })
);

// cutome command to validate all success or error messages [Array of messages] or single message
Cypress.Commands.add("validateSuccessMessages", (messages) => {
  // Check if it's an array, otherwise treat it as a single message
  if (Array.isArray(messages)) {
    messages.forEach((message) => {
      cy.contains(message).should("be.visible");
    });
  } else {
    // Handle single message case
    cy.contains(messages).should("be.visible");
  }
  cy.log("All messages are successfully validated");
});

Cypress.Commands.add(
  "selectDrpValueByText",
  (locator, text, isSearchable = false, searchInputLocator = "") => {
    if (isSearchable) {
      // Wait for the correct modal to be visible
      cy.wait(3000);

      locator.should("be.visible").click({ force: true });

      // Wait for any modal to disappear (customize the selector if needed)
      // cy.get("#staticBackdropAsset").should("not.be.visible");

      if (searchInputLocator) {
        searchInputLocator.should("be.visible").wait(4000).type(text);

        const selectorNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const selectors = selectorNumbers
          .map(
            (num) =>
              `#react-select-${num}-listbox span,#react-select-${num}-listbox, #react-select-${num}-listbox div div`
          )
          .join(", ");

        cy.get(selectors)
          .contains(text)
          .should("be.visible")
          .click({ force: true });
      }
    } else {
      locator.select(text).should("contain", text);
    }
  }
);

// get texts from the column
Cypress.Commands.add("getColumnTexts", (selector) => {
  return cy.get(selector).then(($cells) => {
    return Cypress._.map($cells, "textContent").map((text) => text.trim());
  });
});
