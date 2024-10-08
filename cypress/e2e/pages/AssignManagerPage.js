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

getTrimmedText(element) {
  return element.invoke('text').then((text) => text.trim());
}

assertTextEquals(element, expectedText) {
  this.getTrimmedText(element).then((trimmedText) => {
      expect(trimmedText).to.eq(expectedText);
  });
}



getActualTableTexts(element) {
  const actualTexts = [];
  return element.each(($el) => {
      const text = Cypress.$($el).text().trim();
      actualTexts.push(text);
  }).then(() => actualTexts); // Return the collected texts after the iteration
}

assertExpectedTableLbl(expectedTexts) {
  this.getActualTableTexts(this.tableHeadersLbl).then((actualTexts) => {
    expectedTexts.forEach((expectedText, index) => {
      console.log(actualTexts[index]);
      console.log(expectedText[index]);
        expect(actualTexts[index]).to.eq(expectedText);
    });
});
}



selectEmployee(text) {
  cy.selectDrpValueByText(this.selectEmployeeDrp, text, true, this.selectEmployeeDrp);
}

selectManager(text) {
  cy.selectDrpValueByText(this.selectManagerDrp, text, true, this.selectManagerDrp);
}






}



export default new AssignManagerPage();