import BasePage from "./BasePage";
import Loaders from "../components/Loaders";
import "cypress-xpath";

class ApplyLeavePage extends BasePage {
  //Locators
  get applyLeaveHeader() {
    return cy.xpath("//h1[text()='Apply Leaves']");
  }
  get idColSortIcon() {
    return cy.get("tr th:nth-child(1) img");
  }
  get fromColSortIcon() {
    return cy.get("thead > tr > :nth-child(2)");
  }
  get toColSortIcon() {
    return cy.get("thead > tr > :nth-child(3)");
  }
  get typeColSortIcon() {
    return cy.get("thead > tr > :nth-child(4)");
  }
  get reasonColSortIcon() {
    return cy.get("thead > tr > :nth-child(5)");
  }
  get leaveCountColSortIcon() {
    return cy.get("thead > tr > :nth-child(6)");
  }
  get statusColSortIcon() {
    return cy.get("thead > tr > :nth-child(7)");
  }
  gridDataList(col) {
    return `tr td:nth-child(${col})`;
  }
  gridSingleData(col) {
    return `tbody tr:nth-child(1) td:nth-child(${col})`;
  }

  // Method

  clickOnIdCol() {
    this.idColSortIcon.click();
  }

  ClickOnfromCol() {
    this.fromColSortIcon.click();
  }

  clickOnToCol() {
    this.toColSortIcon.click();
  }

  clickOnTypeCol() {
    this.typeColSortIcon.click();
  }

  clickOnReasonCol() {
    this.reasonColSortIcon.click();
  }

  clickOnLeaveCountCol() {
    this.leaveCountColSortIcon.click();
  }

  clickOnStatusCol() {
    this.statusColSortIcon.click();
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
}

export default new ApplyLeavePage();
