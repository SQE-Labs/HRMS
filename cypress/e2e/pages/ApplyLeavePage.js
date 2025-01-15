import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class ApplyLeavePage extends BasePage {


  //Locators
  get applyLeaveHeader() { return cy.get("#showMenuBtn + h1") }
  get idColSortIcon() { return cy.get("tr th:nth-child(1) img") }
  get fromColSortIcon() { return cy.get("tr th:nth-child(2) img") }
  get toColSortIcon() { return cy.get("tr th:nth-child(3) img") }
  get typeColSortIcon() { return cy.get("tr th:nth-child(4) img") }
  get reasonColSortIcon() { return cy.get("tr th:nth-child(5) img") }
  get leaveCountColSortIcon() { return cy.get("tr th:nth-child(6) img") }
  get statusColSortIcon() { return cy.get("tr th:nth-child(7) img") }
  gridDataList(col) { return `tr td:nth-child(${col})` }
  gridSingleData(col) { return `tbody tr:nth-child(1) td:nth-child(${col})` }

  get applyLeaveBtn() { return cy.get("div.actions a") }
  get applyLeavePopUpLbl() { return cy.get("#staticBackdropApplyLeave #staticBackdropLabel") }
  get cancelBtn() { return cy.xpath("//div[@id='staticBackdropApplyLeave']//button[text() = 'Cancel']") }
  get crossIcon(){return cy.xpath("//div[@id='staticBackdropApplyLeave']//button[@aria-label= 'Close']")}
  get submitBtn(){return cy.xpath("//div[@id='staticBackdropApplyLeave']//button[text()= 'Submit']")}
  get leavetypeDrp(){return cy.get("#leave_type_list")}
  get dateRange(){return cy.get("div.react-datepicker-wrapper input")}
  get resaonTxt(){return cy.get("#reasonOfLeave")}
  get dateValidationLbl(){return cy.get("div  + small")}

  // Method

  enterReason(text){
    this.resaonTxt.type(text,{force:true});
  }

  enterDateRange(rangeDate){
    this.dateRange.clear().type(rangeDate,{ delay: 1000 });
  }

getValidationMessage(element) {
    return element.invoke('prop', 'validationMessage');
}

assertValidation(locator,expectedMessage) {
    this.getValidationMessage(locator).then((message) => {
        expect(message).to.equal(expectedMessage);
    });
}

  selectLeaveType(text){ cy.selectDrpValueByText(this.leavetypeDrp, text, false)}

  clickOnSubmit(){
    this.submitBtn.wait(500).click();
    Loaders.threeDotLoading.should('not.exist');
    Loaders.overlay.should('not.exist');
  }

  clickOnCross(){this.crossIcon.wait(500).click()}

  clickOnCancel() { this.cancelBtn.wait(500).click(); }

  clickOnApplyLeave() {this.applyLeaveBtn.click();}

  clickOnIdCol() {this.idColSortIcon.click();}

  ClickOnfromCol() {this.fromColSortIcon.click();}

  clickOnToCol() {this.toColSortIcon.click();}

  clickOnTypeCol() {this.typeColSortIcon.click();}

  clickOnReasonCol() {this.reasonColSortIcon.click();}

  clickOnLeaceCountCol() {this.leaveCountColSortIcon.click();}

  clickOnStatusCol() {this.statusColSortIcon.click();}


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