class PerformancePage {
  checkCertificationNone() {
    cy.contains("Which certifications have you completed?").scrollIntoView();
    cy.get('input[type="checkbox"]').check("None", { force: true });
    cy.wait(2000);
  }

  fillOtherCertifications(text) {
    cy.contains(
      "Have you completed any certifications other than those listed above in past twelve months?"
    )
      .parent()
      .find("textarea")
      .type(text, { force: true });
    cy.wait(2000);
  }

  checkExercisesNone() {
    cy.contains("Select the exercises you have completed").scrollIntoView();
    cy.get('input[type="checkbox"]').check("None", { force: true });
    cy.wait(2000);
  }

  selectMockInterviews(count) {
    cy.contains(
      "How many Mock/Client Interviews have you given during the last 12 months?"
    )
      .parent()
      .contains(count)
      .click({ force: true });
    cy.wait(2000);
  }

  fillMockInterviewDetails(text) {
    cy.contains("If you have given the mock interviews or client interviews")
      .parent()
      .find("textarea")
      .type(text, { force: true });
    cy.wait(2000);
  }

  selectExpertLedSessions(option) {
    cy.contains("How many Expert-Led sessions")
      .parent()
      .contains(option)
      .click({ force: true });
    cy.wait(2000);
  }

  fillCoffeeNLearnDetails(text) {
    cy.contains("If you have presented on any topic in CoffeeNLearn session")
      .parent()
      .find("textarea")
      .type(text, { force: true });
    cy.wait(2000);
  }

  selectRadioByLabel(label, value) {
    cy.contains(label).parent().contains(value).click({ force: true });
    cy.wait(2000);
  }

  fillTextareaByLabel(label, text) {
    cy.contains(label).parent().find("textarea").type(text, { force: true });
    cy.wait(2000);
  }

  fillSelfRatings(labels, value) {
    labels.forEach((label) => {
      cy.contains(label).parent().contains(value).click({ force: true });
    });
    cy.wait(2000);
  }

  submitForm() {
    // Scroll up until the Submit button is visible, then click it
    cy.contains("button", "Submit")
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
    // Handle confirmation modal
    cy.contains("Are you sure you want submit the performance form?").should(
      "be.visible"
    );
    cy.contains("button", "Yes").click({ force: true });
    cy.wait(2000);
  }
  validateSuccessMessage(message) {
    cy.contains(message, { timeout: 10000 }).should("be.visible");
    cy.wait(2000);
  }
}

export default new PerformancePage();
