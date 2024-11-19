import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class AssetDashBoardPage extends BasePage {


//Locators
get subMenus(){return cy.get("ul.submenu.show li")}
get DashBoardHeader(){return cy.get("#showMenuBtn + h1")}
get filterAssetType(){return cy.get("#filterAssetType")}
get filterBtn(){return cy.get("div.actions button.export")}
get assetCards(){return cy.get("h5.card-title")}
get noRecordeLbl() { return cy.get("div.fs-4") }
get assetCardOwner(){return cy.get("h6.card-text")}
get filterAssetOwner(){return cy.get("#filterOwner")}

//Methods

assert_SubMenus(submenus) {
  this.subMenus
    .should('have.length', submenus.length)
    .each((element, index) => {
      expect(element.text().trim()).to.equal(submenus[index]);
    });
}

assertAllCardsContainKeyword(locator,keyword) {
  locator.each(($el) => {
    cy.wrap($el).should('contain.text', keyword);
  });
}


selectAssetType(type){
  cy.selectDrpValueByText(this.filterAssetType, type, false)
}

selectAssetOwner(owner){
  cy.selectDrpValueByText(this.filterAssetOwner, owner, false)
}

clickOnFilterBtn(){
  this.filterBtn.click();
  Loaders.threeDotLoading.should("not.exist");
}



}



export default new AssetDashBoardPage();