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


import Dashboard from "../e2e/pages/Dashboard.js";
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

Cypress.Commands.add('pressEnter', { prevSubject: 'element' }, (subject) => {
    // Trigger the 'enter' key press event
    cy.wrap(subject).trigger('keydown', { keyCode: 13, which: 13 });
});
  


