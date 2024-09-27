import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class AssignManagerPage extends BasePage {


//Locators
get assignManagerLbl() {return cy.get("div.page-heading h1")}
get selectEmployeeDrp(){return cy.get("#react-select-2-input")}
get tableHeadersLbl(){return cy.get("table.resume tr th")}
get assigneeMangerPopupLbl(){return cy.get("#staticBackdropLabel")}
get submitAssigneeBtn(){return cy.get("#staticBackdropReassignManager button[type='submit']")}
get reAssigneeBtn(){return cy.get("button.btn")}
get cancelBtn(){return cy.get("#staticBackdropReassignManager button[type='button'].theme-button")}
get selectManagerDrp() {return cy.get("#react-select-3-input")}
get assignedManagerLbl(){return cy.get("table.resume tr td:nth-child(3)")}

//Methods

clickOnSubmitBtn(){
  this.submitAssigneeBtn.wait(1000).click();
}

clickOnReAssigneBtn(){
  this.reAssigneeBtn.click();
}


clickOnCancelBtn(){
  this.cancelBtn.wait(1000).click();
}


}
export default new AssignManagerPage();