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
import LoginPage from "../e2e/pages/LoginPage.js"
import 'cypress-file-upload';

Cypress.Commands.add('login', (username = 'superUser') => {
    cy.fixture('users.json').then((users) => {
        const user = users[username];
        LoginPage.loginWithUI(user.email, user.password);
    })
});

Cypress.Commands.add('logout', () => {
    Dashboard.clickLogout();
});



// custom command to press Enter key 
Cypress.Commands.add('pressEnter', { prevSubject: 'element' }, (subject) => {
    // Trigger the 'enter' key press event
    cy.wrap(subject).trigger('keydown', { keyCode: 13, which: 13 });
});

// cutome command to validate all success or error messages [Array of messages] or single message
Cypress.Commands.add('validateSuccessMessages', (messages) => {
    // Check if it's an array, otherwise treat it as a single message
    if (Array.isArray(messages)) {
        messages.forEach((message) => {
            cy.contains(message).should('be.visible');
        });
    } else {
        // Handle single message case
        cy.contains(messages).should('be.visible');
    }
    cy.log("All messages are successfully validated");
});


  


