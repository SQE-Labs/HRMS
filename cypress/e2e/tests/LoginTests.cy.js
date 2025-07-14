import { it } from "mocha";

describe("Login Tests", () => {
  it("Login_1 : Verify that user is able to login with valid credentials", () => {
    cy.login("superUser");
  });

  it("Methods to create and retreive mails from yopmail", () => {
    cy.task("emailFetcher").then((emailId) => {
      cy.log("Email ID:", emailId);
    });

    cy.task("contentGetter", "bois@yopmail.com").then((email) => {
      cy.log("Email :", email.content);
    });

    cy.task("getConfirmaUrl", "bois@yopmail.com").then((url) => {
      cy.log("url :", url);
      cy.visit(String(url), { failOnStatusCode: false });
    });
  });
});
