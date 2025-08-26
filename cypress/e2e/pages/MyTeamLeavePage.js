import BasePage from "./BasePage";
import Loaders from "../components/Loaders";
import "cypress-xpath";

class MyTeamLeavePage extends BasePage {
  get myTeamLeaveHeader() {
    return cy.get("h1");
  }

  get statusDropdown() {
    return cy.xpath("//div[@class='search']/select");
  }

  get exportButton() {
    return cy.xpath("//button[text()='Export']");
  }
  get viewLink() {
    return cy.xpath("//a[text()='View']");
  }
  get crossIcon() {
    return cy.xpath(
      "//h5[text()='Pending Document to Upload']/following-sibling::button"
    );
  }
  get leaveApprovalHeader() {
    return cy.get("h5");
  }

  get submitButton() {
    return cy.get('[type="submit"]');
  }
  get actionDropdown() {
    return cy.get("#leaveAction");
  }
  get reasonTxtBox() {
    return cy.get(":nth-child(3) > :nth-child(3) > .border");
  }
  get succ_Msg() {
    return cy.get(".Toastify__toast-body > :nth-child(2)");
  }
  headerTxt() {
    this.myTeamLeaveHeader.should("have.text", "My Team Leave");
  }

  clickStatusDropdown() {
    this.statusDropdown.click();
  }
  selectStatus(statusName) {
    cy.selectDrpValueByText(
      this.statusDropdown,
      statusName,
      false,
      this.statusDropdown
    );
  }
  selectAction(action) {
    cy.selectDrpValueByText(
      this.actionDropdown,
      action,
      false,
      this.actionDropdown
    );
  }
  clickOnExportBtn() {
    this.exportButton.click();
  }
  clickOnViewLink() {
    this.viewLink.click();
  }
  clickOnCrossIcon() {
    cy.wait(3000);
    this.crossIcon.click();
  }
  applyLeaveHeader() {
    this.leaveApprovalHeader.should("have.text", "Leave Approval");
  }
  clickOnSubmitButton() {
    this.submitButton.click();
  }
  enterReasonText(reasontext) {
    this.reasonTxtBox.type(reasontext);
  }
  successMessage() {
    this.succ_Msg.should("have.text", "Successfully Updated");
  }
}
export default new MyTeamLeavePage();
