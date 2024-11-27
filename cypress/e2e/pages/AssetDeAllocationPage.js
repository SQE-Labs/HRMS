import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class AssetDeAllocationPage extends BasePage {


  //Locators 
  get selectEmployee_Drp() { return cy.get("#react-select-2-input") }
  get deleteIcon(){return cy.get("tr:last-of-type td a[name='selectAsset']")}
  get selectAssetConditionDrp(){return cy.get("#assetCondition")}
  get repairCostTxt(){return cy.get("input[name='repairCost']")}
  get submitBtn(){return cy.get("div button[type='submit']")}
  get commentTxt() { return cy.get("textarea[name='comment']") }

 

  //Methods

  clickOnSubmit(){
    this.submitBtn.click();
    Loaders.threeDotLoading.should('not.exist');
  }

  enterRepairCost(cost){
    this.repairCostTxt.type(cost);
  }

  enterComment(text) {
    this.commentTxt.type(text);
  }

  selectAssetCondition(text){
    cy.selectDrpValueByText(this.selectAssetConditionDrp, text, false);
  }

  clickOnDelete(){
    this.deleteIcon.click();
  }


  select_Employee(text) {
    cy.selectDrpValueByText(this.selectEmployee_Drp, text, true, this.selectEmployee_Drp);
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

  clickNextUntilDisabled() {
    cy.get('ul.pagination li').contains('Next').should('be.visible').then(($nextButton) => {
      if (!$nextButton.parent().hasClass('disabled')) {
        cy.wrap($nextButton).click({ force: true });
        cy.wait(1000);
        this.clickNextUntilDisabled();
      }
    });
  }

  clickPreviousUntilDisabled() {
    cy.get('ul.pagination li').contains('Previous').should('be.visible').then(($nextButton) => {
      if (!$nextButton.parent().hasClass('disabled')) {
        cy.wrap($nextButton).click({ force: true });
        cy.wait(1000);
        this.clickPreviousUntilDisabled();
      }
    });
  }





}



export default new AssetDeAllocationPage();