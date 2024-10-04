import BasePage from "./BasePage";
import { generateRandomString } from '../../support/utils';
import Loaders from "../components/Loaders";


class UploadEmpDocumentPage extends BasePage {

// Locators 
get uploadeDocHeaderLbl(){return cy.get("#showMenuBtn + h1")};
get selectEmployeeDrp(){return cy.get("#react-select-2-input")}
get tableColHeadLbl(){return cy.get("table.resume tr th")}
insuranceCardActBtn(text) {return cy.get(`tbody tr:has(td:nth-child(2):contains("${text}")) a i.fa-upload`)}
get uploadeActPopLbl(){return cy.get("#staticBackdropLabel")}
get submitBtn(){return cy.get("div.modal-footer button[type='submit']")}
get cancelBtn(){return cy.get("div.modal-footer button[type='button'].cancel-promote")}
get crossIcon(){return cy.get("div.modal-header button[type='button'].close-class")}
get chooseFile(){return cy.get("#file-input")}
get commnetTxtArea(){return cy.get("textarea[name='comment']")}
eyeIcon(value) { return cy.get(`tbody tr:has(td:nth-child(2):contains('${value}')) i.fa-eye`) }
eyeIconAnchor (value) { return cy.get(`tbody tr:has(td:nth-child(2):contains('${value}')) span.text-left a.fs-5`) }


// Methods

selectEmployee(text) {
    cy.selectDrpValueByText(this.selectEmployeeDrp, text, true, this.selectEmployeeDrp);
  }


// get and trim the text from the element
getTrimmedText(element) {
    return element.invoke('text').then((text) => text.trim());
  }

assertTextEquals(element, expectedText) {
    this.getTrimmedText(element).then((trimmedText) => {
        expect(trimmedText).to.eq(expectedText);
    });
  }

  getActualTableTexts(element) {
    const actualTexts = [];
    return element.each(($el) => {
        const text = Cypress.$($el).text().trim();
        actualTexts.push(text);
    }).then(() => actualTexts); // Return the collected texts after the iteration
}

assertExpectedTableLbl(locator, expectedTexts) {
    this.getActualTableTexts(locator).then((actualTexts) => {
        expectedTexts.forEach((expectedText, index) => {
            console.log(actualTexts[index]);
            console.log(expectedText[index]);
            expect(actualTexts[index]).to.eq(expectedText);
        });
    });
}

clickOnUploadAct(text){
  this.insuranceCardActBtn(text).click();
  cy.log("Clicked on the Insurance Upload action icon");
}

clickOnCancelBtn(){
  this.cancelBtn.wait(500).click();
  cy.log("Clicked on the Cancel Button");
}

clickOnCrossIcon(){
  this.crossIcon.wait(500).click();
  cy.log("Clicked on the cross Icon");
}

chooseDocument(filePath) {
  this.chooseFile.selectFile(filePath);
  cy.log("PDF file is Selected");

}

enterComments(text){
this.commnetTxtArea.clear().wait(1000).type(text)
cy.wait(1000)
this.commnetTxtArea.should('have.text',text)
}

clickOnSubmitBnt(){
  this.submitBtn.click();
}

clickOnEyeIcon(text){
  this.eyeIconAnchor(text).invoke("removeAttr", "target").click();
}


assertPdf(){
  cy.wait(2000);
  // Assert that the URL contains '.pdf'
  cy.url().should('include', 'dummy.pdf');
}


}


export default new UploadEmpDocumentPage();