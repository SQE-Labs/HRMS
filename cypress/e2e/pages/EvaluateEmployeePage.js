import BasePage from "./BasePage";

class EvaluateEmployeePage extends BasePage {

//Locators
get evaluateEmployeeTxt() { return cy.get("div[class='page-heading'] h1")}
get employeeDrp() { return cy.get(".css-19bb58m")}
get evaluateFormTxt() { return cy.get("form[id='assign-asset'] div[class='card'] h3")}

//Methods
selectEmployee(text) {
    cy.selectDrpValueByText(this.employeeDrp, text, true, this.employeeDrp);
  }

}

























export default new EvaluateEmployeePage();