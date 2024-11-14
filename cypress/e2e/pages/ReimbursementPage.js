import BasePage from "./BasePage";
import Loaders from "../components/Loaders";

class ReimbursementPage extends BasePage {


//Locators
get subMenus(){return cy.get("ul.submenu.show li")}
get reimbursementHeader(){return cy.get("#showMenuBtn + h1")}
get reimbursementType(){return cy.get("tbody tr:first-of-type td[data-title='name']")}
get noRecordeLbl() { return cy.get("div.fs-4") }
get searchTxt() { return cy.get("input[name='search']") }
get reimbursementReqBtn() { return cy.get("div.actions > a.export") }
get reimbursementFormLbl(){return cy.get("#assign-asset h3")}
get backtoReimbursementPageBtn(){return cy.get("a.brand-color")}
get reimbursementType_Drp(){return cy.get("#reimbursementType")}
get invoiceNo_Txt(){return cy.get("input[name='invoiceNo']")}
get reimbursementAmount_Txt(){return cy.get("input[name='reimbursementAmount']")}
get comment_Txt(){return cy.get("textarea[name='comment']")}
get invoiceDate(){return cy.get("input[name='date']")}
get fromDate(){return cy.get("input[name='fromDate']")}
get toDate(){return cy.get("input[name='toDate']")}
get submit_Btn(){return cy.get("button[type='submit']")}
get reset_Btn(){return cy.get("div button.btn")}
get chooseFile(){return cy.get("input[type='file']")}
get lastReimbursmentName(){return cy.get("tbody tr:last-of-type td[data-title='name']")}
get lastInvoiceNo(){return cy.get("tbody tr:last-of-type td[data-title='invoiceNo']")}
get lastRequestStatus(){return cy.get("tbody tr:last-of-type td[data-title='trackingStatus']")}
get lastRowActionLbl(){return cy.get("tbody tr:last-of-type td a")}

// Methods

getValidationMessage(element) {
  return element.invoke('prop', 'validationMessage');
}

assertValidation(element,expectedMessage) {
  this.getValidationMessage(element).then((message) => {
      expect(message).to.equal(expectedMessage);
  });
}

chooseDocument(filePath) {
  this.chooseFile.selectFile(filePath);
}

clickOnReset(){
  this.reset_Btn.click();
}

clickOnSubmit(){
  this.submit_Btn.click();
}

select_InvoiceDate(date) {
  this.invoiceDate.type(date).should('have.value', date);

}

select_FromDate(date) {
  this.fromDate.type(date).should('have.value', date);

}


select_ToDate(date) {
  this.toDate.type(date).should('have.value', date);

}

enter_Comment(text){
  this.comment_Txt.type(text).should('have.text',text);
}

enter_reimbursementAmount(text){
  this.reimbursementAmount_Txt.type(text).should('have.value',text);
}

select_reimbursementType(type){
  cy.selectDrpValueByText(this.reimbursementType_Drp, type, false)
}

enter_InvoiceNo(text){
  this.invoiceNo_Txt.type(text).should('have.value',text);
}

clickOnReimbursemetnReq(){
  this.reimbursementReqBtn.click();
}

clickOn_backtoReimbursement_PageBtn(){
  this.backtoReimbursementPageBtn.click();
}

clickOnReimbursemetnReq(){
  this.reimbursementReqBtn.click();
}

get_ReimburseType() {
  return this.reimbursementType.invoke('text');
}

search_Reimbursement_Type(type) {

  if (type) {
      this.searchTxt.clear().type(type).should('have.value', type);
  }
  else {
      this.get_ReimburseType().then((type) => {
          this.searchTxt.clear().type(type).should('have.value', type);
      })
  }
}

assert_Search_Reimbursement_Type() {
  this.searchTxt.invoke('val').then((text1) => {
      this.reimbursementType.invoke('text').then((text2) => {
          expect(text1.trim()).to.equal(text2.trim());
      })
  })
}


assert_SubMenus(submenus) {
  this.subMenus
    .should('have.length', submenus.length)
    .each((element, index) => {
      expect(element.text().trim()).to.equal(submenus[index]);
    });
}


}



export default new ReimbursementPage();