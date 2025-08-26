import BasePage from "./BasePage";
import Loaders from "../components/Loaders";
import "cypress-xpath";

class LeaveUpdate extends BasePage {
  get LeaveUpdateHeader() {
    return cy.get("h1");
  }

  get selectEmp() {
    return cy.get(".css-19bb58m");
  }
  get list() {
    return cy.get("thead>tr>th");
  }
  get privilage() {
    return cy.get("tbody > tr > :nth-child(1)");
  }
  get updateBtn() {
    return cy.xpath("//button[text()='Update']");
  }
  get cancelBtn() {
    return cy.get(".bg-grey");
  }
  get crossBtn() {
    return cy.get(".btn-close");
  }
  get updateBtn() {
    return cy.get('[type="submit"]');
  }
  get succ_Msg() {
    return cy.xpath("//div[text()='Successfully Updated.']");
  }
  assertHeader() {
    this.LeaveUpdateHeader.should("have.text", "Leave Update");
  }
  selectEmployee(EmpName) {
    cy.selectDrpValueByText(this.selectEmp, EmpName, true, this.selectEmp);
  }
  selectRole(text) {
    this.selectEmp // dynamic input
      .should("exist")
      .should("be.visible")
      .type(text, { force: true });
  }

  getlistOfLeave() {
    const expectedTexts = ["Privilege", "Maternity", "Paternity", "Action"];

    this.list.each(($el) => {
      const text = $el.text();

      expectedTexts.forEach((expected) => {
        if (text.includes(expected)) {
          cy.wrap($el).contains(expected).should("exist");
        }
      });
    });
  }
  privilage() {
    this.privilage.get;
  }
  clickOnUpdateButton() {
    this.updateBtn.should("be.visible").click();
  }
  leaveUpdatePopUp() {
    cy.xpath(
      "//h5[text()='Leave Update']/../following-sibling::div//input"
    ).each(($el, index) => {
      cy.wrap($el)
        .invoke("attr", "value")
        .then((val) => {
          cy.log(`Value of input ${index + 1}: ${val}`);
          console.log(`Value of input ${index + 1}:`, val);
        });
    });
  }
  clickOnCancelBtn() {
    this.cancelBtn.click();
  }
  clickOnCrossBtn() {
    this.crossBtn.click();
  }
  enterTxtIneachfield() {
    cy.xpath(
      "//h5[text()='Leave Update']/../following-sibling::div//input"
    ).each(($el) => {
      cy.wrap($el).clear().type("1");
    });
  }
  clickOnUpdateBtn() {
    this.updateBtn.click();
  }
  assertSuccMsg() {
    this.succ_Msg.should("have.text", "Successfully Updated.");
  }
}
export default new LeaveUpdate();
