import { title } from "process";
import BasePage from "./BasePage";

class RoleListPage extends BasePage {
  // Locators
  get roleListLbl() {
    return cy.get("h1");
  }
  get itemPerPageDrp() {
    return cy.get("#itemsPerPage");
  }
  get gridRows() {
    return cy.get("tbody tr");
  }
  get searchTxt() {
    return cy.get("input[name='search']");
  }
  get roletitle() {
    return cy.get("tbody tr:nth-child(1) td:nth-child(2)");
  }
  get noRecordeLbl() {
    return cy.get("div.fs-4");
  }
  get addRoleBtn() {
    return cy.get("div.actions > a.export");
  }
  get addUpdateRoleHeader() {
    return cy.get("#staticBackdropLabel");
  }
  get cancelBtn() {
    return cy.xpath("//button[@type='button'][text()='Cancel']");
  }
  get submitBtn() {
    return cy.get("button[type='Submit']");
  }
  get roleTitleTxt() {
    return cy.get("input[name='title']");
  }
  get descRoleTxt() {
    return cy.get("textarea[name='description']");
  }
  get lastRoleTitle() {
    return cy.get("tbody tr:last-of-type td:nth-child(2)");
  }
  get lastRoleDesc() {
    return cy.get("tbody tr:last-of-type td:nth-child(3)");
  }
  get editRole() {
    return cy.get("tbody tr:last-of-type td:nth-child(4) a:nth-child(1)");
  }
  get crossIconBtn() {
    return cy.get("#staticBackdropLabel + button");
  }
  get deleteRole() {
    return cy.get("tbody tr:last-of-type td:nth-child(4) a:nth-child(2)");
  }
  get deletePopUpHeader() {
    return cy.get("#staticBackdropDependentDelete h5");
  }
  get deleteYesBtn() {
    return cy.get("#staticBackdropDependentDelete button:nth-child(1)");
  }
  get deleteNoBtn() {
    return cy.get("#staticBackdropDependentDelete button:nth-child(2)");
  }

  // Methods
  clickOnAddRole() {
    this.addRoleBtn.click();
  }

  clickOnEditRole() {
    this.editRole.click();
  }

  clickOnDelete() {
    this.deleteRole.click();
  }

  clickOnDeleteYes() {
    this.deleteYesBtn.click();
  }

  clickOnDeleteNo() {
    this.deleteNoBtn.click();
  }

  clickOnCancelBtn() {
    this.cancelBtn.wait(1000).click();
  }

  clickOnCrossIcon() {
    this.crossIconBtn.wait(1000).click();
  }

  clickOnSubmit() {
    this.submitBtn.click();
  }

  getValidationMessage(element) {
    return element.invoke("prop", "validationMessage");
  }

  assertValidation(element, expectedMessage) {
    this.getValidationMessage(element).then((message) => {
      expect(message).to.equal(expectedMessage);
    });
  }

  enterRoleTitle(title) {
    this.roleTitleTxt.type(title);
  }

  enterRoleDesc(desc) {
    this.descRoleTxt.type(desc);
  }

  selectItemPerPage(count) {
    cy.selectDrpValueByText(this.itemPerPageDrp, count, false);
  }

  getRoleTitle() {
    return this.roletitle.invoke("text");
  }

  searchRole(title) {
    if (title) {
      this.searchTxt.clear().type(title).should("have.value", title);
    } else {
      this.getRoleTitle().then((title) => {
        this.searchTxt.clear().type(title).should("have.value", title);
      });
    }
  }

  assertSearchTitle() {
    this.searchTxt.invoke("val").then((text1) => {
      this.roletitle.invoke("text").then((text2) => {
        expect(text1.trim()).to.equal(text2.trim());
      });
    });
  }

  clickNextUntilDisabled() {
    cy.get("ul.pagination li")
      .contains("Next")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
          this.clickNextUntilDisabled();
        }
      });
  }

  assertDeletedRole(expectedtitle) {
    this.lastRoleTitle.invoke("text").then((expectedValue) => {
      expect(expectedtitle).not.to.equal(expectedValue);
    });
  }

  clickNext() {
    cy.get("ul.pagination li")
      .contains("Next")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
        }
      });
  }

  clickPrevious() {
    cy.get("ul.pagination li")
      .contains("Previous")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
        }
      });
  }

  clickPreviousUntilDisabled() {
    cy.get("ul.pagination li")
      .contains("Previous")
      .should("be.visible")
      .then(($nextButton) => {
        if (!$nextButton.parent().hasClass("disabled")) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
          this.clickPreviousUntilDisabled();
        }
      });
  }
}

export default new RoleListPage();
