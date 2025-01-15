import BasePage from "./BasePage";
import Loaders from "../components/Loaders";


class HRApprovalPage extends BasePage{

//  Locators
get caeliusEmail() { return cy.get("div[class='row mt-3'] h6[class='truncate-text']")}
get department() { return cy.xpath("//label[@for='department']//parent::div/following-sibling::div[1]")}
get designation() { return cy.xpath("//label[@for='designation']//parent::div/following-sibling::div[1]")}
//get assignManager() { return cy.xpath("//div[@class='dropdown-container']//div[contains(@class,'css-19bb58m')]")}
//get leaveManager() { return cy.xpath("//div[@class='dropdown-container']//div[contains(@class,'css-19bb58m')]")}
//get department() { return cy.xpath("(//div[@class='col-md-4']//div[contains(@class,' css-19bb58m')])[1]")}
//get designation() { return cy.xpath("(//div[@class='col-md-4']//div[contains(@class,' css-19bb58m')])[2]")}
get assignManager() { return cy.xpath("(//div[@class='col-md-4']//div[contains(@class,' css-19bb58m')])[3]")}
get leaveManager() { return cy.xpath("(//div[@class='col-md-4']//div[contains(@class,' css-19bb58m')])[4]")}
get employeeType() { return cy.xpath("(//div[@class='col-md-4']//div[contains(@class,' css-19bb58m')])[5]")}
get employeeSubType() { return cy.xpath("(//div[@class='col-md-4']//div[contains(@class,' css-19bb58m')])[6]")}
get approveButton() { return cy.get("div[role='tabpanel'] form div button[type='submit']")}


// Methods
selectDepartment(departmentName) {
    this.department.type(departmentName).pressEnter().should('contain', departmentName);
    cy.log("Department is selected");
}

selectDesignation(designationName) {
    this.designation.wait(1000).type(designationName).pressEnter().should('contain', designationName);
    cy.log("Designation is selected");
}

selectAssignManager(assignManagerName) {
    this.assignManager.wait(1000).type(assignManagerName).pressEnter();
    cy.log("Assign Manager is selected");
}

selectLeaveManager(assignLeave) {
    this.assignManager.wait(1000).type(assignLeave).pressEnter();
    cy.log("Leave Manager is selected");
}

selectSubEmployeeType(employeeSubType) {
    this.employeeType.wait(1000).type(employeeSubType).pressEnter();
    cy.log("Employee Type is selected");
   } 

selectEmployeeType(employeeType) {
    this.employeeType.wait(1000).type(employeeType).pressEnter();
    cy.log("Employee Type is selected");
   }

clickApproveButton() {
    this.approveButton.click();
    Loaders.threeDotLoading.should('not.exist');    
    cy.log("Clicked on approve button");
}

validateSuccessMessage() {
    cy.contains("Employee's HRMIS account created ").should('be.visible')
    cy.log("Success message is displayed");
 }
}
export default new HRApprovalPage();
