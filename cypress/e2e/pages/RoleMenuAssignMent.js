import BasePage from "./BasePage";
import cypress from "cypress-xpath";

class RoleMenuAssignMent extends BasePage {
  get menuAssignmentHeader() {
    return cy.get("h3");
  }

  get selectRoleDropDown() {
    return cy.get('input[id^="react-select-"][id$="-input"]');
  }

  get CheckBox() {
    return cy.get("#check_Dashboard");
  }
  get checkedBox() {
    return cy.get("#check_Dashboard");
  }
  get saveBtn() {
    return cy.xpath("//button[text()='Submit']");
  }
  get successMsg() {
    return cy.get("strong");
  }

  roleAssignmentHeader(headerText) {
    this.menuAssignmentHeader.should("have.text", headerText);
  }

  clickOnRole() {
    this.selectRoleDropDown.click({ force: true });
  }

  selectRole() {
    this.selectRoleDropDown // dynamic input
      .should("exist")
      .should("be.visible")
      .type("IT Manager{enter}");
  }
  clickOnDashboardCheckBox() {
    this.CheckBox.click();
    cy.scrollTo("bottom");
  }
  clickOnSaveBtn() {
    this.saveBtn.click();
  }
  checkBoxAssert() {
    cy.scrollTo("top");
    this.checkedBox.should("be.checked");
  }
  checkBoxAssertion() {
    cy.scrollTo("top");
    this.checkedBox.should("not.be.checked");
  }
}
export default new RoleMenuAssignMent();
