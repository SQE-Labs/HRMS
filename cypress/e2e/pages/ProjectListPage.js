// cypress/e2e/pages/ProjectListPage.js
import "cypress-xpath";

class ProjectListPage {
  get projectListHeader() {
    return cy.contains("Project List");
  }
  get createProjectBtn() {
    return cy.contains("Create Project");
  }
  get createProjectHeader() {
    return cy.contains("Create Project");
  }
  get submitBtn() {
    return cy.contains("button", "Submit");
  }
  get successMsg() {
    return cy.contains("Project created successfully"); // Update as per actual success message
  }

  enterProjectName(name) {
    cy.xpath("//input[@name='projectName']").type(name);
  }
  selectProjectType(type) {
    cy.get('select[placeholder="Select Project Type*"]').select(type);
  }
  selectDeliveryLead(lead) {
    cy.get('select[placeholder="Select Delivery Lead*"]').select(lead);
  }
  selectProjectManager(manager) {
    cy.get('select[placeholder="Select Project Manager*"]').select(manager);
  }
  selectPrincipalSponsor(sponsor) {
    cy.get('select[placeholder="Select Principal Sponsor*"]').select(sponsor);
  }
  selectLeadBusinessAnalyst(analyst) {
    cy.get('select[placeholder="Select Lead Business Analyst*"]').select(
      analyst
    );
  }
  enterProjectDescription(desc) {
    cy.get('textarea[placeholder="Type Here"]').type(desc);
  }
  enterSOWStartDate(date) {
    cy.get('input[placeholder="mm/dd/yyyy"]').eq(0).type(date);
  }
  enterSOWEndDate(date) {
    cy.get('input[placeholder="mm/dd/yyyy"]').eq(1).type(date);
  }
  enterActualStartDate(date) {
    cy.get('input[placeholder="mm/dd/yyyy"]').eq(2).type(date);
  }
  enterActualEndDate(date) {
    cy.get('input[placeholder="mm/dd/yyyy"]').eq(3).type(date);
  }
}

export default new ProjectListPage();
