import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class AssetAllocationPage extends BasePage {


//Locators
get subMenus(){return cy.get("ul.submenu.show li")}
get assetAllocationHeader(){return cy.get("#showMenuBtn + h1")}
get backToAssetList(){return cy.get("div.total a")};
get assetMgmtForm(){return cy.get("#assign-asset h3")}
get noRecordeLbl() { return cy.get("div.fs-4") }
get assignAsset(){return cy.get("div.actions a.export")}
get searchTxt() { return cy.get("input[name='search']") }
get itemPerPageDrp(){return cy.get("#itemsPerPage")}
get gridRows() { return cy.get("tbody tr") }
get lastAssetName() { return cy.get('tbody tr:last-of-type td:nth-child(2)') }
get paginationBtn(){return cy.get("ul.pagination li.page-item")}

gridDataList(title){return `tbody tr td[data-title='${title}']`}
gridSingleData(title){return `tbody tr:nth-child(1) td[data-title='${title}']`}
get assetOwnerData(){return cy.get("tbody tr td:nth-child(2)")}
get OwnerSortIcon(){return cy.get("tr th:nth-child(2) img")}
get assetTypeSortIcon(){return cy.get("tr th:nth-child(3) img")}
get employeeSortIcon(){return cy.get("tr th:nth-child(4) img")}
get serialNoSortIcon(){return cy.get("tr th:nth-child(5) img")}

get selectAssetTypeDrp(){return cy.get("#react-select-2-input")}
get selectEmployeeDrp(){return cy.get("#react-select-3-input")}
get commentTxt(){return cy.get("textarea[name='comment']")}
get submitBtn(){return cy.get("div.action button")}
get assetAssignePopup(){return cy.get("#staticBackdropLabel")}
get assetAssigneGridHeader(){return cy.get("thead tr th")}
get unavailbleAssetLbl(){return cy.get("#staticBackdropAsset h4")}
get crossBtn(){return cy.get("#staticBackdropAsset button")}

get serialNo2rowLbl(){return cy.get("tbody tr:nth-child(2) td:nth-child(4)")}
get serialNo1rowLbl(){return cy.get("tbody tr:nth-child(1) td:nth-child(4)")}

//Methods

getserialnumber(locator){
  return locator.invoke('text');
}

getSerachValue(){
  return this.searchTxt.invoke('val')
}

searchBySerialno(locatorOrString){

  if (typeof locatorOrString === 'string') {
    this.searchTxt.type(locatorOrString);
  } 
  else{

  this.getserialnumber(locatorOrString).then((text)=>{
    this.searchTxt.type(text);
  })
}
}

asserSearchSerialNo(locator){
    this.getSerachValue().then((text1)=>{
        this.getserialnumber(locator).then((text2)=>{
          expect(text1.trim()).to.equal(text2.trim());
        })
    })
}



clickOnCross(){
  this.crossBtn.wait(1000).click();
}

assert_Columns(columns) {
  this.assetAssigneGridHeader
    .should('have.length', columns.length)
    .each((element, index) => {
      expect(element.text().trim()).to.equal(columns[index]);
    });
}

clickOnSubmit(){
  this.submitBtn.wait(1000).click();
  Loaders.threeDotLoading.should('not.exist');
  cy.wait(2000);
}

enterComment(text){
  this.commentTxt.type(text);
}

selectAssetType(type){
  cy.selectDrpValueByText(this.selectAssetTypeDrp, type, true,this.selectAssetTypeDrp);
}

selectEmployee(type){
  cy.selectDrpValueByText(this.selectEmployeeDrp, type, true,this.selectEmployeeDrp);
}

selectItemPerPage(count) {
  cy.selectDrpValueByText(this.itemPerPageDrp, count, false)
}

clickOnAssetAssigne(){
  this.assignAsset.click();0
  Loaders.threeDotLoading.should('not.exist');
}

clickOnBackToAssetList(){
  this.backToAssetList.click();

}

clickOnOwner(){
  this.OwnerSortIcon.click();
}

clickOnAssetType(){
  this.assetTypeSortIcon.click();
}

clickOnEmployeeCol(){
this.employeeSortIcon.click();
}

clickOnSerialNoCol(){
  this.serialNoSortIcon.click();
}

getColumnDataList(title){
  return cy.get(this.gridDataList(title)).invoke('text');
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


getValidationMessage(element) {
  cy.wait(2000);
  return element.invoke('prop', 'validationMessage');
}

assertValidation(element,expectedMessage) {
  this.getValidationMessage(element).then((message) => {
      expect(message).to.equal(expectedMessage);
  });
}



}



export default new AssetAllocationPage();