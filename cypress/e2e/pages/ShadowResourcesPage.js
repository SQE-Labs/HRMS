import BasePage from "./BasePage";
import "cypress-xpath";
import { selectDrpValueByText } from "../../support/utils";


class ShadowResourcesPage extends BasePage{
    //Locators
    get searchByName(){
      return cy.xpath("//input[@placeholder='Search By Project Name']");
    }
    get addMemberBtn(){
        return cy.xpath("//button[contains(text(),'Add Member')]");
    }
    get memberAddBtn(){
        return cy.xpath("//button[@type='submit']");
    }
    get mainEmployee(){
        return cy.get("#react-select-3-input");
    }
    get shadowEmp(){
        return cy.get("#react-select-2-input");
    }
    get resDesignation(){
        return cy.get("#react-select-4-input");
    }
    get getToastMsg(){
        return cy.get(".Toastify__toast-body :nth-child(2)");
    }





    //Methods
    searchByProjectName(text) {
      this.searchByName
      .should('exist')
      .should('be.visible')
      .clear()
      .type(text, { force: true });
    }
    selectMainEmployee(text){
        cy.selectDrpValueByText(
        this.mainEmployee,
        text,
        true,
        this.mainEmployee
      )
    }
    shadowEmployeeName(text){
        cy.selectDrpValueByText(
        this.shadowEmp,
        text,
        true,
        this.shadowEmp
      )
    }
    shadowResourceDesignation(text){
        cy.selectDrpValueByText(
        this.resDesignation,
        text,
        true,
        this.resDesignation
      )
    }
    toggleProjectAccordion(projectName) {
      cy.contains('button.accordion-button', projectName)
        .should('be.visible')
        .click({ force: true })
        .scrollIntoView();
    }
    addShadowMemberPopupHeader(){
        cy.contains("h5", "Add Shadow Member")
          .should("be.visible");
    }
    clickOnAddMembersBtn(){
        this.addMemberBtn.click();
    }
    clickOnAddMemberBtn(){
        this.memberAddBtn.click();
    }
    joiningDate() {
    const now = new Date();
    const day = now.getDate();

    // open datepicker
    cy.xpath('(//input[@placeholder="mm/dd/yyyy"])[1]')
        .click({ force: true });

    // click today's day
    cy.contains('.react-datepicker__day', new RegExp(`^${day}$`))
        .click({ force: true });
    }

    verifyShadowMembers(testData) {
    cy.contains('h5', 'Shadow Members')
        .closest('.card, .accordion-item, .col-md-12') 
        .find('table.resume.custom')
        .should('be.visible')
        .and('contain', testData.ShadowEmployeeName)
        .and('contain', testData.AddEmployeeName)
        .and('contain', testData.Designation);
    }
}


export default new ShadowResourcesPage();