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
    get submitBtn(){
        return cy.xpath("//button[@type='submit']");
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
  clickSubmitBtn(){
    this.submitBtn.click();
  }
}

export default new ProjectListPage();