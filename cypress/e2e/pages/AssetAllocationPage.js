import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class AssetAllocationPage extends BasePage {


//Locators
get subMenus(){return cy.get("ul.submenu.show li")}
get assetAllocationHeader(){return cy.get("#showMenuBtn + h1")}
get filterAssetType(){return cy.get("#filterAssetType")}
get filterBtn(){return cy.get("div.actions button.export")}
get assetCards(){return cy.get("h5.card-title")}
get noRecordeLbl() { return cy.get("div.fs-4") }
get assetCardOwner(){return cy.get("h6.card-text")}
get filterAssetOwner(){return cy.get("#filterOwner")}
get totalItemCount(){return cy.get("div.total")}
get assignAsset(){return cy.get("div.actions a.export")}
get searchTxt() { return cy.get("input[name='search']") }
get itemPerPageDrp(){return cy.get("#itemsPerPage")}
get gridRows() { return cy.get("tbody tr") }
get lastAssetName() { return cy.get('tbody tr:last-of-type td:nth-child(2)') }
get paginationBtn(){return cy.get("ul.pagination li.page-item")}

gridDataList(title){return `tbody tr td[data-title='${title}']`}
gridSingleData(title){return `tbody tr:nth-child(1) td[data-title='${title}']`}

//Methods

selectItemPerPage(count) {
  cy.selectDrpValueByText(this.itemPerPageDrp, count, false)
}

getColumnData(title) {
  return cy.get(this.gridSingleData(title)).invoke('text');
}

searchBy(dataTitle = "Name",searchKey='') {

  if (searchKey) {
      this.searchTxt.clear().type(searchKey).should('have.value', searchKey);
  }
  else {
      this.getColumnData(dataTitle).then((searchTexts) => {
          this.searchTxt.clear().type(searchTexts).should('have.value', searchTexts);
      })
  }
}

assetSearchBy(dataTitle = "Name") {
  this.searchTxt.invoke('val').then((text1) => {
    this.getColumnData(dataTitle).then((text2) => {
          expect(text1.trim()).to.equal(text2.trim());
      })
  })
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



export default new AssetAllocationPage();