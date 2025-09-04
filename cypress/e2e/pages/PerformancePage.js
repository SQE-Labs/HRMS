class PerformancePage {
  checkCertificationNone() {
    cy.contains("Which certifications have you completed?").scrollIntoView();
    cy.get('input[type="checkbox"]').check("None", { force: true });
  }

  fillOtherCertifications(text) {
    cy.contains(
      "Have you completed any certifications other than those listed above in past twelve months?"
    )
      .parent()
      .find("textarea")
      .type(text);
  }

  checkExercisesNone() {
    cy.contains("Select the exercises you have completed").scrollIntoView();
    cy.get('input[type="checkbox"]').check("None", { force: true });
  }

  selectMockInterviews(count) {
    cy.contains(
      "How many Mock/Client Interviews have you given during the last 12 months?"
    )
      .parent()
      .contains(count)
      .click();
  }

  fillMockInterviewDetails(text) {
    cy.contains("If you have given the mock interviews or client interviews")
      .parent()
      .find("textarea")
      .type(text);
  }

  selectExpertLedSessions(option) {
    cy.contains("How many Expert-Led sessions")
      .parent()
      .contains(option)
      .click();
  }

  fillCoffeeNLearnDetails(text) {
    cy.contains("If you have presented on any topic in CoffeeNLearn session")
      .parent()
      .find("textarea")
      .type(text);
  }

  selectRadioByLabel(label, value) {
    cy.contains(label).parent().contains(value).click();
  }

  fillTextareaByLabel(label, text) {
    cy.contains(label).parent().find("textarea").type(text);
  }

  fillSelfRatings(labels, value) {
    labels.forEach((label) => {
      cy.contains(label).parent().contains(value).click();
    });
  }

  submitForm() {
    cy.contains("button", "Submit").should("be.visible").click();
  }

  validateSuccessMessage(message) {
    cy.contains(message, { timeout: 10000 }).should("be.visible");
  }
}

export default new PerformancePage();
