import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class DepartmentsPage extends BasePage {
  //Locators
  get departmentHeader() {
    return cy.get("h1");
  }
  get departmentName() {
    return cy.get("tbody tr:first-of-type td[data-title='Name']");
  }
  get noRecordeLbl() {
    return cy.get("div.fs-4");
  }
  get searchTxt() {
    return cy.get("input[name='search']");
  }
  get addDepartmentBtn() {
    return cy.get("div.actions > a.export");
  }
  get addUpdateDepartmentHeader() {
    return cy.get("#staticBackdropLabel");
  }
  get cancelBtn() {
    return cy.xpath("//button[@type='button'][text()='Cancel']");
  }
  get submitBtn() {
    return cy.get("button[type='Submit']");
  }
  get crossIconBtn() {
    return cy.get("#staticBackdropLabel + button");
  }
  get DepartmentNameTxt() {
    return cy.get("input[name='name']");
  }
  get departmentCount() {
    return cy.get("#showMenuBtn ~ div span");
  }
  get editLastDepartment() {
    return cy.get("tbody tr:last-of-type td a");
  }

  get newDeptHeader() {
    return cy.get("#staticBackdropLabel");
  }
  // Method

  getValidationMessage(element) {
    return element.invoke("prop", "validationMessage");
  }

  assertValidation(element, expectedMessage) {
  this.getValidationMessage(element).then((message) => {
    expect(message).to.satisfy(
      (msg) =>
        msg === expectedMessage ||
        msg === "Please fill in this field." ||
        msg === "Please fill out this field."
      );
    });
  }

  clickOnCancelBtn() {
    this.cancelBtn.wait(1000).click();
  }

  validateHeader() {
    this.newDeptHeader.wait(1000).should("contain", " Department");
  }

  clickOnCrossIcon() {
    this.crossIconBtn.wait(1000).click();
  }

  clickOnSubmit() {
    this.submitBtn.click();
  }

  clickOnAddDepartment() {
    this.addDepartmentBtn.click();
  }

  enterDepartmentName(departmentName) {
    this.DepartmentNameTxt.clear()
      .wait(1000)
      .type(departmentName)
      .should("have.value", departmentName);
  }
  getDepartment() {
    return this.departmentName.invoke("text");
  }

  searchDepartment(department) {
    if (department) {
      this.searchTxt.clear().type(department).should("have.value", department);
    } else {
      this.getDepartment().then((department) => {
        this.searchTxt
          .clear()
          .type(department)
          .should("have.value", department);
      });
    }
  }

  assertSearchDepartment() {
    this.searchTxt.invoke("val").then((text1) => {
      this.departmentName.invoke("text").then((text2) => {
        expect(text1.trim()).to.equal(text2.trim());
      });
    });
  }

  assertDepartmentCount(expectedCount) {
    this.departmentCount.invoke("text").then((Count) => {
      const actualCount = parseInt(Count, 10);
      const expectedCountNum = parseInt(expectedCount, 10);
      expect(actualCount).to.equal(expectedCountNum + 1);
    });
  }

  clickOnEditBtn() {
    this.editLastDepartment.click();
  }
}

export default new DepartmentsPage();
