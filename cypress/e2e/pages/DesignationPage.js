import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class DepartmentsPage extends BasePage {


  //Locators
  get designationHeader() { return cy.get("#showMenuBtn + h1") }
  get selectDepartment() { return cy.get("div.css-19bb58m") }
  get designationNames() { return cy.get("tbody tr td:nth-child(2)") }
  // get noRecordeLbl() { return cy.get("div.fs-4") }
  // get searchTxt() { return cy.get("input[name='search']") }
  get addDesignationBtn() { return cy.get("div.actions > a.export") }
  get addUpdateDesignationHeader() { return cy.get("#staticBackdropLabel") }
  get cancelBtn() { return cy.xpath("//button[@type='button'][text()='Cancel']") }
  get submitBtn() { return cy.get("button[type='Submit']") }
  get crossIconBtn() { return cy.get("#staticBackdropLabel + button") }
  get designationNameTxt() { return cy.get("input[name='name']") }
  // get departmentCount(){return cy.get("#showMenuBtn ~ div span")}
  get editLastDesignation() { return cy.get("tbody tr:last-of-type td a") }
  get lastDesignationName(){return cy.get("tbody tr:last-of-type td:nth-child(2)")}

  // Method

  select_Department(text) {
    cy.selectDrpValueByText(this.selectDepartment, text, true, this.selectDepartment);
  }

  assertDesignations(designations) {
    this.designationNames
      .should('have.length', designations.length)
      .each((element, index) => {
        expect(element.text().trim()).to.equal(designations[index]);
      });
  }




  getValidationMessage(element) {
    return element.invoke('prop', 'validationMessage');
  }

  assertValidation(element,expectedMessage) {
    this.getValidationMessage(element).then((message) => {
        expect(message).to.equal(expectedMessage);
    });
  }

  clickOnCancelBtn() {
    this.cancelBtn.wait(1000).click();
  }

  clickOnCrossIcon() {
    this.crossIconBtn.wait(1000).click();
  }

   clickOnSubmit(){
     this.submitBtn.click();
   }

  
  enterDesignationName(designation){
    this.designationNameTxt.clear().wait(1000).type(designation).should('have.value',designation);
   }
  

  clickOnLastEditBtn() {
    this.editLastDesignation.click();
  }

  clickOnAddDesingation() {
    this.addDesignationBtn.click();
  }

}



export default new DepartmentsPage();