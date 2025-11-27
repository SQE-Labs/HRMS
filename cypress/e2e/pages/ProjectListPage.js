import BasePage from "./BasePage";
import "cypress-xpath";
import { selectDrpValueByText } from "../../support/utils";


class ProjectListPage extends BasePage{

    //Locators
    get projectListHeader(){
        return cy.xpath("//h1[text()='Project List']");
    }
    get createBtn(){
        return cy.xpath("//a[text()='Create Project']");
    }
    get createProjectHeader(){
        return cy.xpath("//h1[text()='Create Project']");
    }
    get pjName(){
        return cy.xpath("//input[@name='projectName']");
    }
    get pjType(){
        return cy.get("#react-select-2-input");
    }
    get dLead(){
        return cy.get("#react-select-3-input");
    }
    get pManager(){
        return cy.get("#react-select-4-input");
    }
    get pSponsor(){
        return cy.get("#react-select-5-input");
    }
    get leadBA(){
        return cy.get("#react-select-6-input");
    }
    get pdescription(){
      return cy.xpath("//textarea[@name='commercialSummary']");
    }
    get submitBtn(){
        return cy.xpath("//button[@type='submit']");
    }
    get successMsg(){
        return cy.xpath("//div[contains(text(),'Project created successfully.')]");
    }
    get assertSuccessMsg_Update(){
      return cy.xpath("//div[contains(text(),'Project updated successfully.')]");
    }
    get searchByName(){
      return cy.xpath("//input[@name='search']");
    }
    get editBtn(){
      return cy.xpath("//i[@class='fa fa-edit']");
    }
    get updateBtn(){
      return cy.xpath("//button[text()='Update']");
    }



    //Methods
    createProjectBtn(){
        this.createBtn.click();
    }
    projectName(text){
        this.pjName
            .should('be.visible')
            .clear()
            .type(text);
    }
    projectType(text) {
    cy.selectDrpValueByText(
      this.pjType,
      text,
      true,
      this.pjType
     );
    }
    deliveryLead(text) {
    cy.selectDrpValueByText(
      this.dLead,
      text,
      true,
      this.dLead
     );
    }
    projectManager(text){
        cy.selectDrpValueByText(
            this.pManager,
            text,
            true,
            this.pManager
        )
    }
    principalSponsor(text){
        cy.selectDrpValueByText(
            this.pSponsor,
            text,
            true,
            this.pSponsor
        )
    }
    leadBusinessAnalyst(text){
        cy.selectDrpValueByText(
            this.leadBA,
            text,
            true,
            this.leadBA
        )
    }
    editProjectType(text) {
      cy.selectDrpValueByText(
        this.pjType,
        text,
        true,
        this.pjType
      )
    }
    projectDescription(text){
        this.pdescription
            .should('be.visible')
            .clear()
            .type(text);
    }
    
    searchByProjectName(text) {
      this.searchByName
      .should('exist')
      .should('be.visible')
      .clear()
      .type(text, { force: true });
  }

  verifyProjectCard(projectName, status = 'Active') {
      cy.contains('button.accordion-button.collapsed', projectName)
        .should('be.visible')
        .within(() => {
          cy.contains(projectName).should('be.visible');
          cy.contains(status).should('be.visible');
    });
  }
  toggleProjectAccordion(projectName) {
      cy.contains('button.accordion-button', projectName)
        .should('be.visible')
        .click({ force: true });
  }
  verifyProjectDetailsInAccordion(testData) {

    cy.get('.project-details')
      .should('be.visible');

    const body = cy.get('.project-details');

    body.should("include.text", testData.ProjectType);
    body.should("include.text", testData.DeliveryLead);
    body.should("include.text", testData.ProjectManager);
    body.should("include.text", testData.PrincipalSponsor);
    body.should("include.text", testData.LeadBusinessAnalyst);

}
  clickOnEditProjectBtn(){
    this.editBtn.click();
  }
  clickOnUpdateBtn(){
    this.updateBtn.click();
  }
    assertValMsg_PN(){
    cy.xpath("//input[@name='projectName']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  assertValMsg_PT(){
    cy.xpath("//input[@name='projectType']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  assertValMsg_DL(){
    cy.xpath("//input[@name='dlId']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  assertValMsg_PM(){
    cy.xpath("//input[@name='projectManager']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  assertValMsg_PS(){
    cy.xpath("//input[@name='principalSponsor']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  assertValMsg_PD(){
    cy.xpath("//textarea[@name='commercialSummary']").then(($el) => {
    const message = $el[0].validationMessage;
    expect(
      message === "Please fill out this field." || message === "Please fill in this field."
    ).to.eq(true);
    });
  }
  clickSubmitBtn(){
    this.submitBtn.click();
  }
  enterStartDate() {
  const now = new Date();
  const day = now.getDate();

  // open datepicker
  cy.xpath('(//input[@placeholder="mm/dd/yyyy"])[1]')
    .click({ force: true });

  // click today's day
  cy.contains('.react-datepicker__day', new RegExp(`^${day}$`))
    .click({ force: true });
}

enterEndDate() {
  const now = new Date();

  // Add 6 days
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + 6);

  // Extract day, month, year
  const day = endDate.getDate();
  const month = endDate.toLocaleString("en-US", { month: "long" });
  const year = endDate.getFullYear();

  const endDateInput = '(//input[@placeholder="mm/dd/yyyy"])[2]';

  // Open datepicker for end date
  cy.xpath(endDateInput).scrollIntoView().click({ force: true });

  // Ensure correct month & year is visible
  cy.get('.react-datepicker__current-month').then(($m) => {
    if (!$m.text().includes(month) || !$m.text().includes(year)) {
      cy.get('.react-datepicker__navigation--next')
        .click({ force: true });
    }
  });

  // Select the correct day
  cy.contains('.react-datepicker__day', new RegExp(`^${day}$`))
    .click({ force: true });
}

}

export default new ProjectListPage();