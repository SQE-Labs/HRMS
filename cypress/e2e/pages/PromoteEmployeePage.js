import BasePage from "./BasePage";

class PromoteEmployeePage extends BasePage {


//Locators
get promoteEmployeeLbl() {return cy.get("h3.heading")}
get selectEmployeeDrp(){return cy.get("#react-select-2-input")}
get tableHeadersLbl(){return cy.get("table.resume tr th")}

//Methods

}
export default new PromoteEmployeePage();