import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class AssetCreationPage extends BasePage {


  //Locators
  get createAssetHeader() { return cy.get("#showMenuBtn + h1") }
  get submitBtn(){return cy.get("div.action button")}
  get assetTypeDrp(){return cy.get("#asset_list")}
  get modelTxt(){return cy.get("input[name='model']")}
  get ownerDrp(){return cy.get("#owner")}
  get manufactureTxt(){return cy.get("input[name='manufacture']")}
  get serialNoTxt(){return cy.get("input[name='serialNumber']")}
  get warrantyTxt(){return cy.get("input[name='warrantyExpired']")}
  get purchaseDate(){return cy.get("input[name='purchaseDate']")}
  get commentTxt(){return cy.get("textarea[name='comment']")}

 

 

  //Methods

  enterComment(text){
    this.commentTxt.type(text);
  }

  enterPurchaseDate(text){
    this.purchaseDate.type(text);
  }

  enterWarranty(text){
    this.warrantyTxt.type(text);
  }

  enterSerialNo(text){
    this.serialNoTxt.type(text);
  }

  enterManufacture(text){
    this.manufactureTxt.type(text);
  }

  selectOwner(text){
    cy.selectDrpValueByText(this.ownerDrp,text,false);
  }

  selectAssetType(text){
    cy.selectDrpValueByText(this.assetTypeDrp, text, false);
  }

  clickOnSubmit(){
    this.submitBtn.click();
    Loaders.threeDotLoading.should('not.exist');
  }

  getValidationMessage(element) {
    return element.invoke('prop', 'validationMessage');
  }

  assertValidation(element, expectedMessage) {
    this.getValidationMessage(element).then((message) => {
      expect(message).to.equal(expectedMessage);
    });
  }

  enterModel(text){
    this.modelTxt.type(text);
  }



}



export default new AssetCreationPage();