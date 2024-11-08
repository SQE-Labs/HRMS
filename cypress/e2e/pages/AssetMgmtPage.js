import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class AssetMgmtPage extends BasePage {


//Locators
get assetReqHeader(){return cy.get("#showMenuBtn + h1")}
get assetReqBtn(){return cy.get("div.actions  a.export")}
get assetReqLbl(){return cy.get("h3.heading")}
get backReqListBtn(){return cy.get("#showMenuBtn ~ div  a.brand-color")}
get selectAssetType(){return cy.get("#asset_list")}
get requestReason(){return cy.get("textarea[name='reason']")}
get resetBtn(){return cy.get("div.action button.btn")}
get submitBtn(){return cy.get("div.action button.theme-button")}
get lastRequestReason(){return cy.get("div.wrapper-body > div.table-responsive tr:last-of-type td[data-title='reason']")}

//Methods
clickOnAssetReq(){
  this.assetReqBtn.click();
}

clickOnBackAssetReqList(){
  this.backReqListBtn.click();
  Loaders.threeDotLoading.should('not.exist'); 
}

selectAsset_Type(assetType){
  cy.selectDrpValueByText(this.selectAssetType, assetType, false)

}

enterReqReason(reason){
  this.requestReason.clear().type(reason);
}

clickOnResetBtn(){
  this.resetBtn.click();
}

clickOnSubmit(){
  this.submitBtn.click();
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



}



export default new AssetMgmtPage();