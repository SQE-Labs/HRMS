import BasePage from "./BasePage";
import "cypress-xpath";
import { selectDrpValueByText } from "../../support/utils";


class CSATPages extends BasePage {

  // ===== CSAT Rating Page Locators =====
  // ===== Getters =====

  getCSATBreadcrumb() {
    return cy.xpath("//h1[contains(text(),'CSAT Rating')]");
  }

  getManageCSATTab() {
    return cy.contains("Manage CSAT Ratings");
  }

  getAddCSATTab() {
    return cy.contains("Add CSAT Ratings");
  }

  getFilterByDropdown() {
    return cy.contains("Filter By")
      .parents("div")
      .find("input");
  }
  get managefilterBy() {
    return cy.get("#react-select-2-input");
  }
  get manageselectEmployee() {
    return cy.get("#react-select-3-input");
  }
  get filterBy() {
    return cy.get("#react-select-4-input");
  }
  get selectEmployee() {
    return cy.get("#react-select-5-input");
  }
  get NextButton() {
    return cy.xpath("//button[text()='Next']");
  }
  get ratingInput() {
    return cy.get('input[placeholder="Enter CSAT Rating"]');
  }
  get updatedRatingInput() {
    return cy.get('input[class="border"]');
  }
  get ratingBtn() {
    return cy.xpath("//button[text()='Add Rating']");
  }
  get getToastMsg() {
    return cy.get(".Toastify__toast-body :nth-child(2)");
  }
  get getAddCSATHeader() {
    return cy.xpath("//h5[text()='Add CSAT Rating']");
  }
  get editBtn() {
    return cy.get('a[class="fw-bolder"]');
  }
  get updateBtn() {
    return cy.get('a[class="fw-bolder me-3"]');
  }

  getSelectOptionDropdown() {
    return cy.contains("Select Option")
      .parents("div")
      .find("input");
  }
  checkList() {
    cy.get('tbody.csat--team-members-table tr:first-child input[type="checkbox"]').check();
  }

  getProjectAccordions() {
    return cy.get(".accordion-item");
  }
  // ===== Actions =====

  clickAddCSATTab() {
    this.getAddCSATTab().click();
  }
  clickOnNextButton() {
    this.NextButton.click();
  }
  clickOnAddRatingButton() {
    this.ratingBtn.click();
  }
  clickOnEditButton() {
    // cy.get('body').click(0, 0); // click outside to close overlay
    this.editBtn.click({ force: true });
  }
  clickOnUpdateRatingButton() {
    this.updateBtn.click({ force: true });
  }

  selectFilterBy(value) {
    this.getFilterByDropdown()
      .click({ force: true })
      .type(value);

    cy.contains(".react-select__option", value).click();
  }
  addFilterBy(text) {
    cy.selectDrpValueByText(
      this.filterBy,
      text,
      true,
      this.filterBy
    );
  }
  enterRating(rating) {
    this.ratingInput
      .should('be.visible')
      .clear()
      .type(rating);
  }
  addSelectEmployeeBy(text) {
    cy.selectDrpValueByText(
      this.selectEmployee,
      text,
      true,
      this.selectEmployee
    );
  }
  manageFilterBy(text) {
    cy.selectDrpValueByText(
      this.managefilterBy,
      text,
      true,
      this.managefilterBy
    );
  }
  manageSelectEmployeeBy(text) {
    cy.selectDrpValueByText(
      this.manageselectEmployee,
      text,
      true,
      this.manageselectEmployee
    );
  }
  enterUpdateRating(rating) {
    this.updatedRatingInput
      .should('be.visible')
      .clear()
      .type(rating);
  }

  selectAnyEmployeeFromSelectOption() {
    this.getSelectOptionDropdown()
      .click({ force: true });

    cy.get(".react-select__option")
      .first()
      .click();
  }


}

export default new CSATPages();
