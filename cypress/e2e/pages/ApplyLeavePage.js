import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class ApplyLeavePage extends BasePage {


//Locators
get applyLeaveHeader(){return cy.get("#showMenuBtn + h1")}
get idColSortIcon(){return cy.get("tr th:nth-child(1) img")}
get fromColSortIcon(){return cy.get("tr th:nth-child(2) img")}
get toColSortIcon(){return cy.get("tr th:nth-child(3) img")}
get typeColSortIcon(){return cy.get("tr th:nth-child(4) img")}
get reasonColSortIcon(){return cy.get("tr th:nth-child(5) img")}
get leaveCountColSortIcon(){return cy.get("tr th:nth-child(6) img")}
get statusColSortIcon(){return cy.get("tr th:nth-child(7) img")}
gridDataList(col) { return `tr td:nth-child(${col})` }
gridSingleData(col) { return `tbody tr:nth-child(1) td:nth-child(${col})` }

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

clickOnLeaceCountCol() {
  this.leaveCountColSortIcon.click();
}

clickOnStatusCol() {
  this.statusColSortIcon.click();
}


clickNextUntilDisabled() {
  cy.get('ul.pagination li').contains('Next').should('be.visible').then(($nextButton) => {
    if (!$nextButton.parent().hasClass('disabled')) {
      cy.wrap($nextButton).click({ force: true });
      cy.wait(1000);
      this.clickNextUntilDisabled();
    }
  });
}


clickNext() {
  cy.get('ul.pagination li').contains('Next').should('be.visible').then(($nextButton) => {
      if (!$nextButton.parent().hasClass('disabled')) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
      }
  });
}

clickPrevious() {
  cy.get('ul.pagination li').contains('Previous').should('be.visible').then(($nextButton) => {
      if (!$nextButton.parent().hasClass('disabled')) {
          cy.wrap($nextButton).click({ force: true });
          cy.wait(1000);
      }
  });
}




}



export default new ApplyLeavePage();