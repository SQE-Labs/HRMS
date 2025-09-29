import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class AssetDashBoardPage extends BasePage {
  //Locators
  get subMenus() {
    return cy.get("ul.submenu.show li");
  }
  get DashBoardHeader() {
    return cy.get("h1");
  }
  get filterAssetType() {
    return cy.get("#filterAssetType");
  }
  get filterBtn() {
    return cy.get("div.actions button.export");
  }
  get assetCards() {
    return cy.xpath("//h5[@title='Keyboard']");
  }
  get cardXpath1(){
    return cy.xpath("//h5[text()='Keyboard']/..")
  }
  get RecordeLbl() {
    return cy.xpath("//h5[text()='Pendrive']");
  }
  get assetCardOwner() {
    return cy.get(" .card > .card-body > .card-title");
  }
  get filterAssetOwner() {
    return cy.get("#filterAssetType");
  }
  get totalItemCount() {
    return cy.get("div.total");
  }
  get exportBtn() {
    return cy.get("div.actions a.export");
  }
  get errorMessage(){
    return cy.xpath("//div[contains(text(),'No Record Available!')]");
  }


  //Methods

  assert_SubMenus(submenus) {
    this.subMenus
      // .should('have.length', submenus.length)
      .each((element, index) => {
        expect(element.text().trim());
      });
    //.to.equal(submenus[index])
  }

  assertAllCardsContainKeyword(Keyword) {
  cy.xpath("//h5[text()='Keyboard']")
    .should('be.visible')
    .and('contain.text',Keyword);
}

  selectAssetType(type) {
    cy.selectDrpValueByText(this.filterAssetType, type, false);
  }

  selectAssetOwner(owner) {
    cy.selectDrpValueByText(this.filterAssetOwner, owner, false);
  }

  clickOnFilterBtn() {
    this.filterBtn.click();
    //Loaders.threeDotLoading.should("not.exist");
  }

  clickOnExportBtn() {
    this.exportBtn.click();
    // Loaders.threeDotLoading.should("not.exist");
  }

  validateErrorMessages(){
    this.errorMessage.should('contain.text', 'No Record Available!');
  }

  
  assertTotalCount() {
  this.cardXpath1.then(($cards) => {
    const totalCount = $cards.length;
    cy.log(`Total cards: ${totalCount}`);
    cy.wrap($cards).should("have.length", totalCount);
    });
  }

  checkFile(path) {
    cy.readFile(path).should("exist");
  }
}

export default new AssetDashBoardPage();
