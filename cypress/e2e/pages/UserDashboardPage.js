import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class UserDashboardPage extends BasePage {

  // Locators    
  get workExperience() { return cy.get("h2[id='heading4'] button[type='button']") }
  get noRecordAvailable() { return cy.get("#collapse4 div.table-responsive div") }
  get basicInfo() { return cy.get("h2[id='heading1'] button[type='button']") }
  get editBasicInfo() { return cy.get("#collapse1 a i") }
  get closeButton() { return cy.get("button[class='btn btn-secondary btn-sm ms-2']") }
  get editFirstName() { return cy.get("input[name='firstName']:not(:disabled)") }
  get editLastName() { return cy.get("input[name='lastName']:not(:disabled)") }
  get editMiddleName() { return cy.get("input[name='middleName']:not(:disabled)") }
  get updateButton() { return cy.get("button[class='btn btn-primary btn-sm']") }

  // Methods
  clickOnWorkExperience() {
    this.workExperience.click();
    cy.log("Clicked on the Work Experience Option");
  }

  clickOnBasicInfo() {
    this.basicInfo.wait(1000).click();
    cy.log("Clicked on the Basic Info Option");
  }

  clickOnEditButtonBasicInfo() {
    this.editBasicInfo.click();
    cy.log("Clicked on the Edit button Under Basic Info Accordion");
  }

  enterFirstName(firstNameText) {
    this.editFirstName.clear().type(firstNameText).should('have.value', firstNameText)
    cy.log("Updated First Name Text");
  }

  enterMiddleName(middleNameText) {
    this.editMiddleName.clear().type(middleNameText).should('have.value', middleNameText)
    cy.log("Updated Middle Name Text");
  }

  enterLastName(lastNameText) {
    this.editLastName.clear().type(lastNameText).should('have.value', lastNameText)
    cy.log("Updated Last Name Text");
  }

  clickOnCloseButton() {
    this.closeButton.click();
    cy.log("Clicked on the Close Button under Basic Info Accordion");
  }

  clickOnUpdateButton() {
    this.updateButton.click();
    cy.log("Clicked on the Update Button under Basic Info Accordion");
    Loaders.threeDotLoading.should('not.exist');
  }
  
  getFieldValue(label) {
    return cy.get('.row').find(`p:contains(${label})`).then($element => {
      // Get the parent container of the label
      const parent = $element.parent();

      // Find the index of the label in the parent container
      const index = parent.find('p').toArray().findIndex(p => Cypress.$(p).text().includes(label));

      // Return the value from the next row based on the calculated index
      return cy.get('.row').find(`p:contains(${label})`).parent().parent().next().find('p').eq(index)
        .invoke('text').then(text => {
          return text.replace(/\u00A0/g, ' ').trim(); // Replace &nbsp; with space and trim
        });
    });
  }
}

export default new UserDashboardPage();