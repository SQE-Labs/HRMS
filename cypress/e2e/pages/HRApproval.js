import BasePage from "./BasePage";

class HRApproval extends BasePage{

//  Locators
get caeliusEmail() { return cy.get("div[class='row mt-3'] h6[class='truncate-text']")}
get department() { return cy.get("")}
get designation() { return cy.get("")}
get assignManager() { return cy.get("")}
get employeeType() { return cy.get("")}


// Methods
selectDepartment(departmentName) {
    this.department.type(departmentName);
    cy.log("Department is selected");
}

selectDesignation(designation) {
    this.designation.type(designation).should('contain', designation);
    cy.log("Designation is selected");
}

selectAssignManager(assignManagerName) {
    this.assignManager.type(assignManagerName).should('contain', assignManagerName);
    cy.log("Assign Manager is selected");
}

selectEmployeeType(employeeType) {
    this.employeeType.type(employeeType).should('contain', employeeType);
    cy.log("Employee Type is selected");
   }
}
export default new HRApproval();
