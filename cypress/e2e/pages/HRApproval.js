import BasePage from "./BasePage";
import Loaders from "../components/Loaders";


class HRApproval extends BasePage{

//  Locators
get caeliusEmail() { return cy.get("div[class='row mt-3'] h6[class='truncate-text']")}
get department() { return cy.xpath("//label[@for='department']//parent::div/following-sibling::div[1]")}
get designation() { return cy.xpath("//label[@for='designation']//parent::div/following-sibling::div[1]")}
get assignManager() { return cy.xpath("//div[@class='dropdown-container']//div[contains(@class,'css-19bb58m')]")}
get employeeType() { return cy.xpath("(//div[@class='col-md-4']//div[contains(@class,' css-19bb58m')])[4]")}
get approveButton() { return cy.get("div[role='tabpanel'] form div button[type='submit']")}


// Methods
selectDepartment(departmentName) {
    //this.department.type(departmentName + '{enter}').should('contain', departmentName);
    this.department.type(departmentName).pressEnter().should('contain', departmentName);
    cy.log("Department is selected");
}

selectDesignation(designation) {
    this.designation.wait(500).type(designation+ '{enter}').should('contain', designation);
    cy.log("Designation is selected");
}

selectAssignManager(assignManagerName) {
    this.assignManager.wait(500).type(assignManagerName+ '{enter}');
    cy.log("Assign Manager is selected");
}

selectEmployeeType(employeeType) {
    this.employeeType.wait(500).type(employeeType+ '{enter}');
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
export default new HRApproval();
