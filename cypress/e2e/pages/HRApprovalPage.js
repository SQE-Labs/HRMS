import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class HRApprovalPage extends BasePage {
  //  Locators
  get caeliusEmail() {
    return cy.get("div[class='row mt-3'] h6[class='truncate-text']");
  }
  get department() {
    return cy.xpath(
      "//label[@for='department']//parent::div/following-sibling::div[1]"
    );
  }
  get designation() {
    return cy.xpath(
      "//label[@for='designation']//parent::div/following-sibling::div[1]"
    );
  }
  get assignManager() {
    return cy.xpath(
      "//div[@class='dropdown-container']//div[contains(@class,'css-19bb58m')]"
    );
  }
  get employeeType() {
    return cy.xpath(
      "(//div[@class='col-md-4']//div[contains(@class,' css-19bb58m')])[4]"
    );
  }
  get approveButton() {
    return cy.get("div[role='tabpanel'] form div button[type='submit']");
  }
  get designationSearch() {
    return cy.get("#react-select-3-input");
  }
  get depatmentSearch() {
    return cy.get("#react-select-2-input");
  }
  get assignManagerSearch() {
    return cy.get("#react-select-4-input");
  }
  get employeeTypeSearch() {
    return cy.get("#react-select-6-input");
  }
  get LeaveManager() {
    return cy.get("#react-select-5-input");
  }
  get employeSubtype() {
    return cy.get("#react-select-7-input");
  }

  // Methods
  selectDepartment(departmentName) {
    //this.department.type(departmentName).pressEnter().should('contain', departmentName);
    cy.selectDrpValueByText(
      this.depatmentSearch,
      departmentName,
      true,
      this.depatmentSearch
    );
    cy.log("Department is selected");
  }

  selectDesignation(designation) {
    // this.designation.wait(1000).type(designation).pressEnter().should('contain', designation);
    cy.selectDrpValueByText(
      this.designationSearch,
      designation,
      true,
      this.designationSearch
    );
    cy.log("Designation is selected");
  }

  selectAssignManager(assignManagerName) {
    cy.selectDrpValueByText(
      this.assignManagerSearch,
      assignManagerName,
      true,
      this.assignManagerSearch
    );
    //this.assignManager.wait(1000).type(assignManagerName).pressEnter();
    cy.log("Assign Manager is selected");
  }

  selectEmployeeType(employeeType) {
    cy.selectDrpValueByText(
      this.employeeTypeSearch,
      employeeType,
      true,
      this.employeeTypeSearch
    );
    //this.employeeType.wait(1000).type(employeeType).pressEnter();
    cy.log("Employee Type is selected");
  }

  selectLeaveManager(manager) {
    cy.selectDrpValueByText(
      this.LeaveManager,
      manager,
      true,
      this.LeaveManager
    );
    //this.employeeType.wait(1000).type(employeeType).pressEnter();
    cy.log("Leave Manager is selected");
  }

  selectEmplSubtype(subType) {
    cy.selectDrpValueByText(
      this.employeSubtype,
      subType,
      true,
      this.employeSubtype
    );
    //this.employeeType.wait(1000).type(employeeType).pressEnter();
    cy.log("Employee Subtype is selected");
  }

  clickApproveButton() {
    this.approveButton.click();
    Loaders.threeDotLoading.should("not.exist");
    cy.log("Clicked on approve button");
  }

  validateSuccessMessage() {
    cy.contains("Employee's HRMIS account created ").should("be.visible");
    cy.log("Success message is displayed");
  }
}
export default new HRApprovalPage();
