import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class UserDashboard extends BasePage {

  // Locators    
  get workExperience() { return cy.get("h2[id='heading4'] button[type='button']") }
  get noRecordAvailable() { return cy.get("#collapse4 div.table-responsive div") }
  get basicInfo() { return cy.get("h2[id='heading1'] button[type='button']") }
  get editBasicInfo() { return cy.get("#collapse1 a i") }
  get closeButton() { return cy.get("button[class='btn btn-secondary btn-sm ms-2']") }
  get editFirstName() { return cy.get("input[value='Auto']") }
  get editLastName() { return cy.get("input[value='User']") }
  get editMiddleName() { return cy.get("input[value='Mation']") }
  get updateButton() { return cy.get("button[class='btn btn-primary btn-sm']") }
  get work() { return cy.get("h2[id='heading2'] button[type='button']") }
  get editWorkInfo() { return cy.get('#collapse2 a i') }
  get editDateOfJoining() { return cy.get("div[class='input-group'] [class='border']") }
  get personalDetails() { return cy.get("h2[id='heading3'] button[type='button']")}

  // Methods
  clickOnWorkExperience() {
    this.workExperience.click();
    cy.log("Clicked on the Work Experience Option");
  }

  clickOnBasicInfo() {
    this.basicInfo.wait(2000).click();
    cy.log("Clicked on the Basic Info Option");
  }

  clickOnWork() {
    this.work.click();
    cy.log("Clicked on the Work Option");
  }

  clickOnPersonalDeatils() {
    this.personalDetails.click();
    cy.log("Clicked on the Personal Details Option");
  }

  updateDOJ(doj) {
    this.editDateOfJoining.type(doj).should('have.value', doj);
    cy.log("Updated Date of Joining");
  }

  reverseDOJ(doj) {
    this.editDateOfJoining.type(doj).should('have.value', doj);
    cy.log("Reverse Date of Joining");
  }

  validateNoRecordsAppear() {
    this.noRecordAvailable.should('have.text', "No records available");
    cy.log("No Records Appear")
  }

  validateAccordionCollapsed() {
    this.editBasicInfo.should('not.be.visible');
    cy.log("Accordion Is Collapsed")
  }

  clickOnEditButtonBasicInfo() {
    this.editBasicInfo.click();
    cy.log("Clicked on the Edit button");
  }

  clickOnEditButtonUnderWorkInfo() {
    this.editWorkInfo.click();
    cy.log("Clicked on the Edit button");
  }

  updateFirstName(firstNameText) {
    this.editFirstName.clear().type(firstNameText).should('have.value', firstNameText)
    cy.log("Updated First Name Text");
  }

  updateMiddleName(middleNameText) {
    this.editMiddleName.clear().type(middleNameText).should('have.value', middleNameText)
    cy.log("Updated Middle Name Text");
  }

  updateLastName(lastNameText) {
    this.editLastName.clear().type(lastNameText).should('have.value', lastNameText)
    cy.log("Updated Last Name Text");
  }

  clickOnCloseButton() {
    this.closeButton.click();
    cy.log("Clicked on the Close Button");
  }

  clickOnUpdateButton() {
    this.updateButton.click();
    cy.log("Clicked on the Update Button");
    Loaders.threeDotLoading.should('not.exist');
  }

  validateSuccessMessage() {
    cy.contains("success").should('be.visible')
    cy.log("Success message is displayed");
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

export default new UserDashboard();